import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
    const container = useRef();
    const btnRef = useRef(null);

    useGSAP(() => {
        const isMobile = window.innerWidth < 768;

        // Background parallax - bergerak lebih lambat saat scroll masuk
        gsap.to(".contact-bg", {
            y: -80,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });

        // Stagger reveal semua konten
        gsap.from(".contact-item", {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container.current,
                start: isMobile ? "top 85%" : "top 60%",
                toggleActions: "play none none reverse"
            }
        });

        // Scrub rotation pada social icons
        const socialLinks = gsap.utils.toArray('.contact-item');
        socialLinks.forEach((el, i) => {
            if (i >= 4) { // social icon containers (index 4+)
                gsap.fromTo(el, {
                    rotation: -5,
                }, {
                    rotation: 5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                    }
                });
            }
        });

        // Stiker doodle: pop-in + float melayang
        gsap.from(".contact-stiker", {
            scale: 0,
            rotation: -90,
            opacity: 0,
            duration: 0.9,
            ease: "back.out(2)",
            delay: 0.4,
            scrollTrigger: {
                trigger: container.current,
                start: isMobile ? "top 85%" : "top 60%",
            }
        });

        gsap.to(".contact-stiker", {
            y: -12,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });

        // Button idle pulse
        const btn = btnRef.current;
        if (btn) {
            const pulse = gsap.to(btn, {
                scale: 1.05,
                duration: 0.8,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                paused: true,
            });

            // Mulai pulse setelah section terlihat
            ScrollTrigger.create({
                trigger: container.current,
                start: "top 40%",
                onEnter: () => pulse.play(),
            });

            // Hover: hentikan pulse, scale up
            btn.addEventListener("mouseenter", () => {
                pulse.pause();
                gsap.to(btn, { scale: 1.12, duration: 0.3, ease: "back.out(2)" });
            });
            btn.addEventListener("mouseleave", () => {
                gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out", onComplete: () => pulse.play() });
            });
        }

    }, { scope: container });

    return (
        <section id="contact" ref={container} className="relative w-cover z-20 -mt-8 md:-mt-35">

            {/* Background SVG */}
            <img
                src="/bb-contact.svg"
                alt=""
                aria-hidden="true"
                className="contact-bg absolute md:top-18 left-0"
                style={{ width: "100%", height: "110%", objectFit: "cover" }}
            />

            {/* Konten */}
            <div className="relative z-10 flex flex-col items-center justify-center py-12 md:py-80 pb-16 md:pb-24 gap-2 md:gap-6 min-h-[55vh] md:min-h-screen">

                {/* Stiker doodle - samping judul */}
                <img
                    src="/foot.webp"
                    alt=""
                    aria-hidden="true"
                    className="contact-stiker absolute top-6 right-3 md:top-5 md:-left-70 w-14 md:w-200  pointer-events-none"
                />

                {/* Judul */}
                <h2
                    className="contact-item text-5xl md:text-7xl  text-[#F7DF19] text-center"
                    style={{ fontFamily: "crayon, sans-serif" }}
                >
                    Contact Me!
                </h2>

                {/* Email & Phone */}
                <p className="contact-item text-[#F7DF19] font-bold text-sm md:text-xl tracking-widest text-center px-4">
                    RIFAAIFATHUR@GMAIL.COM
                </p>
                <p className="contact-item text-[#F7DF19] font-bold text-sm md:text-xl tracking-widest text-center">
                    +62 851 5832 9255
                </p>

                {/* Tombol */}
                <a
                    ref={btnRef}
                    href="https://wa.me/6285158329255?text=Halo%20Fathur!%20Saya%20tertarik%20untuk%20bekerja%20sama%20dengan%20kamu."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item mt-2 px-5 py-2 text-xs md:px-8 md:py-3 md:text-base bg-[#F7DF19] rounded-full text-[#2E8E37] font-black tracking-widest hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-colors duration-300 inline-block"
                >
                    WORKING WITH ME
                </a>

                {/* Social icons */}
                <div className="contact-item flex gap-3 md:gap-4 mt-2">
                    {[
                        { icon: <FaInstagram className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />, label: "Instagram", href: "https://www.instagram.com/tthuuur?igsh=N3RpeGo4MXR6dnR0&utm_source=qr" },
                        { icon: <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />, label: "LinkedIn", href: "https://www.linkedin.com/in/agus-fathurrahman-rifai/" },
                        { icon: <FaGithub className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />, label: "GitHub", href: "https://github.com/spicythur" }
                    ].map((item, i) => (

                        <a
                            key={i}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.label}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#F7DF19] flex items-center justify-center text-[#2E8E37] hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-all duration-300"
                        >
                            {item.icon}
                        </a>
                    ))}
                </div>

            </div>

        </section>
    )
}
