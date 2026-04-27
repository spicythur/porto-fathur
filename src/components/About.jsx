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
                start: "top 60%", // Mulai animasi saat bagian atas container mencapai 60% tinggi layar
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
            },
            scale: 0,
            rotation: -90,
            opacity: 0,
            duration: 1,
            ease: "back.out(2)",
            delay: 0.8
        });

    }, { scope: container });

    return (
        <section id="about" ref={container} className="relative z-0 w-full min-h-screen bg-[#2E8E37] -mt-10">

            {/* Konten */}
            <div className="relative z-10 flex w-full h-full min-h-screen px-10 py-20">

                {/* Kiri - Judul + Foto */}
                <div className="flex flex-col w-1/2">

                    {/* Teks About Me SVG */}
                    <img
                        src="/about.svg"
                        alt="About Me"
                        className="about-title w-[90%] mt-40 ml-10 "
                    />

                    {/* Foto Fathur */}
                    <img
                        src="/fathur.svg"
                        alt="Fathur"
                        className="about-photo w-[110%] object-contain mt-0 ml-0"
                    />

                </div>



                {/* Kanan - Deskripsi */}
                <div className="flex flex-col w-1/2 justify-center gap-10 pt-20 mt-70">



                    {/* Teks */}
                    <p className="about-text text-[#F7DF19] text-3xl leading-relaxed font-[crayon]">
                        <span className="text-5xl ">Hi!</span> I am Agus Fathurrahman Rifai <br /> usually
                        called Fathur. I am an Information Technology <br /> student at Universitas Brawijaya,
                        originally from Jakarta.
                    </p>
                    <p className="about-text text-[#F7DF19] text-3xl leading-relaxed font-[crayon]">
                        And also I have a deep passion for <br />bridging the gap between functionality and <br />
                        aesthetics through UI/UX Design and Graphic Design. <br /> Beyond visuals, I am also an
                        enthusiast in coding, <br /> which allows me to understand.
                    </p>

                </div>


                {/* Doodle bunga */}
                <img
                    src="/bunga.svg"
                    alt=""
                    className="about-doodle w-40  self-end mb-190 -mr-10"
                />

            </div>

            <img
                src="/bawah.png"
                alt="bawah"
                className="absolute -bottom-26 left-0 w-full z-20 object-scale-down"
            />
        </section>
    )
}