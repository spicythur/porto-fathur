import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function About() {
    const container = useRef();

    useGSAP(() => {
        // Teks "About Me" meluncur dari kiri
        gsap.from(".about-title", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 60%",
                toggleActions: "play none none reverse"
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        });

        // Foto Fathur meluncur dari kiri
        gsap.from(".about-photo", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 50%",
                toggleActions: "play none none reverse"
            },
            x: -150,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2
        });

        // Teks perkenalan dengan efek SplitText responsive (Line by line)
        SplitText.create(".about-text", {
            type: "lines",
            autoSplit: true,
            onSplit(self) {
                return gsap.from(self.lines, {
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 50%",
                        toggleActions: "play none none reverse"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    delay: 0.4
                });
            }
        });

        // Doodle bunga membesar dan berputar
        gsap.from(".about-doodle", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 40%",
                toggleActions: "play none none reverse"
            },
            scale: 0,
            rotation: -90,
            opacity: 0,
            duration: 1,
            ease: "back.out(2)",
            delay: 0.8
        });

        // Scrub rotation pada doodle bunga
        gsap.to(".about-doodle", {
            rotation: 45,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            }
        });

        // Scrub: foto Fathur sedikit miring saat scroll
        gsap.to(".about-photo", {
            rotation: -2,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
            }
        });

    }, { scope: container });

    return (
        <section id="about" ref={container} className="relative z-0 w-full md:min-h-screen bg-[#2E8E37] -mt-20 md:-mt-70">

            {/* Konten */}
            <div className="relative z-10 flex flex-col md:flex-row w-full md:h-full md:min-h-screen px-6 md:px-10 py-12 md:py-20">

                {/* Kiri / Atas (mobile) - Judul + Foto */}
                <div className="flex flex-col items-center md:items-stretch w-full md:w-1/2">

                    <img
                        src="/about.svg"
                        alt="About Me"
                        className="about-title w-[45%] md:w-[90%] mt-10 md:mt-40 mx-auto md:ml-10"
                    />

                    <img
                        src="/fathur.svg"
                        alt="Fathur"
                        className="about-photo w-[72%] md:w-full object-contain mx-auto md:ml-0 -mt-8 md:mt-0 pointer-events-none"
                    />

                </div>

                {/* Kanan / Bawah (mobile) - Deskripsi */}
                <div className="flex flex-col w-full md:w-1/2 justify-center gap-5 md:gap-10 pt-2 md:pt-20 md:mt-70 px-2 md:px-0">

                    <p className="about-text text-[#F7DF19] text-lg md:text-2xl leading-relaxed font-[crayon] text-center md:text-left">
                        <span className="text-3xl md:text-5xl">Hi!</span> I am Agus Fathurrahman Rifai usually called Fathur. I am an Information Technology student at Universitas Brawijaya, originally from Jakarta.
                    </p>
                    <p className="about-text text-[#F7DF19] text-lg md:text-2xl leading-relaxed font-[crayon] text-center md:text-left">
                        And also I have a deep passion for bridging the gap between functionality and aesthetics through UI/UX Design and Graphic Design. Beyond visuals, I am also an enthusiast in coding, which allows me to understand.
                    </p>

                </div>

                {/* Doodle bunga */}
                <img
                    src="/bunga.svg"
                    alt=""
                    aria-hidden="true"
                    className="about-doodle w-24 md:w-40 self-center md:self-end mt-6 md:mb-190 md:-mr-10"
                />

            </div>

            <img
                src="/bawah.webp"
                alt="bawah"
                className="absolute -bottom-11 md:-bottom-20 left-0 w-full z-20 object-scale-down pointer-events-none"
            />
        </section>
    )
}