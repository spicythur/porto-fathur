import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const NAV_LINKS = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'];

export default function NavBar() {
    const navRef = useRef(null);
    const containerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    useGSAP(() => {
        gsap.set(navRef.current, { yPercent: -100 });
        gsap.set(mobileMenuRef.current, { xPercent: 100, display: 'none' });
    }, { scope: containerRef });

    // Desktop hover
    const handleMouseEnter = () => {
        gsap.to(navRef.current, { yPercent: 0, duration: 0.6, ease: "power3.out", overwrite: true });
    };
    const handleMouseLeave = () => {
        gsap.to(navRef.current, { yPercent: -100, duration: 0.5, ease: "power3.in", overwrite: true });
    };

    // Mobile menu toggle
    const openMobile = () => {
        setMobileOpen(true);
        gsap.set(mobileMenuRef.current, { display: 'flex' });
        gsap.to(mobileMenuRef.current, { xPercent: 0, duration: 0.4, ease: "power3.out" });
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
                                        className="font-[crayon] text-3xl text-white hover:text-[#F7DF19] transition-all duration-300 hover:scale-110 hover:-rotate-3 inline-block cursor-pointer"
                                        style={{ textShadow: "2px 2px 0px rgba(0,0,0,1)" }}
                                    >
                                        {link}
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
                className="md:hidden fixed inset-0 bg-[#2E8E37] flex-col items-center justify-center gap-8 pointer-events-auto"
            >
                <button
                    className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#F7DF19] text-[#2E8E37] text-2xl font-black flex items-center justify-center"
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
                            className="font-[crayon] text-5xl text-[#F7DF19] hover:text-white transition-colors cursor-pointer"
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
