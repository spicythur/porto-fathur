import gsap from "gsap";

// Bikin elemen bisa di-drag & dilempar (mantul di tepi `stage`).
// Nggak pakai GSAP Draggable karena App.jsx pakai CSS zoom: delta pointer
// (px layar) harus dibagi zoom biar elemen nempel pas di bawah kursor.
// Return: fungsi cleanup.

const getZoom = () => (window.innerWidth >= 768 ? window.innerWidth / 1440 : 1);
const SHADOW_REST = "drop-shadow(0px 4px 4px rgba(0,0,0,0.18))";
const SHADOW_LIFT = "drop-shadow(0px 22px 18px rgba(0,0,0,0.30))";
let zTop = 60;

export function makeThrowable(el, { stage, onGrab, shadow = true } = {}) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tick = null;
    const stop = () => { if (tick) { gsap.ticker.remove(tick); tick = null; } };

    const prev = {
        pointerEvents: el.style.pointerEvents,
        cursor: el.style.cursor,
        zIndex: el.style.zIndex,
        userSelect: el.style.userSelect,
        touchAction: el.style.touchAction,
    };
    el.draggable = false;
    el.style.pointerEvents = "auto";
    el.style.cursor = "grab";
    el.style.userSelect = "none";
    el.style.touchAction = "none";
    if (shadow) gsap.set(el, { filter: SHADOW_REST });

    // Batas gerak dalam koordinat transform (layout px), dihitung dari posisi layar
    const bounds = () => {
        const zoom = getZoom();
        const e = el.getBoundingClientRect();
        const s = stage.getBoundingClientRect();
        const x = gsap.getProperty(el, "x");
        const y = gsap.getProperty(el, "y");
        return {
            minX: x + (s.left - e.left) / zoom,
            maxX: x + (s.right - e.right) / zoom,
            minY: y + (s.top - e.top) / zoom,
            maxY: y + (s.bottom - e.bottom) / zoom,
        };
    };

    const fling = (vx, vy) => {
        const b = bounds();
        let x = gsap.getProperty(el, "x");
        let y = gsap.getProperty(el, "y");
        let r = gsap.getProperty(el, "rotation");
        let vr = vx * 0.06;
        tick = (_time, deltaMs) => {
            const dt = Math.min(deltaMs, 32) / 1000;
            const f = Math.pow(0.05, dt); // gesekan: sisa 5% kecepatan per detik
            vx *= f; vy *= f; vr *= f;
            x += vx * dt; y += vy * dt; r += vr * dt;
            // Mantul di tepi, kehilangan 40% tenaga
            if (x < b.minX) { x = b.minX; vx = -vx * 0.6; vr = -vr * 0.6; }
            else if (x > b.maxX) { x = b.maxX; vx = -vx * 0.6; vr = -vr * 0.6; }
            if (y < b.minY) { y = b.minY; vy = -vy * 0.6; }
            else if (y > b.maxY) { y = b.maxY; vy = -vy * 0.6; }
            gsap.set(el, { x, y, rotation: r });
            if (Math.hypot(vx, vy) < 10) stop();
        };
        gsap.ticker.add(tick);
    };

    const onDown = (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        stop();
        gsap.killTweensOf(el); // matiin animasi masuk/float biar nggak rebutan x/y
        el.setPointerCapture(e.pointerId);
        el.style.zIndex = String(++zTop);
        el.style.cursor = "grabbing";
        onGrab?.();

        const zoom = getZoom();
        const b = bounds();
        const startX = gsap.getProperty(el, "x");
        const startY = gsap.getProperty(el, "y");
        const px = e.clientX;
        const py = e.clientY;
        const samples = [{ x: startX, y: startY, t: performance.now() }];

        // "Dicabut": sedikit membesar, miring, bayangan naik
        gsap.to(el, {
            scale: 1.12, opacity: 1,
            rotation: `+=${gsap.utils.random(-8, 8)}`,
            ...(shadow ? { filter: SHADOW_LIFT } : {}),
            duration: 0.25, ease: "power2.out",
        });

        const onMove = (ev) => {
            const x = gsap.utils.clamp(b.minX, b.maxX, startX + (ev.clientX - px) / zoom);
            const y = gsap.utils.clamp(b.minY, b.maxY, startY + (ev.clientY - py) / zoom);
            gsap.set(el, { x, y });
            samples.push({ x, y, t: performance.now() });
            if (samples.length > 6) samples.shift();
        };

        const onUp = () => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerup", onUp);
            el.removeEventListener("pointercancel", onUp);
            el.style.cursor = "grab";
            gsap.to(el, { scale: 1, ...(shadow ? { filter: SHADOW_REST } : {}), duration: 0.35, ease: "power2.out" });

            const a = samples[0];
            const c = samples[samples.length - 1];
            const dt = (c.t - a.t) / 1000;
            // Nggak dilempar kalau reduce motion, atau kursor sempat diam sebelum dilepas
            if (reduce || dt <= 0 || performance.now() - c.t > 80) return;
            const max = 4000;
            fling(
                gsap.utils.clamp(-max, max, (c.x - a.x) / dt),
                gsap.utils.clamp(-max, max, (c.y - a.y) / dt),
            );
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerup", onUp);
        el.addEventListener("pointercancel", onUp);
    };

    el.addEventListener("pointerdown", onDown);
    return () => {
        stop();
        el.removeEventListener("pointerdown", onDown);
        Object.assign(el.style, prev);
    };
}
