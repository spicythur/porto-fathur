import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
    const container = useRef();

    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Background masuk perlahan
        tl.from(".hero-bg", {
            scale: 1.1,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out"
        })

            // 2. Teks jatuh dari atas (target: wrapper)
            .from(".hero-text", {
                y: -150,
                opacity: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)"
            }, "<0.5")

            .set(".hero-text", { y: 0 });

        // 3. Floating animation pada INNER img — tidak conflict dengan scrub
        gsap.to(".hero-text-inner", {
            y: 20,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.5
        });

        // Scrub parallax: background bergerak lebih lambat saat scroll
        gsap.to(".hero-bg", {
            y: -150,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });

        // Scrub parallax: wrapper teks (outer) bergerak + rotate
        // Float di inner tetap jalan — transforms stack secara natural
        gsap.to(".hero-text", {
            y: -100,
            rotation: -3,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.5,
            }
        });

    }, { scope: container });

    return (
        <section ref={container} className="relative z-10 w-full h-screen">

            {/* Background foto alam */}
            <img
                src="/bg4.svg"
                alt=""
                className="hero-bg absolute -top-20"
                style={{
                    width: "140%",
                    height: "140%",
                    objectFit: "fill"
                }}
            />
            {/* Teks Porto Folio — wrapper (scrub) > img (float) */}
            <div className="hero-text absolute top-50 left-50 z-10 w-[45%]">
                <img
                    src="/teks-porto.svg"
                    alt="Porto Folio"
                    className="hero-text-inner w-full"
                />
            </div>

        </section>
    )

}
