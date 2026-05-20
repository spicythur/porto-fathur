import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact() {
    return (
        <section id="contact" className="relative w-full z-20 -mt-28">

            {/* Background SVG */}
            <img
                src="/bb-contact.svg"
                alt=""
                className="absolute top-0 left-0"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* Konten */}
            <div className="relative z-10 flex flex-col items-center justify-center py-16 gap-6 min-h-screen">

                {/* Judul */}
                <h2
                    className="text-8xl text-[#F7DF19]"
                    style={{ fontFamily: "crayon, sans-serif" }}
                >
                    Contact Me!
                </h2>

                {/* Email & Phone */}
                <p className="text-[#F7DF19] font-bold text-xl tracking-widest">
                    RIFAAIFATHUR@GMAIL.COM
                </p>
                <p className="text-[#F7DF19] font-bold text-xl tracking-widest">
                    +62 851 5832 9255
                </p>

                {/* Tombol */}
                <a 
                    href="/cv.pdf" 
                    download
                    className="mt-2 px-8 py-3 bg-[#F7DF19] rounded-full text-[#2E8E37] font-black tracking-widest hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-all duration-300 inline-block"
                >
                    WORKING WITH ME
                </a>

                {/* Social icons */}
                <div className="flex gap-4 mt-2">
                    {[
                        { icon: <FaInstagram size={20} />, href: "https://www.instagram.com/tthuuur?igsh=N3RpeGo4MXR6dnR0&utm_source=qr" },
                        { icon: <FaLinkedin size={20} />, href: "https://www.linkedin.com/in/agus-fathurrahman-rifai/" },
                        { icon: <FaGithub size={20} />, href: "https://github.com/spicythur" }
                    ].map((item, i) => (

                        <a
                            key={i}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-[#F7DF19] flex items-center justify-center text-[#2E8E37] hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-all duration-300"
                        >
                            {item.icon}
                        </a>
                    ))}
                </div>

            </div>

        </section>
    )
}