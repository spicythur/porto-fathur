import { useRef, useEffect, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// DESKTOP ONLY — "Polaroid dibalik".
// Kartu diangkat dari tumpukan, terbang ke tengah sambil dibalik 180°.
// Sisi depan = replika polaroid, sisi belakang = detail project.
// Mobile tetap pakai ProjectModalClassic (lihat ProjectModal.jsx).

const getZoom = () => (window.innerWidth >= 768 ? window.innerWidth / 1440 : 1);
const prefersReduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Ukuran polaroid asli di Projects.jsx
const CARD_W = 350;
const CARD_H = 395;

function isOnScreen(el) {
    const r = el.getBoundingClientRect();
    return r.right > 0 && r.left < window.innerWidth && r.bottom > 0 && r.top < window.innerHeight;
}

// Transform supaya flipper (di tengah layar) persis nutupin kartu asal.
// getBoundingClientRect sudah kena zoom, transform belum → geser dibagi zoom.
function fromOrigin(originEl, flipEl) {
    const from = originEl.getBoundingClientRect();
    const to = flipEl.getBoundingClientRect();
    const zoom = getZoom();
    return {
        x: (from.left + from.width / 2 - (to.left + to.width / 2)) / zoom,
        y: (from.top + from.height / 2 - (to.top + to.height / 2)) / zoom,
        scale: from.width / to.width,
    };
}

// Kartu dilepas nanggung → mantul balik ke tengah
const springBack = (el) => gsap.to(el, {
    x: 0, y: 0, rotation: 0, duration: 0.7, ease: "elastic.out(1, 0.55)", overwrite: true,
});

const faceStyle = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" };

export default function ProjectModalFlip({ project, projects, onClose, onSelect, getOrigin }) {
    const overlayRef = useRef(null);
    const backdropRef = useRef(null);
    const flipRef = useRef(null);
    const hiddenOriginRef = useRef(null);
    const busyRef = useRef(false);
    const projectRef = useRef(project);
    // Sinkron project terbaru ke ref sebelum effect lain jalan
    useLayoutEffect(() => { projectRef.current = project; });

    const isOpen = !!project;

    // Ukuran modal: proporsi polaroid, muat di layar
    const zoom = getZoom();
    const H = Math.round(Math.min(654, (window.innerHeight * 0.86) / zoom));
    const W = Math.round((H * CARD_W) / CARD_H);

    const hideOrigin = (el) => {
        if (hiddenOriginRef.current && hiddenOriginRef.current !== el) {
            hiddenOriginRef.current.style.visibility = "";
        }
        if (el) el.style.visibility = "hidden";
        hiddenOriginRef.current = el;
    };
    const showOrigin = () => hideOrigin(null);

    // ── BUKA ──────────────────────────────────────────────────────────────
    useLayoutEffect(() => {
        if (!isOpen) return;
        const flip = flipRef.current;
        const overlay = backdropRef.current; // layer gelap + blur (kartu bukan anaknya)
        const chrome = overlayRef.current.querySelectorAll(".flip-chrome");
        const origin = getOrigin?.(projectRef.current.id);
        document.body.style.overflow = "hidden";
        gsap.set(flip, { transformPerspective: 1800, transformOrigin: "50% 50%" });

        if (!origin || prefersReduce()) {
            gsap.set(flip, { rotationY: 180 });
            gsap.fromTo([overlay, ...chrome], { opacity: 0 }, { opacity: 1, duration: 0.3 });
            gsap.fromTo(flip, { scale: 0.96 }, { scale: 1, duration: 0.35, ease: "power2.out" });
            gsap.fromTo(flip.children, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
            return () => { document.body.style.overflow = ""; };
        }

        const from = fromOrigin(origin, flip);
        hideOrigin(origin);
        busyRef.current = true;

        gsap.set(flip, { ...from, rotationY: 0, rotation: 0 });
        gsap.set(overlay, { opacity: 0, backdropFilter: "blur(0px)", webkitBackdropFilter: "blur(0px)" });
        gsap.set(chrome, { opacity: 0 });

        const tl = gsap.timeline({ onComplete: () => { busyRef.current = false; } });
        tl.to(overlay, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0)
            // 1. Diangkat: sedikit membesar, naik, miring
            .to(flip, { scale: from.scale * 1.08, y: from.y - 24, rotation: -4, duration: 0.2, ease: "power2.out" }, 0)
            // 2. Terbang ke tengah — x & y beda ease biar jalurnya melengkung
            .to(flip, { x: 0, duration: 0.8, ease: "power3.inOut" }, 0.16)
            .to(flip, { y: 0, duration: 0.8, ease: "power2.inOut" }, 0.16)
            .to(flip, { scale: 1, duration: 0.8, ease: "power3.inOut" }, 0.16)
            // 3. Dibalik di tengah perjalanan
            .to(flip, { rotationY: 180, duration: 0.75, ease: "power2.inOut" }, 0.3)
            // 4. Mendarat: lurus lagi dengan sedikit pantulan
            .to(flip, { rotation: 0, duration: 0.55, ease: "back.out(2.5)" }, 0.6)
            .to(chrome, { opacity: 1, duration: 0.3 }, 0.7)
            .to(overlay, { backdropFilter: "blur(4px)", webkitBackdropFilter: "blur(4px)", duration: 0.3 }, 0.8);

        return () => { document.body.style.overflow = ""; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // Kalau modal hilang mendadak, kartu asal dimunculin lagi
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => showOrigin(), []);

    // ── TUTUP ─────────────────────────────────────────────────────────────
    const handleClose = useCallback(() => {
        if (busyRef.current) return;
        busyRef.current = true;
        const flip = flipRef.current;
        const overlay = backdropRef.current;
        const chrome = overlayRef.current.querySelectorAll(".flip-chrome");
        const done = () => { showOrigin(); busyRef.current = false; onClose(); };
        const origin = getOrigin?.(projectRef.current?.id);

        if (!origin || !isOnScreen(origin) || prefersReduce()) {
            const tl = gsap.timeline({ onComplete: done });
            tl.to(flip, { y: 24, scale: 0.96, duration: 0.3, ease: "power2.inOut" });
            tl.to(flip.children, { opacity: 0, duration: 0.3, ease: "power2.inOut" }, 0);
            tl.to([overlay, ...chrome], { opacity: 0, duration: 0.25 }, "-=0.15");
            return;
        }

        // Ukur posisi tujuan dalam keadaan netral, lalu balikin ke keadaan sekarang
        const now = { x: gsap.getProperty(flip, "x"), y: gsap.getProperty(flip, "y"), scale: gsap.getProperty(flip, "scale") };
        gsap.set(flip, { x: 0, y: 0, scale: 1 });
        const to = fromOrigin(origin, flip);
        gsap.set(flip, now);
        hideOrigin(origin);

        const tl = gsap.timeline({ onComplete: done });
        tl.set(overlay, { backdropFilter: "blur(0px)", webkitBackdropFilter: "blur(0px)" }, 0)
            .to(chrome, { opacity: 0, duration: 0.2 }, 0)
            // Dibalik lagi ke sisi foto
            .to(flip, { rotationY: 0, duration: 0.6, ease: "power2.inOut" }, 0)
            .to(flip, { rotation: -4, duration: 0.3, ease: "power2.out" }, 0)
            // Terbang balik ke tumpukan
            .to(flip, { x: to.x, duration: 0.7, ease: "power3.inOut" }, 0.12)
            .to(flip, { y: to.y, duration: 0.7, ease: "power2.inOut" }, 0.12)
            .to(flip, { scale: to.scale, duration: 0.7, ease: "power3.inOut" }, 0.12)
            // Ditaruh: lurus
            .to(flip, { rotation: 0, duration: 0.25, ease: "power2.out" }, 0.6)
            .to(overlay, { opacity: 0, duration: 0.55, ease: "power1.inOut" }, 0.15);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onClose, getOrigin]);

    // ── PREV / NEXT: polaroid dilempar ke samping, yang baru masuk dari sisi lain ──
    const handleNavigate = useCallback((direction) => {
        if (busyRef.current || !project || !projects) return;
        const flip = flipRef.current;
        const idx = projects.findIndex((p) => p.id === project.id);
        const next = projects[idx + direction];

        // Ujung tumpukan: kartu cuma mantul, tanda nggak ada lagi
        if (!next) {
            gsap.timeline()
                .to(flip, { x: -direction * 28, rotation: -direction * 2, duration: 0.12, ease: "power2.out", overwrite: true })
                .to(flip, { x: 0, y: 0, rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
            return;
        }

        busyRef.current = true;
        const out = direction > 0 ? -1 : 1; // next → kartu keluar ke kiri
        // Lempar sampai bener2 keluar layar. JANGAN pakai opacity di flipper:
        // opacity < 1 bikin preserve-3d rata → sisi depan kelihatan kebalik.
        const dist = window.innerWidth / getZoom() / 2 + flip.offsetWidth;
        gsap.to(flip, {
            x: out * dist, y: 40, rotation: out * 14,
            duration: 0.36, ease: "power2.in", overwrite: true,
            onComplete: () => {
                onSelect(next);
                gsap.fromTo(flip,
                    { x: -out * dist, y: 40, rotation: -out * 12 },
                    {
                        x: 0, y: 0, rotation: 0, duration: 0.6, ease: "back.out(1.3)",
                        onComplete: () => { busyRef.current = false; },
                    }
                );
            },
        });
    }, [project, projects, onSelect]);

    // ── DRAG / SWIPE kartu pakai mouse ─────────────────────────────────────
    useEffect(() => {
        if (!isOpen) return;
        const flip = flipRef.current;

        const onDown = (e) => {
            if (e.button !== 0 || busyRef.current) return;
            if (e.target.closest("a, button")) return; // link & tombol tetap bisa diklik
            e.preventDefault(); // cegah drag gambar bawaan browser
            const zoom = getZoom();
            const startX = e.clientX;
            let dragging = false;
            let dx = 0;
            let v = 0;
            let lastT = performance.now();

            const onMove = (ev) => {
                const nx = (ev.clientX - startX) / zoom;
                if (!dragging) {
                    if (Math.abs(nx) < 6) return; // ambang biar klik biasa nggak kebaca drag
                    dragging = true;
                    gsap.killTweensOf(flip, "x,y,rotation");
                    flip.style.cursor = "grabbing";
                }
                const now = performance.now();
                v = ((nx - dx) / Math.max(1, now - lastT)) * 1000;
                dx = nx;
                lastT = now;
                gsap.set(flip, { x: dx, y: Math.abs(dx) * 0.06, rotation: dx * 0.035 });
            };

            const onUp = () => {
                window.removeEventListener("pointermove", onMove);
                window.removeEventListener("pointerup", onUp);
                flip.style.cursor = "";
                if (!dragging) return;
                const threshold = flip.offsetWidth * 0.25;
                if (dx < -threshold || v < -700) handleNavigate(1);
                else if (dx > threshold || v > 700) handleNavigate(-1);
                else springBack(flip);
            };

            window.addEventListener("pointermove", onMove);
            window.addEventListener("pointerup", onUp);
        };

        flip.addEventListener("pointerdown", onDown);
        return () => flip.removeEventListener("pointerdown", onDown);
    }, [isOpen, handleNavigate]);

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowLeft") handleNavigate(-1);
            if (e.key === "ArrowRight") handleNavigate(1);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, handleClose, handleNavigate]);

    if (!project || !projects) return null;

    const currentIndex = projects.findIndex((p) => p.id === project.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < projects.length - 1;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={handleClose}
        >
            {/* Layer gelap dipisah dari kartu, biar fade-nya nggak bikin kartu ikut transparan */}
            <div ref={backdropRef} className="absolute inset-0 bg-black/70" style={{ opacity: 0 }} />
            <p
                className="flip-chrome absolute top-5 left-1/2 -translate-x-1/2 font-[crayon] text-white text-2xl pointer-events-none"
                style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.8)" }}
            >
                {currentIndex + 1} / {projects.length}
            </p>

            {hasPrev && (
                <button
                    onClick={(e) => { e.stopPropagation(); handleNavigate(-1); }}
                    className="flip-chrome absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-[#F7DF19] text-[#2E8E37] text-2xl font-black flex items-center justify-center hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-colors shadow-lg cursor-pointer"
                >
                    ←
                </button>
            )}
            {hasNext && (
                <button
                    onClick={(e) => { e.stopPropagation(); handleNavigate(1); }}
                    className="flip-chrome absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-[#F7DF19] text-[#2E8E37] text-2xl font-black flex items-center justify-center hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-colors shadow-lg cursor-pointer"
                >
                    →
                </button>
            )}

            {/* Flipper: dua sisi kartu */}
            <div
                ref={flipRef}
                className="relative select-none"
                style={{ width: W, height: H, transformStyle: "preserve-3d", cursor: "grab" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* DEPAN — replika polaroid, di-scale dari ukuran asli 350×395 */}
                <div className="absolute inset-0 overflow-hidden rounded-sm bg-[#F4F1EA] shadow-2xl" style={faceStyle} aria-hidden="true">
                    <div className="flex flex-col" style={{ width: CARD_W, height: CARD_H, transform: `scale(${W / CARD_W})`, transformOrigin: "top left" }}>
                        <div className="px-3 pt-3 flex-1 min-h-0">
                            <div className="w-full h-full relative overflow-hidden bg-[#e8e5dd]">
                                <img src={project.imageUrl} alt="" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="relative px-3 pt-2 pb-3 border-t-2 border-[#2E8E37]/30" style={{ height: "150px" }}>
                            <h3 className="text-2xl font-[crayon] text-[#2E8E37] uppercase leading-none tracking-wide">{project.title}</h3>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {project.tech.slice(0, 3).map((t, i) => (
                                    <span key={i} className="text-[10px] px-2 py-0.5 bg-[#2E8E37] text-[#F7DF19] rounded-full font-[crayon]">{t}</span>
                                ))}
                            </div>
                            <p className="mt-1.5 pr-8 text-[10px] leading-snug text-[#2E8E37]/70 font-[crayon] line-clamp-3">{project.description}</p>
                            <span className="absolute bottom-2.5 right-3 w-7 h-7 rounded-full border-2 border-[#2E8E37]/25 text-[#2E8E37]/25 font-[crayon] text-xs flex items-center justify-center">✦</span>
                        </div>
                    </div>
                </div>

                {/* BELAKANG — detail project, kayak catatan di balik polaroid */}
                <div
                    className="absolute inset-0 overflow-hidden rounded-sm bg-[#F4F1EA] border-4 border-[#2E8E37] shadow-2xl flex flex-col"
                    style={{ ...faceStyle, transform: "rotateY(180deg)" }}
                >
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-[#2E8E37] text-[#F7DF19] flex items-center justify-center text-xl font-bold hover:bg-[#F7DF19] hover:text-[#2E8E37] transition-colors cursor-pointer"
                    >
                        &times;
                    </button>

                    <div className="w-full aspect-video bg-[#e8e5dd] overflow-hidden shrink-0">
                        <img src={project.imageUrl} alt={project.alt || project.title} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex flex-col gap-2.5 p-5 overflow-y-auto flex-1 min-h-0">
                        <h3 className="text-3xl font-[crayon] text-[#2E8E37] uppercase" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.08)" }}>
                            {project.title}
                        </h3>
                        <p className="text-[#555] text-base leading-relaxed font-[crayon]">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t, i) => (
                                <span key={i} className="px-3 py-0.5 bg-[#2E8E37] text-[#F7DF19] text-sm rounded-full font-[crayon]">{t}</span>
                            ))}
                        </div>
                        <div className="flex gap-3 mt-1">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-5 py-2 bg-[#F7DF19] text-[#2E8E37] rounded-full font-[crayon] text-sm hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-colors">
                                    <FaExternalLinkAlt size={12} /> Live Demo
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-5 py-2 border-2 border-[#2E8E37] text-[#2E8E37] rounded-full font-[crayon] text-sm hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-colors">
                                    <FaGithub size={14} /> GitHub
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
