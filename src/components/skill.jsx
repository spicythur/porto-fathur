import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

const SKILLS = [
    { src: '/illustrator.svg', alt: 'Illustrator', w: 'w-40', dur: '4s',   delay: '0s',   style: { top: '380px', left: '50%',  transform: 'translateX(-50%)' } },
    { src: '/react 1.svg',     alt: 'React',       w: 'w-32', dur: '4s',   delay: '0.3s', style: { top: '460px', left: '28%'  } },
    { src: '/typescript.svg',  alt: 'TypeScript',  w: 'w-32', dur: '5s',   delay: '0.7s', style: { top: '460px', right: '28%' } },
    { src: '/photoshop.svg',   alt: 'Photoshop',   w: 'w-40', dur: '5s',   delay: '1s',   style: { top: '560px', left: '5%'   } },
    { src: '/obs.svg',         alt: 'OBS',         w: 'w-40', dur: '6s',   delay: '2s',   style: { top: '560px', right: '5%'  } },
    { src: '/nextjs.svg',      alt: 'Next.js',     w: 'w-32', dur: '4.5s', delay: '1.2s', style: { top: '720px', left: '33%'  } },
    { src: '/tailwind.svg',    alt: 'Tailwind',    w: 'w-32', dur: '5.5s', delay: '0.9s', style: { top: '720px', right: '33%' } },
    { src: '/figma.svg',       alt: 'Figma',       w: 'w-40', dur: '4.5s', delay: '0.5s', style: { top: '800px', left: '5%'   } },
    { src: '/canva.svg',       alt: 'Canva',       w: 'w-40', dur: '5.5s', delay: '1.5s', style: { top: '800px', right: '5%'  } },
];

export default function Skill() {
    const container = useRef();
    const iconRefs = useRef([]);

    useGSAP(() => {
        // Pop-in: skill icons (via refs)
        gsap.from(iconRefs.current.filter(Boolean), {
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

        // Pop-in: doodle dekoratif
        gsap.from(".skill-doodle", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 40%",
            },
            scale: 0,
            rotation: -45,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(2)",
            delay: 0.3
        });

        // Teks "My Skill" meluncur dari atas
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

        // Foto Fathur muncul dari bawah
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

        // Cursor tilt pada foto
        gsap.set(".skill-photo", { transformPerspective: 1000, transformOrigin: "center center" });

        const handleMouseMove = (e) => {
            const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
            const yPos = (e.clientY / window.innerHeight - 0.5) * 2;
            gsap.to(".skill-photo", {
                rotationY: xPos * 20,
                rotationX: -yPos * 20,
                ease: "power2.out",
                duration: 0.5
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Draggable — desktop only
        if (window.innerWidth >= 768) {
            iconRefs.current.filter(Boolean).forEach(el => {
                Draggable.create(el, {
                    type: 'x,y',
                    edgeResistance: 0.65,
                    onPress() {
                        gsap.to(el, { scale: 1.15, duration: 0.15, ease: 'power2.out', zIndex: 50 });
                        document.body.style.cursor = 'grabbing';
                    },
                    onRelease() {
                        gsap.to(el, { scale: 1, duration: 0.35, ease: 'back.out(2)', zIndex: 'auto' });
                        document.body.style.cursor = '';
                    },
                });
            });
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.style.cursor = '';
        };

    }, { scope: container });

    return (
        <section id="skills" ref={container} className="relative z-10 w-full min-h-screen -mt-35">
            {/* Background SVG */}
            <img
                src="/bg3.svg"
                alt=""
                className="absolute -top-15 z-0"
                style={{ width: "100%", height: "100%", minHeight: "210%", objectFit: "fill" }}
            />

            {/* Konten */}
            <div className="relative z-10 flex flex-col w-full min-h-screen px-6 md:px-10 py-20">

                {/* Mobile — grid icons */}
                <div className="md:hidden flex flex-col items-center gap-8 pt-10">
                    <img src="/skill.svg" alt="My Skill" className="skill-title w-[70%]" />
                    <div className="grid grid-cols-3 gap-6 w-full max-w-xs">
                        {SKILLS.map((skill) => (
                            <div key={skill.alt} className="flex flex-col items-center gap-2">
                                <img
                                    src={skill.src}
                                    alt={skill.alt}
                                    className="w-16 h-16 object-contain"
                                    style={{ animation: `float ${skill.dur} ease-in-out infinite ${skill.delay}` }}
                                />
                                <span className="font-[crayon] text-[#2E8E37] text-sm">{skill.alt}</span>
                            </div>
                        ))}
                    </div>
                    <img src="/fathur2.svg" alt="Fathur" className="w-[70%] object-contain pointer-events-none mt-4" />
                </div>

                {/* Desktop — floating draggable icons */}
                <div className="hidden md:block relative">
                    <div className="relative flex items-center justify-center w-full mt-10" style={{ height: "600px" }}>

                        <img
                            src="/skill.svg"
                            alt="My Skill"
                            className="skill-title w-[30%] -ml-230 -mt-10"
                        />

                        {SKILLS.map((skill, index) => (
                            <div
                                key={skill.alt}
                                ref={el => { iconRefs.current[index] = el; }}
                                className="absolute"
                                style={{ cursor: 'grab', zIndex: 20, touchAction: 'none', ...skill.style }}
                            >
                                <img
                                    src={skill.src}
                                    alt={skill.alt}
                                    className={skill.w}
                                    style={{ animation: `float ${skill.dur} ease-in-out infinite ${skill.delay}`, pointerEvents: 'none' }}
                                />
                            </div>
                        ))}

                        <div className="skill-doodle absolute left-40 top-120 rotate-45">
                            <img src="/ikan.svg" alt="ikan" className="w-30" style={{ animation: "float 2s ease-in-out infinite" }} />
                        </div>
                        <div className="skill-doodle absolute right-70 bottom-30 rotate-120">
                            <img src="/ikan.svg" alt="ikan" className="w-20" style={{ animation: "float 7s ease-out infinite" }} />
                        </div>
                        <div className="skill-doodle absolute right-10 -bottom-10 rotate-270">
                            <img src="/ikan.svg" alt="ikan" className="w-50" style={{ animation: "float 4.5s ease-in-out infinite" }} />
                        </div>
                        <div className="skill-doodle absolute right-25 bottom-40">
                            <img src="/kapal.svg" alt="kapal" className="w-60" style={{ animation: "float 7s ease-out infinite" }} />
                        </div>

                        <img
                            src="/fathur2.svg"
                            alt="Fathur"
                            className="skill-photo absolute -bottom-230 -translate-x-1/2 h-[160%] object-cover mb-10 pointer-events-none"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
