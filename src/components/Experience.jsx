import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Lebar desain desktop — dipakai untuk scale layout scattered di mobile
const DESIGN_WIDTH = 1440;

export default function Experience() {
    const container = useRef();

    // Mobile: scale layout scattered desktop agar muat (zoom mempengaruhi layout box)
    const [mobileScale, setMobileScale] = useState(null);
    useEffect(() => {
        const update = () => {
            setMobileScale(window.innerWidth < 768 ? window.innerWidth / DESIGN_WIDTH : null);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    useGSAP(() => {
        const isMobile = window.innerWidth < 768;

        // Parallax background - bergerak lebih lambat dari scroll
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

        // Judul fade in dari atas
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

        // Scattered items muncul satu per satu
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

        // Doodle panah muncul dengan bounce
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

        // Scrub rotation pada scattered items
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

        // Scrub rotation pada doodle panah
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

    return (
        <section id="experience" ref={container} className="relative pb-10 bg-[#2E8E37] md:bg-white md:top-195 overflow-hidden md:overflow-visible">

            {/* Background SVG (parallax layer) — mobile: cover penuh, desktop: fill */}
            <img
                src="/bgexp.svg"
                alt=""
                aria-hidden="true"
                className="absolute exp-bg z-8 inset-0 md:inset-auto md:bottom-190 w-full h-full object-cover md:object-fill"
            />

            {/* Judul Experience */}
            <img
                src="/exp.svg"
                alt="Experience"
                className="exp-title relative z-10 w-[70%] md:w-[50%] mx-auto top-1 md:top-8 pt-8"
            />

            {/* Scattered layout — desktop penuh, mobile di-scale agar muat */}
            <div
                className="relative z-10 mt-5 mx-auto"
                style={mobileScale ? { width: `${DESIGN_WIDTH}px`, zoom: mobileScale, marginBottom: "-1400px" } : { width: "100%" }}
            >
                <div className="flex flex-col items-center pb-10">

                    <div className="relative exp-item items-center left-13">
                        <img src="/propok.webp" alt="Provoks Multimedia" className="relative w-145 h-auto object-contain right-98" />
                        <div>
                            <img src="/Provoks.svg" alt="Provoks" className="relative -left-100 -top-55 w-120" />
                            <p className="relative text-[#F7DF19] text-[32px] font-[crayon] -top-170 left-50">
                                Multi<br />media<br />and<br />Event
                            </p>
                        </div>
                    </div>

                    <div className="relative exp-item flex items-center bottom-140">
                        <img src="/pkkmb.svg" alt="PKKMB" className="relative -right-133 bottom-90 w-110 z-10" />
                        <p className="relative text-[#F7DF19] text-[32px] font-[crayon] -right-120 bottom-30">
                            Staff<br />DDMIT<br />PKKMB
                        </p>
                        <img src="/yuwa.webp" alt="PKKMB" className="relative bottom-26 h-130 w-auto object-contain z-1" />
                    </div>

                    <div className="relative exp-item flex items-center bottom-200 right-15">
                        <img src="/magang.webp" alt="PSIK" className="relative w-130 object-contain" />
                        <img src="/psik.svg" alt="PSIK" className="relative h-120 right-150" />
                        <p className="relative text-[#F7DF19] text-[32px] font-[crayon] mt-2 tracking-[0.5em] -left-130 bottom-50">
                            Internship
                        </p>
                    </div>

                    <div className="relative exp-item items-center -top-270 -right-100">
                        <img src="/reborn.webp" alt="Provoks Enforcer" className="relative w-150 object-contain" />
                        <img src="/Provoks.svg" alt="Provoks" className="relative bottom-70 w-120 right-40 rotate-[19deg]" />
                        <p className="relative text-[#F7DF19] font-[crayon] text-[32px] tracking-[0.5em] bottom-108 left-10">
                            Enforcer Event
                        </p>
                    </div>

                    <img src="/panah.svg" alt="" className="exp-doodle absolute top-20 left-72 w-16" />
                </div>
            </div>

        </section>
    )
}
