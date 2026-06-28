import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const NAV_LINKS = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'];

// Squiggle underline tulisan tangan — kegambar pas hover (teknik path-draw)
function Squiggle() {
    return (
        <svg
            className="pointer-events-none absolute -bottom-2 left-0 w-full h-3 overflow-visible"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <path
                d="M2 6 Q 14 1 26 6 T 50 6 T 74 6 T 98 5"
                pathLength="1"
                fill="none"
                strokeLinecap="round"
                className="stroke-[#F7DF19] [stroke-width:3] [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-300 ease-out group-hover:[stroke-dashoffset:0]"
            />
        </svg>
    );
}

export default function NavBar() {
    const navRef = useRef(null);
    const containerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    useGSAP(() => {
        gsap.set(navRef.current, { yPercent: -100 });
        gsap.set(mobileMenuRef.current, { xPercent: 100, display: 'none' });
    }, { scope: containerRef });

    // Desktop hover — slide down + links pop-in staggered
    const handleMouseEnter = () => {
        gsap.to(navRef.current, { yPercent: 0, duration: 0.6, ease: "power3.out", overwrite: true });
        gsap.fromTo('.nav-link-d',
            { y: -24, opacity: 0, scale: 0.5, rotation: -10 },
            { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.06, ease: "back.out(2.5)", delay: 0.15, overwrite: true }
        );
    };
    const handleMouseLeave = () => {
        gsap.to(navRef.current, { yPercent: -100, duration: 0.5, ease: "power3.in", overwrite: true });
    };

    // Mobile menu — slide in + links pop-in + doodles
    const openMobile = () => {
        setMobileOpen(true);
        gsap.set(mobileMenuRef.current, { display: 'flex' });
        gsap.to(mobileMenuRef.current, { xPercent: 0, duration: 0.4, ease: "power3.out" });
        gsap.fromTo('.nav-link-m',
            { y: 44, opacity: 0, scale: 0.5, rotation: -6 },
            { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.55, stagger: 0.08, ease: "back.out(2)", delay: 0.2 }
        );
        gsap.fromTo('.nav-doodle',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 0.55, duration: 0.6, stagger: 0.12, ease: "back.out(2)", delay: 0.1 }
        );
    };
    const closeMobile = () => {
        gsap.to(mobileMenuRef.current, {
            xPercent: 100, duration: 0.35, ease: "power3.in",
            onComplete: () => {
                gsap.set(mobileMenuRef.current, { display: 'none' });
                setMobileOpen(false);
            }
        });
    };

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        handleMouseLeave();
        closeMobile();
        const offsetY = targetId === '#experience' ? -400 : 0;
        gsap.to(window, { duration: 1.2, scrollTo: { y: targetId, offsetY }, ease: "power3.inOut" });
    };

    return (
        <div ref={containerRef} className="fixed top-0 left-0 right-0 z-50 pointer-events-none">

            {/* Desktop navbar — hover trigger */}
            <div
                className="hidden md:block absolute top-0 left-0 right-0 pointer-events-auto"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="h-16 w-full bg-transparent absolute top-0 left-0 z-10" />
                <nav
                    ref={navRef}
                    className="relative w-full px-8 py-8 flex justify-center items-center bg-[url('/navbar2.svg')] bg-[size:100%_100%] bg-no-repeat pt-10"
                >
                    <ul className="flex gap-15 relative z-20">
                        {NAV_LINKS.map((link) => {
                            const targetId = `#${link.toLowerCase()}`;
                            return (
                                <li key={link}>
                                    <a
                                        href={targetId}
                                        onClick={(e) => handleNavClick(e, targetId)}
                                        className="nav-link-d group relative font-[crayon] text-3xl text-white hover:text-[#F7DF19] transition-[color,transform] duration-300 hover:scale-110 hover:-rotate-3 inline-block cursor-pointer"
                                        style={{ textShadow: "2px 2px 0px rgba(0,0,0,1)" }}
                                    >
                                        {link}
                                        <Squiggle />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/* Mobile hamburger button */}
            <button
                className="md:hidden absolute top-4 right-4 pointer-events-auto z-50 w-11 h-11 rounded-full bg-[#2E8E37] flex flex-col items-center justify-center gap-1.5 shadow-lg"
                onClick={mobileOpen ? closeMobile : openMobile}
                aria-label="Toggle menu"
            >
                <span className={`block w-5 h-0.5 bg-[#F7DF19] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-[#F7DF19] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-[#F7DF19] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* Mobile slide-in menu */}
            <div
                ref={mobileMenuRef}
                className="md:hidden fixed inset-0 bg-[#2E8E37] flex-col items-center justify-center gap-8 pointer-events-auto overflow-hidden"
            >
                {/* Doodles dekoratif melayang */}
                <img src="/ikan.svg" alt="" aria-hidden="true" className="nav-doodle absolute left-6 top-24 w-16 rotate-12 pointer-events-none" style={{ animation: "float 4s ease-in-out infinite" }} />
                <img src="/kapal.svg" alt="" aria-hidden="true" className="nav-doodle absolute right-5 top-32 w-24 -rotate-6 pointer-events-none" style={{ animation: "float 6s ease-in-out infinite" }} />
                <img src="/ikan.svg" alt="" aria-hidden="true" className="nav-doodle absolute right-10 bottom-24 w-20 -rotate-12 pointer-events-none" style={{ animation: "float 5s ease-in-out infinite" }} />

                <button
                    className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#F7DF19] text-[#2E8E37] text-2xl font-black flex items-center justify-center z-10"
                    onClick={closeMobile}
                    aria-label="Close menu"
                >
                    ×
                </button>
                {NAV_LINKS.map((link) => {
                    const targetId = `#${link.toLowerCase()}`;
                    return (
                        <a
                            key={link}
                            href={targetId}
                            onClick={(e) => handleNavClick(e, targetId)}
                            className="nav-link-m relative z-10 font-[crayon] text-5xl text-[#F7DF19] transition-transform duration-200 hover:scale-110 hover:-rotate-3 active:scale-110 active:-rotate-3 cursor-pointer"
                            style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
                        >
                            {link}
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
