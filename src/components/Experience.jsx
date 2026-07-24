import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 2800;

// Benang penghubung hand-drawn antar exp-item — kurva lengkung, bukan garis
// lurus, biar keliatan digambar tangan (jitter tegak lurus arah garis,
// bolak-balik arah tiap segmen).
function buildConnectorPath(points) {
    if (points.length < 2) return "";
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const jitter = (i % 2 === 0 ? 1 : -1) * Math.min(60, len * 0.18);
        const c1x = a.x + dx * 0.33 + nx * jitter;
        const c1y = a.y + dy * 0.33 + ny * jitter;
        const c2x = a.x + dx * 0.66 + nx * jitter;
        const c2y = a.y + dy * 0.66 + ny * jitter;
        d += ` C ${c1x},${c1y} ${c2x},${c2y} ${b.x},${b.y}`;
    }
    return d;
}

export default function Experience() {
    const container = useRef();
    const stageRef = useRef(null);
    const itemRefs = useRef([]);
    const pathRef = useRef(null);
    const [pathData, setPathData] = useState("");
    const [viewBox, setViewBox] = useState({ w: DESIGN_WIDTH, h: DESIGN_HEIGHT });

    const [mobileScale, setMobileScale] = useState(
        () => window.innerWidth < 768 ? window.innerWidth / DESIGN_WIDTH : null
    );

    useEffect(() => {
        const update = () => setMobileScale(window.innerWidth < 768 ? window.innerWidth / DESIGN_WIDTH : null);
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    // Ukur posisi tiap exp-item buat gambar jalur penghubungnya. Pakai
    // getBoundingClientRect (bukan offsetLeft/Top) karena tiap exp-item punya
    // offset relative sendiri (left-13, bottom-140, dst) yang offsetLeft/Top
    // TIDAK ikut hitung — cuma getBoundingClientRect yang merefleksikan posisi
    // hasil geser itu. Hasilnya dibagi scale biar balik ke satuan lokal yang
    // sama dengan kotak SVG (viewBox), yang nggak ikut ke-scale sama transform.
    useEffect(() => {
        const measure = () => {
            const stage = stageRef.current;
            const items = itemRefs.current.filter(Boolean);
            if (!stage || items.length < 2) return;
            const scale = mobileScale || 1;
            const stageRect = stage.getBoundingClientRect();
            const points = items.map((el) => {
                const r = el.getBoundingClientRect();
                return {
                    x: (r.left - stageRect.left) / scale + (r.width / scale) / 2,
                    y: (r.top - stageRect.top) / scale + (r.height / scale) / 2,
                };
            });
            setViewBox({ w: stageRect.width / scale, h: stageRect.height / scale });
            setPathData(buildConnectorPath(points));
        };

        measure();
        const t = setTimeout(measure, 300);
        window.addEventListener("resize", measure);
        return () => {
            clearTimeout(t);
            window.removeEventListener("resize", measure);
        };
    }, [mobileScale]);

    useGSAP(() => {
        const isMobile = window.innerWidth < 768;

        gsap.to(".exp-bg", {
            y: -120,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });

        gsap.from(".exp-title", {
            y: -80,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: container.current,
                start: isMobile ? "top 85%" : "top 60%",
            }
        });

        const items = gsap.utils.toArray(".exp-item");
        items.forEach((item, i) => {
            const direction = i % 2 === 0 ? -1 : 1;
            gsap.from(item, {
                x: direction * (isMobile ? 40 : 100),
                y: 50,
                opacity: 0,
                scale: 0.9,
                rotation: direction * (isMobile ? 3 : 8),
                duration: 1,
                ease: "back.out(1.3)",
                scrollTrigger: {
                    trigger: item,
                    start: isMobile ? "top 90%" : "top 75%",
                }
            });
        });

        gsap.from(".exp-doodle", {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(2)",
            scrollTrigger: {
                trigger: ".exp-doodle",
                start: "top 80%",
            }
        });

        const expItems = gsap.utils.toArray(".exp-item");
        expItems.forEach((item, i) => {
            const dir = i % 2 === 0 ? 1 : -1;
            gsap.to(item, {
                rotation: dir * 6,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });
        });

        gsap.to(".exp-doodle", {
            rotation: 60,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });

    }, { scope: container });

    // Jalur penghubung — digambar progresif pas discroll, terpisah dari timeline
    // di atas karena baru siap setelah posisi item ke-ukur (pathData berubah).
    useGSAP(() => {
        const path = pathRef.current;
        if (!path || !pathData) return;

        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
                end: "bottom 60%",
                scrub: 1,
            }
        });
    }, { scope: container, dependencies: [pathData] });

    return (
        <section id="experience" ref={container} className="relative pb-10 -mt-4 md:mt-0 bg-[#2E8E37] md:bg-white md:top-195 overflow-hidden md:overflow-visible">

            <img
                src="/bgexp.svg"
                alt=""
                aria-hidden="true"
                className="absolute exp-bg z-8 -top-8 inset-x-0 bottom-0 md:inset-auto md:bottom-190 w-full h-full object-cover md:object-fill"
            />

            <h2 className="sr-only">Experience</h2>
            <img
                src="/exp.svg"
                alt="Experience"
                className="exp-title relative z-10 w-[70%] md:w-[50%] mx-auto top-4 md:top-8 pt-2 md:pt-8"
            />

            {/* Scattered layout — desktop penuh, mobile di-scale agar sama persis */}
            <div style={mobileScale ? { height: `${DESIGN_HEIGHT * mobileScale}px`, overflow: 'hidden', marginBottom: `-${1400 * mobileScale}px` } : {}}>
                <div
                    ref={stageRef}
                    className="relative z-10 mt-5 mx-auto"
                    style={mobileScale ? { width: `${DESIGN_WIDTH}px`, height: `${DESIGN_HEIGHT}px`, transform: `scale(${mobileScale})`, transformOrigin: 'top left' } : { width: "100%" }}
                >

                    <div className="flex flex-col items-center pb-10">

                        <div ref={(el) => { itemRefs.current[0] = el; }} className="relative exp-item items-center left-13">
                            <div className="group relative transition-transform duration-500 ease-out hover:scale-[1.04] hover:-rotate-1">
                                <img src="/propok.webp" alt="Provoks Multimedia" className="relative w-145 h-auto object-contain right-98" />
                                <div>
                                    <img src="/Provoks.svg" alt="Provoks" className="relative -left-100 -top-55 w-120" />
                                    <p className="relative text-[#F7DF19] text-[32px] font-[crayon] -top-170 left-50">
                                        Multi<br />media<br />and<br />Event
                                        <span aria-hidden="true" className="ml-2 inline-block opacity-0 scale-0 -rotate-12 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 transition-all duration-300 ease-out">✦</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div ref={(el) => { itemRefs.current[1] = el; }} className="relative exp-item flex items-center bottom-140">
                            <div className="group flex items-center transition-transform duration-500 ease-out hover:scale-[1.04] hover:rotate-1">
                                <img src="/pkkmb.svg" alt="PKKMB" className="relative -right-133 bottom-90 w-110 z-10" />
                                <p className="relative text-[#F7DF19] text-[32px] font-[crayon] -right-120 bottom-30">
                                    Staff<br />DDMIT<br />PKKMB
                                    <span aria-hidden="true" className="ml-2 inline-block opacity-0 scale-0 -rotate-12 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 transition-all duration-300 ease-out">✦</span>
                                </p>
                                <img src="/yuwa.webp" alt="PKKMB" className="relative bottom-26 h-130 w-auto object-contain z-1" />
                            </div>
                        </div>

                        <div ref={(el) => { itemRefs.current[2] = el; }} className="relative exp-item flex items-center bottom-200 right-15">
                            <div className="group flex items-center transition-transform duration-500 ease-out hover:scale-[1.04] hover:-rotate-1">
                                <img src="/magang.webp" alt="PSIK" className="relative w-130 object-contain" />
                                <img src="/psik.svg" alt="PSIK" className="relative h-120 right-150" />
                                <p className="relative text-[#F7DF19] text-[32px] font-[crayon] mt-2 tracking-[0.5em] -left-130 bottom-50">
                                    Internship
                                    <span aria-hidden="true" className="ml-2 inline-block opacity-0 scale-0 -rotate-12 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 transition-all duration-300 ease-out">✦</span>
                                </p>
                            </div>
                        </div>

                        <div ref={(el) => { itemRefs.current[3] = el; }} className="relative exp-item items-center -top-270 -right-100">
                            <div className="group relative transition-transform duration-500 ease-out hover:scale-[1.04] hover:rotate-1">
                                <img src="/reborn.webp" alt="Provoks Enforcer" className="relative w-150 object-contain" />
                                <img src="/Provoks.svg" alt="Provoks" className="relative bottom-70 w-120 right-40 rotate-[19deg]" />
                                <p className="relative text-[#F7DF19] font-[crayon] text-[32px] tracking-[0.5em] bottom-108 left-10">
                                    Enforcer Event
                                    <span aria-hidden="true" className="ml-2 inline-block opacity-0 scale-0 -rotate-12 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 transition-all duration-300 ease-out">✦</span>
                                </p>
                            </div>
                        </div>

                        <img src="/panah.svg" alt="" className="exp-doodle absolute top-20 left-72 w-16" />
                    </div>
                </div>
            </div>

        </section>
    )
}
