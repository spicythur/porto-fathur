import React, { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { useGSAP } from '@gsap/react';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger, useGSAP, Draggable, InertiaPlugin);

const projects = [
    {
        id: 1,
        title: 'Porto Fathur',
        imageUrl: '/project/porto.webp',
        alt: 'Porto Fathur portfolio website dengan GSAP scroll animation dan responsive design',
        description: 'Portfolio website Fathur dengan GSAP scroll animation dan responsive design. Personal portfolio built with React, Tailwind CSS, and Lenis to showcase web development, UI/UX design, and graphic design work.',
        tech: ['React', 'Tailwind', 'GSAP'],
        liveUrl: 'https://portofathur.my.id',
        githubUrl: 'https://github.com/spicythur/porto-fathur',
    },
    {
        id: 2,
        title: 'Fusion AI',
        imageUrl: '/project/Fusion.webp',
        alt: 'Fusion AI - AI text-to-3D model generator interface',
        description: 'Fusion AI adalah AI text-to-3D model generator untuk Autodesk Fusion 360. Generate gears, brackets, dan drone frames dari natural language prompts menggunakan TypeScript, Express, dan React.',
        tech: ['TypeScript', 'Express', 'React'],
        liveUrl: null,
        githubUrl: 'https://github.com/spicythur/Fusion-ai',
    },
    {
        id: 3,
        title: 'Purvo',
        imageUrl: '/project/Purvo.webp',
        alt: 'Purvo bilingual brand landing page dengan GSAP scroll animations',
        description: 'Bilingual (EN/ID) brand landing page dengan GSAP scroll animations, showcase, dan story sections. Dibangun dengan React dan Vite untuk pengalaman brand yang halus dan penuh animasi.',
        tech: ['React', 'Vite', 'GSAP'],
        liveUrl: 'https://lepurvo.vercel.app/',
        githubUrl: 'https://github.com/spicythur/Purvo',
    },
    {
        id: 4,
        title: 'Shima Gold',
        imageUrl: '/project/ShimaGold.webp',
        alt: 'Shima Gold landing page brand perhiasan emas yang elegan',
        description: 'Landing page elegan untuk Shima Gold, brand perhiasan emas. Dibangun dengan vanilla HTML, CSS, dan JavaScript dengan layout premium yang fokus pada konversi.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        liveUrl: 'https://shima-gold-website.vercel.app',
        githubUrl: 'https://github.com/spicythur/shima-gold-website',
    },
    { id: 15, title: 'Plantropic', imageUrl: '/project/Plantropic.webp', alt: 'Plantropic B2B SaaS dashboard industrial water monitoring dan ESG analytics', description: 'Platform B2B SaaS untuk real-time industrial water monitoring, ESG data management, dan carbon footprint analytics. Dibangun dengan TypeScript, Next.js, dan Tailwind CSS untuk performa enterprise.', tech: ['TypeScript', 'Next.js', 'Tailwind'], liveUrl: 'https://plantropic-b2-b-industrial-water-ma.vercel.app/', githubUrl: 'https://github.com/darariaisy12/-Plantropic-B2B-Industrial-Water-Management-SaaS-' },
    { id: 5,  title: 'GIS Bootcamp',          imageUrl: '/project/Hasil1.webp',  alt: 'GIS Bootcamp poster event Provoks Multimedia instalasi GIS Laravel',  description: 'Poster event untuk bootcamp Provoks Multimedia — "Instalasi GIS Menggunakan Laravel". Layout bold yang menonjolkan pembicara untuk mendorong registrasi via Discord. Dirancang dengan Adobe Illustrator dan Photoshop.',           tech: ['Adobe Illustrator', 'Photoshop'],      liveUrl: null, githubUrl: null },
    { id: 6,  title: 'Apa itu Provoks?',      imageUrl: '/project/Hasil2.webp',  alt: 'Apa itu Provoks brand awareness poster Provoks Multimedia',      description: 'Graphic brand awareness yang memperkenalkan Provoks Multimedia & Event ke audiens baru. Poster retro-textured dengan tipografi bold dan logo hexagon ikonik Provoks. Didesain dengan Adobe Illustrator.',        tech: ['Adobe Illustrator'],                   liveUrl: null, githubUrl: null },
    { id: 7,  title: 'Mentoring Session',     imageUrl: '/project/Hasil3.webp',  alt: 'Mentoring Session poster event Provoks Vokasi Dieng',     description: 'Poster event untuk mentoring session Provoks di Vokasi Dieng. Disajikan dalam frame phone-mockup dengan tipografi distressed untuk nuansa edgy dan high-energy. Dibuat dengan Adobe Illustrator dan Photoshop.',             tech: ['Adobe Illustrator', 'Photoshop'],      liveUrl: null, githubUrl: null },
    { id: 8,  title: 'DragNDrop Promo',       imageUrl: '/project/Hasil4.webp',  alt: 'DragNDrop Promo social media poster jasa pembuatan website',       description: 'Promo social media untuk studio Drag n Drop — "Butuh jasa pembuatan Website?". Layout split orange-and-blue yang bersih dengan device mockup dan call-to-action kuat. Didesain dengan Adobe Illustrator dan Photoshop.',          tech: ['Adobe Illustrator', 'Photoshop'],      liveUrl: null, githubUrl: null },
    { id: 9,  title: 'DragNDrop Web Dark',    imageUrl: '/project/Hasil5.webp',  alt: 'DragNDrop Web Dark poster promo layanan web design tema gelap',    description: 'Promo layanan bertema dark untuk studio Drag n Drop yang menampilkan mockup website responsif multi-device. Dirancang untuk menonjolkan profesionalisme dan estetika web modern.',  tech: ['Adobe Illustrator', 'Photoshop'],      liveUrl: null, githubUrl: null },
    { id: 10, title: 'DragNDrop Web v2',      imageUrl: '/project/Hasil6.webp',  alt: 'DragNDrop Web v2 poster layanan web design varian kedua',      description: 'Varian kedua poster layanan Web Design Drag n Drop dengan lineup device yang lebih rapi dan treatment warna yang lebih halus untuk Instagram dan kampanye digital.',             tech: ['Adobe Illustrator', 'Photoshop'],      liveUrl: null, githubUrl: null },
    { id: 11, title: 'Extraliminary Jacket',  imageUrl: '/project/Hasil7.webp',  alt: 'Extraliminary Jacket desain varsity jacket navy putih ilustrasi beruang',  description: 'Desain varsity jacket navy dan putih dengan ilustrasi beruang tribal di punggung dan tulisan "Beyond the Limit" di dada. Mockup depan-belakang lengkap dibuat di Illustrator.', tech: ['Adobe Illustrator', 'Apparel Design'], liveUrl: null, githubUrl: null },
    { id: 12, title: 'Provoks Racing Jacket', imageUrl: '/project/Hasil8.webp',  alt: 'Provoks Racing Jacket desain bomber jacket komunitas Provoks', description: 'Bomber jacket ala racing untuk komunitas Provoks Vokasi Programmer. Menampilkan ilustrasi retro game-character dan branding "PROVOKS" bold di bagian depan. Didesain dengan Adobe Illustrator.',    tech: ['Adobe Illustrator', 'Apparel Design'], liveUrl: null, githubUrl: null },
    { id: 13, title: 'Provoks Work Jacket',   imageUrl: '/project/Hasil9.webp',  alt: 'Provoks Work Jacket desain work jacket retro krim oranye',   description: 'Work jacket retro untuk Provoks dalam warna krim dan oranye dengan racing stripes dan patch mascot kucing. Print belakang berbunyi "Think with Logic and Creative" — motto Provoks.',    tech: ['Adobe Illustrator', 'Apparel Design'], liveUrl: null, githubUrl: null },
    { id: 14, title: 'Vokasioner Tee',        imageUrl: '/project/Hasil10.webp', alt: 'Vokasioner Tee desain kaos komunitas Vokasioner mascot warrior',        description: 'Desain kaos untuk komunitas Vokasioner. Depan menampilkan mascot warrior "Adaptive"; belakang membawa tulisan "Born to Create, Build to Innovate" dalam arc lettering bold. Dibuat dengan Adobe Illustrator.',     tech: ['Adobe Illustrator', 'Apparel Design'], liveUrl: null, githubUrl: null },
];

