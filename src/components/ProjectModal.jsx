import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function ProjectModal({ project, onClose }) {
    const overlayRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        if (!project) return;

        // Lock body scroll
        document.body.style.overflow = "hidden";

        const tl = gsap.timeline();

        tl.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        tl.fromTo(cardRef.current,
            { y: 80, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
            "-=0.15"
        );

        return () => {
            document.body.style.overflow = "";
        };
    }, [project]);

    const handleClose = () => {
        const tl = gsap.timeline({ onComplete: onClose });
        tl.to(cardRef.current, { y: 40, opacity: 0, scale: 0.95, duration: 0.25, ease: "power2.in" });
        tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
    };

    if (!project) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div
                ref={cardRef}
                className="relative w-full max-w-[600px] max-h-[90vh] max-sm:max-h-[95vh] max-sm:rounded-lg bg-[#F4F1EA] rounded-xl overflow-hidden flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-[#2E8E37] text-[#F7DF19] flex items-center justify-center text-xl font-bold hover:bg-[#1a6b25] transition-colors cursor-pointer"
                >
                    &times;
                </button>

                {/* Screenshot */}
                <div className="w-full aspect-video relative bg-[#e8e5dd]">
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2.5 p-4 sm:p-5 overflow-y-auto">
                    <h3 className="text-2xl sm:text-3xl font-[crayon] text-[#2E8E37] uppercase">
                        {project.title}
                    </h3>

                    <p className="text-[#555] text-sm sm:text-base leading-relaxed font-[crayon]">
                        {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.tech.map((t, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#2E8E37] text-[#F7DF19] text-xs sm:text-sm rounded-full font-[crayon]"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 mt-1 sm:mt-2">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2 bg-[#F7DF19] text-[#2E8E37] rounded-full font-[crayon] text-sm hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-colors"
                            >
                                Live Demo
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2 border-2 border-[#2E8E37] text-[#2E8E37] rounded-full font-[crayon] text-sm hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-colors"
                            >
                                GitHub
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
