import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

// Lebar & tinggi desain desktop — dipakai untuk scale hero di mobile
const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 820;

export default function Hero() {
    const container = useRef();

    const [mobileScale, setMobileScale] = useState(
        () => window.innerWidth < 768 ? window.innerWidth / DESIGN_WIDTH : null
    );
    useEffect(() => {
        const update = () => {
            setMobileScale(window.innerWidth < 768 ? window.innerWidth / DESIGN_WIDTH : null);
        };
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const scrollToSection = (e, targetId) => {
        e.preventDefault();
        gsap.to(window, { duration: 1.2, scrollTo: { y: targetId }, ease: "power3.inOut" });
    };

    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Background masuk perlahan
        tl.from(".hero-bg", {
            scale: 1.1,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out"
        })

            // 2. Teks jatuh dari atas (target: wrapper)
            .from(".hero-text", {
                y: -150,
                opacity: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)"
            }, "<0.5")

            .set(".hero-text", { y: 0 });

        // 3. Floating animation pada INNER img — tidak conflict dengan scrub
        gsap.to(".hero-text-inner", {
            y: 20,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.5
        });

        // Stiker doodle: pop-in lalu melayang terus
        gsap.from(".hero-stiker", {
            scale: 0,
            rotation: -90,
            opacity: 0,
            duration: 1,
            ease: "back.out(2)",
            delay: 1.2
        });
        gsap.to(".hero-stiker", {
            y: 18,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.6
        });

        // Scrub parallax: background bergerak lebih lambat saat scroll
        gsap.to(".hero-bg", {
            y: -150,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });

        // Scrub parallax: wrapper teks (outer) bergerak + rotate
        // Float di inner tetap jalan — transforms stack secara natural
        gsap.to(".hero-text", {
            y: -100,
            rotation: -3,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.5,
            }
        });

    }, { scope: container });

    return (
        <section
            id="home"
            ref={container}
            className="relative z-10 w-full md:overflow-x-clip md:h-screen"
            style={mobileScale ? { height: `${DESIGN_HEIGHT * mobileScale}px` } : undefined}
        >
            {/* h1 untuk SEO — visual "Porto Folio" di bawah cuma gambar SVG,
                jadi tambahin h1 real biar crawlable, tapi sembunyiin dari layout */}
            <h1 className="sr-only">Fathur — UI/UX Designer & Frontend Developer</h1>
            <p className="sr-only">Portfolio of Agus Fathurrahman Rifai — IT student at Universitas Brawijaya crafting playful, animated web experiences with React, GSAP, and Tailwind CSS.</p>

            {/* Wrapper — desktop: full screen; mobile: komposisi desktop di-scale */}
            <div
                className="relative w-full md:h-screen"
                style={mobileScale ? { width: `${DESIGN_WIDTH}px`, height: `${DESIGN_HEIGHT}px`, transform: `scale(${mobileScale})`, transformOrigin: 'top left' } : undefined}
            >
                {/* Background foto alam */}
                <img
                    src="/bg4.webp"
                    alt=""
                    aria-hidden="true"
                    width="1728"
                    height="984"
                    className="hero-bg absolute -top-20 w-[120%] h-[120%] object-contain"
                />
                {/* Teks Porto Folio — wrapper (scrub) > img (float) */}
                <div className="hero-text absolute top-40 md:top-50 left-40 z-10 w-[45%] flex flex-col gap-2 md:gap-8">
                    <img
                        src="/teks-porto.svg"
                        alt="Porto Folio"
                        width="400"
                        height="120"
                        className="hero-text-inner w-[85%]"
                    />

                    {/* CTA — nilai mobile (unprefixed) dikompensasi karena wrapper ini
                        di-scale ~0.27x oleh mobileScale; md: pakai ukuran asli karena
                        desktop gak lewat mobileScale (dizoom App.jsx secara seragam).
                        Satu baris + label pendek di mobile — ruang vertikal sebelum
                        border zigzag About sangat terbatas. */}
                    <div className="hero-cta flex items-center gap-3 md:gap-4 mt-10 md:mt-0 ml-[50px] md:ml-20">
                        <a
                            href="#projects"
                            onClick={(e) => scrollToSection(e, "#projects")}
                            className="inline-block px-[38px] py-[16px] md:px-9 md:py-4 bg-[#F7DF19] text-[#2E8E37] rounded-full font-[crayon] text-[36px] md:text-2xl border-[5px] md:border-[3px] border-[#2E8E37] shadow-[6px_6px_0_0_#2E8E37] md:shadow-[4px_4px_0_0_#2E8E37] -rotate-2 hover:rotate-0 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_#2E8E37] transition-all duration-200 ease-out cursor-pointer whitespace-nowrap"
                        >
                            <span className="md:hidden">View Work</span>
                            <span className="hidden md:inline">View My Work</span>
                        </a>
                    </div>
                </div>

                {/* Stiker doodle - kanan atas */}
                <img
                    src="/stiker.webp"
                    alt=""
                    aria-hidden="true"
                    className="hero-stiker absolute top-24 right-16 md:right-24 w-20 md:w-44 z-10 pointer-events-none"
                />
            </div>

        </section>
    )

}
