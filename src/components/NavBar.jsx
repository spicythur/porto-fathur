import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function NavBar() {
    const navRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        // Set posisi awal navbar tersembunyi di atas
        gsap.set(navRef.current, { yPercent: -100 });
    }, { scope: containerRef });

    const handleMouseEnter = () => {
        gsap.to(navRef.current, { 
            yPercent: 0, 
            duration: 0.6, 
            ease: "power3.out",
            overwrite: true 
        });
    };

    const handleMouseLeave = () => {
        gsap.to(navRef.current, { 
            yPercent: -100, 
            duration: 0.5, 
            ease: "power3.in",
            overwrite: true 
        });
    };

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        
        // Tutup navbar setelah diklik agar tidak menutupi layar
        handleMouseLeave();

        // Scroll halus ke section yang dituju
        gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: targetId, offsetY: 0 },
            ease: "power3.inOut"
        });
    };

    return (
        // Container fixed di atas dengan pointer-events-none
        <div 
            ref={containerRef}
            className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        >
            {/* Sensor area yang digabungkan: Membungkus sensor atas dan navbar agar tidak ada gap (stutter) */}
            <div 
                className="absolute top-0 left-0 right-0 pointer-events-auto"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Area sensor transparan (menangkap hover di area paling atas) */}
                <div className="h-16 w-full bg-transparent absolute top-0 left-0 z-10"></div>

                {/* Navbar utama yang dianimasikan oleh GSAP */}
                <nav 
                    ref={navRef}
                    className="relative w-full px-8 py-8 flex justify-center items-center bg-[url('/navbar2.svg')] bg-[size:100%_100%] bg-no-repeat pt-10"
                >
                    {/* Navigation Links */}
                    <ul className="flex gap-15 relative z-20">
                        {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => {
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
        </div>
    );
}