import React, { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
    { id: 1, title: 'Project 01', imageUrl: '/project/Hasil1.png', description: 'A modern web application with responsive design and smooth animations.', tech: ['React', 'Tailwind', 'GSAP'], liveUrl: '#', githubUrl: '#' },
    { id: 2, title: 'Project 02', imageUrl: '/project/Hasil2.png', description: 'Interactive dashboard with real-time data visualization.', tech: ['React', 'Chart.js'], liveUrl: '#', githubUrl: '#' },
    { id: 3, title: 'Project 03', imageUrl: '/project/Hasil3.png', description: 'E-commerce platform with clean UI and seamless checkout flow.', tech: ['Next.js', 'Tailwind'], liveUrl: '#', githubUrl: '#' },
    { id: 4, title: 'Project 04', imageUrl: '/project/Hasil4.png', description: 'Portfolio website with creative animations and scroll effects.', tech: ['React', 'GSAP', 'Lenis'], liveUrl: '#', githubUrl: '#' },
    { id: 5, title: 'Project 05', imageUrl: '/project/Hasil5.png', description: 'Landing page with modern design and micro-interactions.', tech: ['HTML', 'CSS', 'JS'], liveUrl: '#', githubUrl: '#' },
    { id: 6, title: 'Project 06', imageUrl: '/project/Hasil6.png', description: 'Blog platform with markdown support and dark mode.', tech: ['React', 'MDX'], liveUrl: '#', githubUrl: '#' },
    { id: 7, title: 'Project 07', imageUrl: '/project/Hasil7.png', description: 'Task management app with drag-and-drop functionality.', tech: ['React', 'DnD'], liveUrl: '#', githubUrl: '#' },
    { id: 8, title: 'Project 08', imageUrl: '/project/Hasil8.png', description: 'Weather app with beautiful UI and location-based data.', tech: ['React', 'API'], liveUrl: '#', githubUrl: '#' },
    { id: 9, title: 'Project 09', imageUrl: '/project/Hasil9.png', description: 'Social media dashboard with analytics and insights.', tech: ['React', 'Tailwind'], liveUrl: '#', githubUrl: '#' },
    { id: 10, title: 'Project 10', imageUrl: '/project/Hasil10.png', description: 'Creative agency website with scroll-driven storytelling.', tech: ['React', 'GSAP'], liveUrl: '#', githubUrl: '#' },
];

const PANEL_WIDTH = 1000;
const SCROLL_PER_PANEL = 600;