const PANEL_WIDTH = 1000;
// Budget scroll vertikal (dalam koordinat desain 1440) per project — makin kecil,
// makin cepat card geser horizontalnya.
const SCROLL_PER_PANEL = 420;
const CARD_ROTATIONS = ['-rotate-3', 'rotate-2', '-rotate-5', 'rotate-4', '-rotate-2', 'rotate-6', '-rotate-4', 'rotate-3', '-rotate-1', 'rotate-5', '-rotate-6', 'rotate-1', '-rotate-3', 'rotate-2'];
const CARD_Y_OFFSETS = ['translate-y-4', '-translate-y-3', 'translate-y-6', '-translate-y-4', 'translate-y-2', '-translate-y-5', 'translate-y-5', '-translate-y-2', 'translate-y-3', '-translate-y-6', 'translate-y-4', '-translate-y-3', 'translate-y-2', '-translate-y-4'];

const Projects = () => {
    const wrapperRef = useRef(null);
    const stickyRef = useRef(null);
    const dragProxyRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loadedImages, setLoadedImages] = useState({});
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );
    const [isSmallMobile, setIsSmallMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 430 : false
    );
    // Tinggi "panggung" = tinggi viewport dalam koordinat desain 1440 (App pakai
    // zoom = innerWidth/1440). Dipakai untuk fake-pin berbasis transform yang kebal
    // zoom — position:sticky mati total di dalam subtree ber-zoom di Chromium.
    const [stageH, setStageH] = useState(900);

    useEffect(() => {
        const update = () => {
            setIsMobile(window.innerWidth < 768);
            setIsSmallMobile(window.innerWidth < 430);
            setStageH(Math.max(700, Math.round(window.innerHeight * 1440 / window.innerWidth)));
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const handleImageLoad = useCallback((id) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    }, []);

    const TOTAL_HEIGHT = stageH + (projects.length * SCROLL_PER_PANEL);

    useGSAP(() => {
        if (isMobile) return;

        const panels = gsap.utils.toArray('.project-panel');
        if (panels.length === 0) return;

        // Hide cards immediately
        gsap.set(panels, { opacity: 0 });

        // Promosikan strip & panggung ke layer GPU sendiri SEBELUM scrub dimulai.
        // Tanpa ini, GSAP force3D:"auto" bisa bolak-balik antara representasi
        // transform 2D/3D di tengah scroll → repaint mendadak → keliatan "gedek2".
        gsap.set(['.project-wrapper', stickyRef.current], { force3D: true });

        // Jarak pin dalam pixel layar NYATA (getBoundingClientRect sudah kena zoom).
        // Ini yang dipakai ScrollTrigger untuk panjang scrub.
        const getPinDistance = () =>
            wrapperRef.current.getBoundingClientRect().height -
            stickyRef.current.getBoundingClientRect().height;

        // zoom aktif di App.jsx; transform bekerja di koordinat desain (layout),
        // jadi jarak real px harus dibagi zoom untuk dapat jarak translateY layout.
        const getZoom = () =>
            window.innerWidth >= 768 ? window.innerWidth / 1440 : 1;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: () => `+=${getPinDistance()}`,
                scrub: true,
                invalidateOnRefresh: true,
            }
        });

        // FAKE PIN: geser panggung ke bawah persis sebanyak scroll (dalam koordinat
        // desain) supaya terlihat diam di viewport. Transform → kebal zoom, beda
        // dengan position:sticky yang mati di subtree ber-zoom. Satu timeline dengan
        // gerak horizontal → pin & card mustahil desync.
        tl.to(stickyRef.current, {
            y: () => getPinDistance() / getZoom(),
            ease: "none",
            duration: 1,
            force3D: true
        }, 0);

        tl.to('.project-title-img', {
            y: -260,
            scale: 0.5,
            ease: "power2.out",
            duration: 0.35
        }, 0.05);

        tl.to(panels, {
            opacity: 1,
            duration: 0.15,
            stagger: 0.015,
            ease: "power1.inOut",
            immediateRender: false
        }, 0.1);

        tl.to('.project-wrapper', {
            x: () => {
                const wrapper = wrapperRef.current.querySelector('.project-wrapper');
                return -(wrapper.scrollWidth - 1440);
            },
            ease: "none",
            duration: 0.7,
            force3D: true
        }, 0.3);

        // Drag-to-scrub: geser panggung pakai mouse drag, lepas → lanjut dengan
        // inersia (InertiaPlugin) sebelum berhenti. Target Draggable adalah proxy
        // <div> tersembunyi (bukan stickyRef/project-wrapper) — Draggable butuh
        // elemen DOM asli buat baca/tulis style-nya (getComputedStyle dkk.), tapi
        // kita nggak peduli transform yang dia terapkan ke proxy itu sendiri,
        // cukup nerjemahkan this.x jadi window.scrollTo. Klik kartu tetap jalan
        // normal karena Draggable cuma nyegat kalau gerakannya lewatin threshold.
        const st = tl.scrollTrigger;
        let dragStartScroll = 0;

        const draggable = Draggable.create(dragProxyRef.current, {
            type: "x",
            trigger: stickyRef.current,
            inertia: true,
            onPress() {
                dragStartScroll = window.scrollY;
                stickyRef.current.style.cursor = 'grabbing';
            },
            onDrag() {
                window.scrollTo(0, gsap.utils.clamp(st.start, st.end, dragStartScroll - this.x));
            },
            onThrowUpdate() {
                window.scrollTo(0, gsap.utils.clamp(st.start, st.end, dragStartScroll - this.x));
            },
            onRelease() {
                stickyRef.current.style.cursor = '';
            },
        })[0];

        stickyRef.current.style.cursor = 'grab';

        return () => {
            draggable?.kill();
        };

    }, { scope: wrapperRef, dependencies: [isMobile] });

    if (isMobile) {
        return (
            <>
                <section
                    id="projects"
                    ref={wrapperRef}
                    className="relative w-full"
                    style={{ height: '112svh' }}
                >
                    {/* Beach image — 100svh */}
                    <img
                        src="/pantai.webp"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />

                    {/* Teks Projects */}
                    <h2 className="sr-only">Projects</h2>
                    <img
                        src="/project.svg"
                        alt="Projects"
                        className="absolute top-[7%] w-[60%] md:w-[52%] left-1/2 -translate-x-1/2 z-10 pointer-events-none"
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
                        style={{ top: '26%', left: '50%', transform: 'translateX(-50%)' }}>
                        <span className="text-xs font-[crayon] tracking-widest drop-shadow whitespace-nowrap">swipe cards →</span>
                    </div>

                    {/* Cards strip — sama persis kayak desktop (overlap fan) tapi swipeable */}
                    <div
                        className="absolute left-0 right-0 flex overflow-x-auto no-scrollbar z-20"
                        style={{
                            top: '29%',
                            paddingLeft: '5vw',
                            paddingRight: '5vw',
                            paddingBottom: '24px',
                            WebkitOverflowScrolling: 'touch',
                            height: '62svh',
                        }}
                    >
                        {projects.map((project, index) => {
                            const rotation = CARD_ROTATIONS[index % CARD_ROTATIONS.length];
                            const yOffset = CARD_Y_OFFSETS[index % CARD_Y_OFFSETS.length];

                            return (
                                <div
                                    key={project.id}
                                    className={`shrink-0 ${index !== 0 ? '-ml-14' : ''}`}
                                >
                                    <div
                                        onClick={() => setSelectedProject(project)}
                                        className={`project-card relative bg-[#F4F1EA] shadow-xl top-10 flex flex-col cursor-pointer rounded-sm transition-all duration-300 ease-in active:scale-110 active:z-50 ${rotation} ${yOffset}`}
                                        style={{ width: '68vw', height: '68vw' }}
                                    >
                                        {/* Photo with inner frame */}
                                        <div className="px-2 pt-2 flex-1 min-h-0">
                                            <div className="w-full h-full relative overflow-hidden bg-[#e8e5dd]">
                                                {!loadedImages[project.id] && (
                                                    <div className="absolute inset-0 bg-[#e8e5dd] animate-pulse" />
                                                )}
                                                <img
                                                    src={project.imageUrl}
                                                    alt={project.alt || project.title}
                                                    className={`w-full h-full object-contain transition-opacity duration-500 ${loadedImages[project.id] ? 'opacity-100' : 'opacity-0'}`}
                                                    onLoad={() => handleImageLoad(project.id)}
                                                />
                                            </div>
                                        </div>
                                        {/* Caption */}
                                        <div className="relative px-2 pt-1 pb-2 border-t border-[#2E8E37]/30" style={{ height: '32%' }}>
                                            <h3 className="text-xs font-[crayon] text-[#2E8E37] uppercase leading-none tracking-wide">
                                                {project.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {project.tech.slice(0, 2).map((t, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-[7px] px-1.5 py-0.5 bg-[#2E8E37] text-[#F7DF19] rounded-full font-[crayon]"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="mt-1 pr-6 text-[7px] leading-[1.3] text-[#2E8E37]/70 font-[crayon] line-clamp-2">
                                                {project.description}
                                            </p>
                                            <span className="absolute bottom-1.5 right-2 w-5 h-5 rounded-full border border-[#2E8E37]/25 text-[#2E8E37]/25 font-[crayon] text-[8px] flex items-center justify-center">✦</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <ProjectModal
                    project={selectedProject}
                    projects={projects}
                    onClose={() => setSelectedProject(null)}
                    onSelect={setSelectedProject}
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
                    className="absolute top-0 left-0 w-full overflow-visible"
                    style={{ height: `${stageH}px`, willChange: 'transform' }}
                >
                    {/* Proxy Draggable — nggak kelihatan, cuma buat dilacak GSAP */}
                    <div ref={dragProxyRef} className="absolute top-0 left-0 w-px h-px opacity-0 pointer-events-none" aria-hidden="true" />

                    {/* Background pantai — mengisi penuh panggung (setinggi viewport) */}
                    <img
                        src="/pantai.webp"
                        alt=""
                        className="absolute left-0 top-0 w-full h-full object-cover pointer-events-none"
                    />

                    {/* Teks Projects */}
                    <h2 className="sr-only">Projects</h2>
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
                        style={{ width: 'max-content', paddingTop: '350px', willChange: 'transform' }}
                    >
                        {projects.map((project, index) => {
                            const rotation = CARD_ROTATIONS[index % CARD_ROTATIONS.length];
                            const yOffset = CARD_Y_OFFSETS[index % CARD_Y_OFFSETS.length];

                            return (
                                <div
                                    key={project.id}
                                    className={`project-panel shrink-0 flex flex-col justify-start items-center bottom-24 relative pt-3 ${index !== 0 ? '-ml-24' : ''}`}
                                >
                                    <div
                                        onClick={() => setSelectedProject(project)}
                                        className={`project-card relative w-[350px] bg-[#F4F1EA] shadow-xl flex flex-col hover:scale-110 hover:rotate-0 hover:z-50 ${rotation} ${yOffset} cursor-pointer rounded-sm transition-all duration-300`}
                                        style={{ height: '395px' }}
                                    >
                                        {/* Photo with inner frame */}
                                        <div className="px-3 pt-3 flex-1 min-h-0">
                                            <div className="w-full h-full relative overflow-hidden bg-[#e8e5dd]">
                                                {!loadedImages[project.id] && (
                                                    <div className="absolute inset-0 bg-[#e8e5dd] animate-pulse" />
                                                )}
                                                <img
                                                    src={project.imageUrl}
                                                    alt={project.alt || project.title}
                                                    className={`w-full h-full object-contain transition-opacity duration-500 ${loadedImages[project.id] ? 'opacity-100' : 'opacity-0'}`}
                                                    onLoad={() => handleImageLoad(project.id)}
                                                />
                                            </div>
                                        </div>
                                        {/* Caption */}
                                        <div className="relative px-3 pt-2 pb-3 border-t-2 border-[#2E8E37]/30" style={{ height: '150px' }}>
                                            <h3 className="text-2xl font-[crayon] text-[#2E8E37] uppercase leading-none tracking-wide">
                                                {project.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                                                {project.tech.slice(0, 3).map((t, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-[10px] px-2 py-0.5 bg-[#2E8E37] text-[#F7DF19] rounded-full font-[crayon]"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="mt-1.5 pr-8 text-[10px] leading-snug text-[#2E8E37]/70 font-[crayon] line-clamp-3">
                                                {project.description}
                                            </p>
                                            <span className="absolute bottom-2.5 right-3 w-7 h-7 rounded-full border-2 border-[#2E8E37]/25 text-[#2E8E37]/25 font-[crayon] text-xs flex items-center justify-center">✦</span>
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
                projects={projects}
                onClose={() => setSelectedProject(null)}
                onSelect={setSelectedProject}
            />
        </>
    );
};

export default Projects;
