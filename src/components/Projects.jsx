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
const SCROLL_PER_PANEL = 600; // Diperbesar dari 600 agar kecepatan geser lebih pelan

const Projects = () => {
    const wrapperRef = useRef(null);
    const stickyRef = useRef(null);

    // Hitung secara sinkron agar tidak ada re-render yang mengacaukan GSAP
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    // Hitung tinggi layar yang menyesuaikan dengan efek zoom dari App.jsx
    const scale = typeof window !== 'undefined' ? window.innerWidth / 1440 : 1;
    const bgHeight = typeof window !== 'undefined' ? window.innerHeight / scale : 900;
    
    // Di mobile, user minta pantai dibuat panjang (full screen).
    // Jadi kita kembalikan PANEL_HEIGHT ke bgHeight.
    const PANEL_HEIGHT = isMobile ? bgHeight : 900; 
    const TOTAL_HEIGHT = isMobile ? PANEL_HEIGHT : PANEL_HEIGHT + (projects.length * SCROLL_PER_PANEL);

    useGSAP(() => {
        if (isMobile) {
            // === ANIMASI MOBILE (NATIVE SWIPE) ===
            // Hapus semua efek opacity/scrolltrigger di mobile agar card 100% dijamin muncul
            // Biarkan native CSS yang mengatur layoutnya.
            return; 
        }

        // === ANIMASI DESKTOP (GSAP SCRUB) ===
        const panels = gsap.utils.toArray('.project-panel');

        // Set opacity awal card jadi 0
        gsap.set(panels, { opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${TOTAL_HEIGHT - PANEL_HEIGHT}`, // Scroll sejauh sisa tinggi
                scrub: 2,
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
        }, 0.1); // Mulai di 0.1 (ada jeda)

        // Card muncul (fade in) pas teks setengah naik
        tl.to(panels, {
            opacity: 1,
            duration: 0.2,
            stagger: 0.02,
            ease: "power1.inOut"
        }, 0.15); // Mulai lebih awal (0.15) biar pas setengah jalan udah keliatan

        // Horizontal scroll
        tl.to('.project-wrapper', {
            x: () => {
                const wrapper = wrapperRef.current.querySelector('.project-wrapper');
                return -(wrapper.scrollWidth - 1440 + 0); // 1440 adalah lebar virtual setelah zoom
            },
            ease: "none",
            duration: 1
        }, 0.3); // Dimulai setelah teks selesai naik (0.3)

    }, { scope: wrapperRef, dependencies: [isMobile] });

    return (
        <section
            id="projects"
            ref={wrapperRef}
            className="relative w-full mt-[123px]"
            style={{ height: `${TOTAL_HEIGHT}px` }}
        >
            {/* Sticky container - Dibuat visible agar background pantai bisa keluar/overflow ke bawah */}
            <div
                ref={stickyRef}
                className={`${isMobile ? 'relative' : 'sticky top-0'} left-0 w-full overflow-visible`}
                style={{ height: `${PANEL_HEIGHT}px` }}
            >
                {/* Background pantai */}
                <img
                    src="/pantai.jpg"
                    alt=""
                    className="absolute top-5 left-0 w-full object-cover pointer-events-none"
                    style={{ height: `${PANEL_HEIGHT}px` }}
                />

                {/* Teks Projects */}
                <img
                    src="/project.svg"
                    alt="Projects"
                    className={`project-title-img absolute ${isMobile ? 'top-[350px] w-[90%]' : 'top-20 w-[70%]'} left-1/2 -translate-x-1/2 z-10 pointer-events-none`}
                />

                {/* Doodle burung */}
                <div className="project-doodle absolute left-70 top-40 z-20">
                    <img src="/burung 1.svg" alt="burung" className="w-20" style={{ animation: "float 1.5s ease-in-out infinite" }} />
                </div>
                <div className="project-doodle absolute left-20 top-20 z-20">
                    <img src="/burung 1.svg" alt="burung" className="w-20" style={{ animation: "float 1.5s ease-in-out infinite" }} />
                </div>
                <div className="project-doodle absolute right-70 top-40 z-20">
                    <img src="/burung 2.svg" alt="burung" className="w-20" style={{ animation: "float 2.5s ease-in-out infinite" }} />
                </div>
                <div className="project-doodle absolute right-25 top-20 z-20">
                    <img src="/burung 3.svg" alt="burung" className="w-20" style={{ animation: "float 3s ease-in-out infinite" }} />
                </div>

                {/* Horizontal scroll panels */}
                <div
                    className={`project-wrapper flex h-full ${isMobile ? 'pt-[1200px] pl-[5vw] pr-[5vw] overflow-x-auto snap-x snap-mandatory' : 'pt-[350px] pl-[10vw] pr-[20vw]'}`}
                    style={{ 
                        width: isMobile ? '100%' : 'max-content',
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none' // IE/Edge
                    }}
                >
                    {/* Hide scrollbar for Chrome/Safari using inline style trick or we can rely on standard pseudo-element if available, but for now scrollbarWidth none covers modern browsers */}
                    {projects.map((project, index) => {
                        const rotationClass = index % 2 === 0 ? '-rotate-6' : 'rotate-6';
                        const yOffsetClass = index % 2 === 0 ? 'translate-y-4' : '-translate-y-4';

                        return (
                            <div
                                key={project.id}
                                className={`project-panel shrink-0 flex flex-col justify-start items-center relative ${isMobile ? 'pt-10 snap-center mx-6' : 'pt-3 ' + (index !== 0 ? '-ml-24' : '')}`}
                            >
                                {/* Project Card */}
                                <div className={`project-card bottom-25 relative ${isMobile ? 'w-[850px] h-[850px]' : 'w-[350px] h-[350px]'} bg-[#F4F1EA] shadow-2xl p-4 flex flex-col transition-all duration-300 hover:scale-110 hover:z-50 ${rotationClass} ${yOffsetClass} cursor-pointer rounded-sm`}>
                                    {/* Image Area */}
                                    <div className="w-full h-full relative overflow-hidden rounded-t-sm">
                                        {/* Image covering the top area */}
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500"
                                        />
                                    </div>
                                    
                                    {/* Bottom Text Area */}
                                    <div className="w-full h-[30%] pt-4 px-2 flex flex-col justify-center">
                                        <h3 className={`${isMobile ? 'text-6xl' : 'text-3xl'} font-[crayon] text-[#2E8E37] uppercase leading-none tracking-wide`}>
                                            {project.title}
                                        </h3>
                                        
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;