const Projects = () => {
    const wrapperRef = useRef(null);
    const stickyRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loadedImages, setLoadedImages] = useState({});
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );
    const [isSmallMobile, setIsSmallMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 430 : false
    );

    useEffect(() => {
        const update = () => {
            setIsMobile(window.innerWidth < 768);
            setIsSmallMobile(window.innerWidth < 430);
        };
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const handleImageLoad = useCallback((id) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    }, []);

    const PANEL_HEIGHT = 900;
    const TOTAL_HEIGHT = isMobile ? PANEL_HEIGHT : PANEL_HEIGHT + (projects.length * SCROLL_PER_PANEL);

    useGSAP(() => {
        if (isMobile) return;

        const panels = gsap.utils.toArray('.project-panel');
        if (panels.length === 0) return;

        // Hide cards immediately
        gsap.set(panels, { opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${TOTAL_HEIGHT - PANEL_HEIGHT}`,
                scrub: 2,
            }
        });

        tl.to('.project-title-img', {
            y: -260,
            scale: 0.5,
            ease: "power2.out",
            duration: 0.5,
            immediateRender: true
        }, 0.1);

        tl.to(panels, {
            opacity: 1,
            duration: 0.2,
            stagger: 0.02,
            ease: "power1.inOut",
            immediateRender: false
        }, 0.15);

        tl.to('.project-wrapper', {
            x: () => {
                const wrapper = wrapperRef.current.querySelector('.project-wrapper');
                return -(wrapper.scrollWidth - 1440);
            },
            ease: "none",
            duration: 1
        }, 0.3);

    }, { scope: wrapperRef, dependencies: [isMobile] });

    if (isMobile) {
        return (
            <>
                <section
                    id="projects"
                    className="relative w-full -mt-190"
                    style={{ height: '180svh' }}
                >
                    {/* Beach image — 100svh */}
                    <img
                        src="/pantai.jpg"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none top-15"
                    />

                    {/* Teks Projects */}
                    <img
                        src="/project.svg"
                        alt="Projects"
                        className="absolute top-[5%] w-[60%] left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                    />

                    {/* Doodle burung */}
                    <div className="absolute left-[5%] top-[3%] z-20">
                        <img src="/burung 1.svg" alt="burung" className="w-10" style={{ animation: 'float 1.5s ease-in-out infinite' }} />
                    </div>
                    <div className="absolute left-[20%] top-[8%] z-20">
                        <img src="/burung 1.svg" alt="burung" className="w-10" style={{ animation: 'float 2s ease-in-out infinite' }} />
                    </div>
                    <div className="absolute right-[20%] top-[8%] z-20">
                        <img src="/burung 2.svg" alt="burung" className="w-10" style={{ animation: 'float 2.5s ease-in-out infinite' }} />
                    </div>
                    <div className="absolute right-[5%] top-[3%] z-20">
                        <img src="/burung 3.svg" alt="burung" className="w-10" style={{ animation: 'float 3s ease-in-out infinite' }} />
                    </div>

                    {/* Swipe hint */}
                    <div className="absolute z-30 flex items-center gap-1 text-white/80"
                        style={{ top: 'calc(100svh - 36px)', left: '50%', transform: 'translateX(-50%)' }}>
                        <span className="text-xs font-[crayon] tracking-widest drop-shadow whitespace-nowrap">swipe cards →</span>
                    </div>

                    {/* Cards strip — sama persis kayak desktop (overlap fan) tapi swipeable */}
                    <div
                        className="absolute left-0 right-0 flex overflow-x-auto no-scrollbar z-20"
                        style={{
                            top: 'calc(100svh - 100px)',
                            paddingLeft: '5vw',
                            paddingRight: '5vw',
                            paddingBottom: '24px',
                            WebkitOverflowScrolling: 'touch',
                            height: 'calc(100svh - 100px)',
                        }}
                    >
                        {projects.map((project, index) => {
                            const rotationClass = index % 2 === 0 ? '-rotate-6' : 'rotate-6';
                            const yOffsetClass = index % 2 === 0 ? 'translate-y-3' : '-translate-y-3';

                            return (
                                <div
                                    key={project.id}
                                    className={`shrink-0 ${index !== 0 ? '-ml-14' : ''}`}
                                >
                                    <div
                                        onClick={() => setSelectedProject(project)}
                                        className={`project-card relative bg-[#F4F1EA] shadow-2xl top-10 p-3 flex flex-col cursor-pointer rounded-sm transition-all duration-300 ease-in active:scale-110 active:z-50 ${rotationClass} ${yOffsetClass}`}
                                        style={{ width: '68vw', height: '68vw' }}
                                    >
                                        {/* Image — 70% */}
                                        <div className="w-full relative overflow-hidden rounded-t-sm" style={{ height: '70%' }}>
                                            {!loadedImages[project.id] && (
                                                <div className="absolute inset-0 bg-[#e8e5dd] animate-pulse" />
                                            )}
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages[project.id] ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                onLoad={() => handleImageLoad(project.id)}
                                            />
                                        </div>
                                        {/* Info — 30% */}
                                        <div className="w-full flex flex-col justify-center" style={{ height: '30%' }}>
                                            <h3 className="text-xs font-[crayon] text-[#2E8E37] uppercase leading-none tracking-wide">
                                                {project.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {project.tech.slice(0, 2).map((t, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-[7px] px-1 py-0.5 bg-[#2E8E37] text-[#F7DF19] rounded-full font-[crayon]"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            </>
        );
    }

    // ── DESKTOP: GSAP horizontal scroll ──────────────────────────────────────
    return (
        <>
            <section
                id="projects"
                ref={wrapperRef}
                className="relative w-full -mt-200"
                style={{ height: `${TOTAL_HEIGHT}px` }}
            >
                <div
                    ref={stickyRef}
                    className="sticky top-0 left-0 w-full overflow-visible"
                    style={{ height: `${PANEL_HEIGHT}px` }}
                >
                    {/* Background pantai */}
                    <img
                        src="/pantai.jpg"
                        alt=""
                        className="absolute left-0 w-full object-cover pointer-events-none"
                        style={{ height: `${PANEL_HEIGHT}px` }}
                    />

                    {/* Teks Projects */}
                    <img
                        src="/project.svg"
                        alt="Projects"
                        className="project-title-img absolute top-20 w-[70%] left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                    />

                    {/* Doodle burung */}
                    <div className="project-doodle absolute left-70 top-40 z-20">
                        <img src="/burung 1.svg" alt="burung" className="w-20" style={{ animation: 'float 1.5s ease-in-out infinite' }} />
                    </div>
                    <div className="project-doodle absolute left-20 top-20 z-20">
                        <img src="/burung 1.svg" alt="burung" className="w-20" style={{ animation: 'float 1.5s ease-in-out infinite' }} />
                    </div>
                    <div className="project-doodle absolute right-70 top-40 z-20">
                        <img src="/burung 2.svg" alt="burung" className="w-20" style={{ animation: 'float 2.5s ease-in-out infinite' }} />
                    </div>
                    <div className="project-doodle absolute right-25 top-20 z-20">
                        <img src="/burung 3.svg" alt="burung" className="w-20" style={{ animation: 'float 3s ease-in-out infinite' }} />
                    </div>

                    {/* Horizontal scroll panels */}
                    <div
                        className="project-wrapper flex h-full pl-[10vw] pr-[20vw]"
                        style={{ width: 'max-content', paddingTop: '350px' }}
                    >
                        {projects.map((project, index) => {
                            const rotationClass = index % 2 === 0 ? '-rotate-6' : 'rotate-6';
                            const yOffsetClass = index % 2 === 0 ? 'translate-y-4' : '-translate-y-4';

                            return (
                                <div
                                    key={project.id}
                                    className={`project-panel shrink-0 flex flex-col justify-start items-center bottom-24 relative pt-3 ${index !== 0 ? '-ml-24' : ''
                                        }`}
                                >
                                    <div
                                        onClick={() => setSelectedProject(project)}
                                        className={`project-card relative w-[350px] bg-[#F4F1EA] shadow-2xl p-4 flex flex-col hover:scale-110 hover:z-50 ${rotationClass} ${yOffsetClass} cursor-pointer rounded-sm transition-all duration-300`}
                                        style={{ height: '350px' }}
                                    >
                                        <div className="w-full relative overflow-hidden rounded-t-sm" style={{ height: '70%' }}>
                                            {!loadedImages[project.id] && (
                                                <div className="absolute inset-0 bg-[#e8e5dd] animate-pulse" />
                                            )}
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages[project.id] ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                onLoad={() => handleImageLoad(project.id)}
                                            />
                                        </div>
                                        <div className="w-full flex flex-col justify-center" style={{ height: '30%' }}>
                                            <h3 className="text-3xl font-[crayon] text-[#2E8E37] uppercase leading-none tracking-wide">
                                                {project.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                                                {project.tech.slice(0, 3).map((t, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-[11px] px-2 py-0.5 bg-[#2E8E37] text-[#F7DF19] rounded-full font-[crayon]"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Modal */}
            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
};

export default Projects;
