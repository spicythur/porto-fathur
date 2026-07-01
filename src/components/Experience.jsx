import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Experience() {
    const container = useRef();

    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    useGSAP(() => {
        const mobile = window.innerWidth < 768;

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
                start: mobile ? "top 85%" : "top 60%",
            }
        });

        const items = gsap.utils.toArray(".exp-item");
        items.forEach((item, i) => {
            const direction = i % 2 === 0 ? -1 : 1;
            gsap.from(item, {
                x: direction * (mobile ? 40 : 100),
                y: 50,
                opacity: 0,
                scale: 0.9,
                rotation: direction * (mobile ? 3 : 8),
                duration: 1,
                ease: "back.out(1.3)",
                scrollTrigger: {
                    trigger: item,
                    start: mobile ? "top 90%" : "top 75%",
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

    return (
        <section id="experience" ref={container} className="relative pb-10 bg-[#2E8E37] md:bg-white md:top-195 overflow-hidden md:overflow-visible">

            <img
                src="/bgexp.svg"
                alt=""
                aria-hidden="true"
                className="absolute exp-bg z-8 inset-0 md:inset-auto md:bottom-190 w-full h-full object-cover md:object-fill"
            />

            <img
                src="/exp.svg"
                alt="Experience"
                className="exp-title relative z-10 w-[70%] md:w-[50%] mx-auto top-1 md:top-8 pt-8"
            />

            {/* Mobile layout — vertical stack */}
            {isMobile && (
                <div className="relative z-10 flex flex-col gap-6 px-4 py-6">

                    <div className="exp-item bg-white/10 rounded-2xl overflow-hidden">
                        <img src="/propok.webp" alt="Provoks Multimedia" className="w-full h-48 object-cover" />
                        <div className="flex items-center gap-3 px-4 py-3">
                            <img src="/Provoks.svg" alt="Provoks" className="w-16 shrink-0" />
                            <p className="text-[#F7DF19] text-xl font-[crayon] leading-tight">Multimedia and Event</p>
                        </div>
                    </div>

                    <div className="exp-item bg-white/10 rounded-2xl overflow-hidden">
                        <img src="/yuwa.webp" alt="PKKMB" className="w-full h-48 object-cover object-top" />
                        <div className="flex items-center gap-3 px-4 py-3">
                            <img src="/pkkmb.svg" alt="PKKMB" className="w-16 shrink-0" />
                            <p className="text-[#F7DF19] text-xl font-[crayon] leading-tight">Staff DDMIT PKKMB</p>
                        </div>
                    </div>

                    <div className="exp-item bg-white/10 rounded-2xl overflow-hidden">
                        <img src="/magang.webp" alt="PSIK" className="w-full h-48 object-cover" />
                        <div className="flex items-center gap-3 px-4 py-3">
                            <img src="/psik.svg" alt="PSIK" className="w-16 shrink-0" />
                            <p className="text-[#F7DF19] text-xl font-[crayon] leading-tight">Internship</p>
                        </div>
                    </div>

                    <div className="exp-item bg-white/10 rounded-2xl overflow-hidden">
                        <img src="/reborn.webp" alt="Provoks Enforcer" className="w-full h-48 object-cover object-top" />
                        <div className="flex items-center gap-3 px-4 py-3">
                            <img src="/Provoks.svg" alt="Provoks" className="w-16 shrink-0" />
                            <p className="text-[#F7DF19] text-xl font-[crayon] leading-tight">Enforcer Event</p>
                        </div>
                    </div>

                </div>
            )}

            {/* Desktop layout — scattered absolute positioning, unchanged */}
            {!isMobile && (
                <div className="relative z-10 mt-5 mx-auto" style={{ width: "100%" }}>
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
            )}

        </section>
    )
}
