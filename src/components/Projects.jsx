import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
    { id: 1, title: 'Project 01', imageUrl: '/project/Hasil1.png' },
    { id: 2, title: 'Project 02', imageUrl: '/project/Hasil2.png' },
    { id: 3, title: 'Project 03', imageUrl: '/project/Hasil3.png' },
    { id: 4, title: 'Project 04', imageUrl: '/project/Hasil4.png' },
    { id: 5, title: 'Project 05', imageUrl: '/project/Hasil5.png' },
    { id: 6, title: 'Project 06', imageUrl: '/project/Hasil6.png' },
    { id: 7, title: 'Project 07', imageUrl: '/project/Hasil7.png' },
    { id: 8, title: 'Project 08', imageUrl: '/project/Hasil8.png' },
    { id: 9, title: 'Project 09', imageUrl: '/project/Hasil9.png' },
    { id: 10, title: 'Project 10', imageUrl: '/project/Hasil10.png' },
];

const PANEL_WIDTH = 1000; // Lebar per panel gambar (diperkecil dari 1440 agar gambar lebih dekat)
const PANEL_HEIGHT = 900;
const SCROLL_PER_PANEL = 1000; // Diperbesar dari 600 agar kecepatan geser lebih pelan
const TOTAL_HEIGHT = PANEL_HEIGHT + (projects.length * SCROLL_PER_PANEL);

const Projects = () => {
    const wrapperRef = useRef(null);
    const stickyRef = useRef(null);

    useGSAP(() => {
        const panels = gsap.utils.toArray('.project-panel');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 2.5,
            }
        });

        // JEDA AWAL: Kita beri ruang kosong di awal timeline (durasi 0.3)
        // Jadi saat user sampai di seksi ini, layar akan diam sejenak sebelum animasi mulai

        // Teks naik
        tl.to('.project-title-img', {
            y: -260,
            scale: 0.5,
            ease: "power2.out",
            duration: 0.5
        }, 0.1); // Mulai di 0.3 (ada jeda)

        // Fade in gambar
        tl.from('.project-panel img', {
            opacity: 0,
            ease: "power2.in",
            duration: 0.2
        }, 0.1);

        // Fade in doodle
        tl.from('.project-doodle', {
            opacity: 0,
            ease: "power2.in",
            duration: 0.3
        }, 0.3);

        // Horizontal scroll
        tl.to('.project-wrapper', {
            xPercent: -100 * (panels.length - 1) / panels.length,
            ease: "none",
            duration: 1
        }, 0.3); // Dimulai setelah teks selesai naik (0.3 + 0.8 = 1.1)

    }, { scope: wrapperRef });

    return (
        <section
            id="projects"
            ref={wrapperRef}
            className="relative w-full mt-[123px]"
            style={{ height: `${TOTAL_HEIGHT}px` }}
        >
            {/* Sticky container - TANPA pin GSAP */}
            <div
                ref={stickyRef}
                className="sticky top-0 left-0 w-full overflow-hidden"
                style={{ height: `${PANEL_HEIGHT}px` }}
            >
                {/* Background pantai */}
                <img
                    src="/pantai.jpg"
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />

                {/* Teks Projects */}
                <img
                    src="/project.svg"
                    alt="Projects"
                    className="project-title-img absolute top-18 left-1/2 -translate-x-1/2 w-[70%] z-10"
                />

                {/* Doodle burung */}
                <div className="project-doodle absolute left-70 top-40">
                    <img src="/burung 1.svg" alt="burung" className="w-20" style={{ animation: "float 1.5s ease-in-out infinite" }} />
                </div>
                <div className="project-doodle absolute left-20 top-20">
                    <img src="/burung 1.svg" alt="burung" className="w-20" style={{ animation: "float 1.5s ease-in-out infinite" }} />
                </div>
                <div className="project-doodle absolute right-70 top-40">
                    <img src="/burung 2.svg" alt="burung" className="w-20" style={{ animation: "float 2.5s ease-in-out infinite" }} />
                </div>
                <div className="project-doodle absolute right-25 top-20">
                    <img src="/burung 3.svg" alt="burung" className="w-20" style={{ animation: "float 3s ease-in-out infinite" }} />
                </div>

                {/* Horizontal scroll panels */}
                <div
                    className="project-wrapper flex h-full"
                    style={{ width: `${projects.length * PANEL_WIDTH}px` }}
                >
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="project-panel shrink-0 h-full flex flex-col justify-center items-center relative pt-32 bottom-15"
                            style={{ width: `${PANEL_WIDTH}px` }}
                        >
                            <div className="h-[60%] w-full flex items-center justify-center px-20">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-auto max-h-[60vh] object-contain hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;