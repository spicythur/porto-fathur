import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Experience() {
    const container = useRef();

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
        <section id="experience" ref={container} className="relative pb-10 bg-white top-190">

            {/* Background SVG (parallax layer) */}
            <img
                src="/bgexp.svg"
                alt=""
                className="absolute exp-bg z-8 bottom-180"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "fill"
                }}
            />
            {/* Judul Experience */}
            <img
                src="/exp.svg"
                alt="Experience"
                className="exp-title relative z-10 w-[50%] mx-auto top-10 pt-8"
            />

            {/* Area scattered items — flow layout */}
            <div className="relative z-10 w-full mt-5 flex flex-col items-center pb-10">

                {/* PROVOKS - Multimedia & Event */}
                <div className="relative exp-item items-center left-13">
                    <img src="/propok.png" alt="Provoks Multimedia" className="relative w-145 h-auto object-contain right-98" />
                    <div>
                        <img src="/Provoks.svg" alt="Provoks" className="relative -left-100 -top-55 w-120" />
                        <p className="relative text-[#F7DF19] text-[32px] font-[crayon] -top-170 left-50 ">
                            Multi<br /> media<br /> and<br />Event
                        </p>
                    </div>
                </div>

                {/* PKKMB - Staff DDMIT */}
                <div className="relative exp-item flex items-center bottom-140">
                    <img src="/pkkmb.svg" alt="PKKMB" className="relative -right-133 bottom-90 w-110 z-10" />
                    <p className="relative text-[#F7DF19] text-[32px] font-[crayon] -right-110 bottom-30">
                        Staff<br />DDMIT<br />PKKMB
                    </p>

                    <img src="/yuwa.png" alt="PKKMB" className="relative bottom-26 h-130 w-auto object-contain z-1" />
                </div>

                {/* PSIK - Internship */}
                <div className="relative exp-item flex items-center bottom-200 right-15">
                    <img src="/magang.png" alt="PSIK" className="relative w-130 object-contain" />

                    <img src="/psik.svg" alt="PSIK" className="relative h-120 right-150" />
                    <p className="relative text-[#F7DF19] text-[32px] font-[crayon] mt-2 tracking-[0.5em] -left-130 bottom-50">
                        Internship
                    </p>
                 </div>

                {/* PROVOKS - Enforcer Event */}
                <div className="relative exp-item items-center -top-270 -right-100">
                   
                    <img src="/reborn.png" alt="Provoks Enforcer" className="relative w-150 object-contain" />
                    <img src="/Provoks.svg" alt="Provoks" className="relative bottom-70 w-120 right-40 rotate-[19deg]" />
                    <p className="relative text-[#F7DF19] font-[crayon] text-[32px] tracking-[0.5em] bottom-108 left-10 ">
                        Enforcer Event
                    </p>
                   
                   
                </div>

                {/* Doodle panah */}
                <img
                    src="/panah.svg"
                    alt=""
                    className="exp-doodle absolute top-20 left-72 w-16"
                />

            </div>

        </section >
    )
}
