import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Skill() {
    const container = useRef();

    useGSAP(() => {
        // Teks "My Skill"
        gsap.from(".skill-title", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 60%",
            },
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "bounce.out"
        });

        // Foto Fathur di tengah
        gsap.from(".skill-photo", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 50%",
            },
            y: 200,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });

        // Icon-icon pop in (muncul membesar) secara berurutan
        gsap.from(".skill-icon", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 40%",
            },
            scale: 0,
            rotation: 45,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(2)"
        });

        // Cursor-driven perspective tilt untuk foto Fathur
        gsap.set(".skill-photo", { transformPerspective: 1000, transformOrigin: "center center" });

        const handleMouseMove = (e) => {
            // Hitung posisi kursor relatif terhadap layar (-1 sampai 1)
            const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
            const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

            // Animasi miring (tilt)
            gsap.to(".skill-photo", {
                rotationY: xPos * 20, // max 20 derajat miring ke kiri/kanan
                rotationX: -yPos * 20, // max 20 derajat miring ke atas/bawah
                ease: "power2.out",
                duration: 0.5
            });
        };

        // Pasang event listener ke window
        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup function
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };

    }, { scope: container });

    return (
        <section id="skills" ref={container} className="relative z-10 w-full min-h-screen -mt-35">
            {/* Background SVG */}
            <img
                src="/bg3.svg"
                alt=""
                className="absolute -top-1 z-0"
                style={{
                    width: "100%",    // ganti angkanya sesuka kamu
                    height: "210%",   // ganti angkanya sesuka kamu
                    objectFit: "fill"
                }}
            />

            {/* Konten */}
            <div className="relative z-10 flex flex-col w-full min-h-screen px-10 py-20 ">



                {/* Area tengah - icon + foto */}
                <div className="relative flex items-center justify-center w-full mt-10" style={{ height: "600px" }}>


                    {/* Teks My Skill */}
                    <img
                        src="/skill.svg"
                        alt="My Skill"
                        className="skill-title w-[30%] -ml-230 -mt-10"
                    />
                    {/* Icon Illustrator - atas tengah */}
                    <div className="skill-icon absolute top-70 left-1/2 -translate-x-1/2">
                        <img src="/ai.svg" alt="Illustrator" className="w-80" style={{ animation: "float 4s ease-in-out infinite" }} />
                    </div>

                    {/* Icon Photoshop - kiri */}
                    <div className="skill-icon absolute left-60 top-120">
                        <img src="/ps.svg" alt="Photoshop" className="w-80" style={{ animation: "float 5s ease-in-out infinite 1s" }} />
                    </div>

                    {/* Icon OBS - kanan */}
                    <div className="skill-icon absolute right-60 top-120">
                        <img src="/obs.svg" alt="OBS" className="w-80" style={{ animation: "float 6s ease-in-out infinite 2s" }} />
                    </div>

                    {/* Icon Figma - kiri bawah */}
                    <div className="skill-icon absolute left-10 -bottom-120">
                        <img src="/figma.svg" alt="Figma" className="w-80" style={{ animation: "float 4.5s ease-in-out infinite 0.5s" }} />
                    </div>

                    {/* Icon Canva - kanan bawah */}
                    <div className="skill-icon absolute right-10 -bottom-120">
                        <img src="/canva.svg" alt="Canva" className="w-80" style={{ animation: "float 5.5s ease-in-out infinite 1.5s" }} />
                    </div>

                    {/* Doodle ikan kiri */}
                    <div className="skill-icon absolute left-40 top-120 rotate-45">
                        <img src="/ikan.svg" alt="ikan" className="w-30" style={{ animation: "float 2s ease-in-out infinite" }} />
                    </div>

                    {/* Doodle ikan kanan */}
                    <div className="skill-icon absolute right-70 bottom-30 rotate-120">
                        <img src="/ikan.svg" alt="ikan" className="w-20" style={{ animation: "float 7s ease-out infinite " }} />
                    </div>

                    {/* Doodle ikan kanan */}
                    <div className="skill-icon absolute right-10 -bottom-10 rotate-270">
                        <img src="/ikan.svg" alt="ikan" className="w-50" style={{ animation: "float 4.5s ease-in-out infinite " }} />
                    </div>

                    {/* Doodle ikan kanan */}
                    <div className="skill-icon absolute right-25 bottom-40">
                        <img src="/kapal.svg" alt="kapal" className="w-60" style={{ animation: "float 7s ease-out infinite " }} />
                    </div>

                    {/* Foto Fathur tengah */}
                    <img
                        src="/fathur2.svg"
                        alt="Fathur"
                        className="skill-photo absolute -bottom-230 left-1/3 -translate-x-1/2 h-[170%] object-cover mb-10"
                    />

                </div>

            </div>

        </section>
    )
}