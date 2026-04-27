import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
    const container = useRef();

    useGSAP(() => {
        // Membuat GSAP Timeline
        const tl = gsap.timeline();

        // 1. Background masuk perlahan (Zoom out tipis & Fade in)
        tl.from(".hero-bg", {
            scale: 1.1,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out"
        })

            // 2. Teks jatuh dari atas
            // Parameter "<0.5" berarti animasi ini mulai 0.5 detik SETELAH animasi background dimulai (tanpa harus nunggu bg selesai)
            .from(".hero-text", {
                y: -150,
                opacity: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)"
            }, "<0.5")

            // 3. Efek mengambang (floating)
            // Parameter ">" berarti animasi ini otomatis mulai TEPAT SETELAH animasi teks jatuh selesai
            .to(".hero-text", {
                y: "+=20",
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }, ">");

    }, { scope: container });

    return (
        <section ref={container} className="relative z-10 w-full h-screen">

            {/* Background foto alam */}
            <img
                src="/bg4.svg"
                alt=""
                className="hero-bg absolute -top-20"
                style={{
                    width: "140%",    // ganti angkanya sesuka kamu
                    height: "140%",   // ganti angkanya sesuka kamu
                    objectFit: "fill"
                }}
            />
            {/* Teks Porto Folio SVG */}
            <img
                src="/teks-porto.svg"
                alt="Porto Folio"
                className="hero-text absolute top-20 left-50 z-10 w-[45%]"
            />

        </section>
    )
}