import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectModal({ project, projects, onClose, onSelect }) {
    const overlayRef = useRef(null);
    const cardRef = useRef(null);

    const handleClose = useCallback(() => {
        const tl = gsap.timeline({ onComplete: onClose });
        tl.to(cardRef.current, { y: 24, opacity: 0, scale: 0.96, duration: 0.3, ease: "power2.inOut" });
        tl.to(overlayRef.current, { opacity: 0, duration: 0.25 }, "-=0.15");
    }, [onClose]);

    const handleNavigate = useCallback((direction) => {
        if (!project || !projects) return;
        const idx = projects.findIndex(p => p.id === project.id);
        const next = projects[idx + direction];
        if (!next) return;

        const exitX = direction > 0 ? -60 : 60;
        gsap.to(cardRef.current, {
            x: exitX,
            opacity: 0,
            scale: 0.96,
            duration: 0.22,
            ease: "power2.in",
            onComplete: () => {
                onSelect(next);
                gsap.fromTo(cardRef.current,
                    { x: -exitX, opacity: 0, scale: 0.96 },
                    { x: 0, opacity: 1, scale: 1, duration: 0.32, ease: "power3.out" }
                );
            }
        });
    }, [project, projects, onSelect]);

    useEffect(() => {
        if (!project) return;

        document.body.style.overflow = "hidden";

        const tl = gsap.timeline();
        tl.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: "power2.out" }
        );
        tl.fromTo(cardRef.current,
            { y: 50, opacity: 0, scale: 0.93 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" },
            "-=0.2"
        );

        const onKeyDown = (e) => {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowLeft") handleNavigate(-1);
            if (e.key === "ArrowRight") handleNavigate(1);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [project, handleClose, handleNavigate]);

    if (!project || !projects) return null;

    const currentIndex = projects.findIndex(p => p.id === project.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < projects.length - 1;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
        >
            {/* Counter */}
            <p
                className="absolute top-5 left-1/2 -translate-x-1/2 font-[crayon] text-white text-2xl pointer-events-none"
                style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.8)" }}
            >
                {currentIndex + 1} / {projects.length}
            </p>

            {/* Prev */}
            {hasPrev && (
                <button
                    onClick={(e) => { e.stopPropagation(); handleNavigate(-1); }}
                    className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-[#F7DF19] text-[#2E8E37] text-2xl font-black flex items-center justify-center hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-colors shadow-lg cursor-pointer"
                >
                    ←
                </button>
            )}

            {/* Next */}
            {hasNext && (
                <button
                    onClick={(e) => { e.stopPropagation(); handleNavigate(1); }}
                    className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-[#F7DF19] text-[#2E8E37] text-2xl font-black flex items-center justify-center hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-colors shadow-lg cursor-pointer"
                >
                    →
                </button>
            )}

            {/* Card */}
            <div
                ref={cardRef}
                className="relative w-full max-w-[580px] max-h-[90vh] max-sm:max-h-[95vh] bg-[#F4F1EA] rounded-sm flex flex-col shadow-2xl border-4 border-[#2E8E37]"
                style={{ rotate: "1deg" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-[#2E8E37] text-[#F7DF19] flex items-center justify-center text-xl font-bold hover:bg-[#F7DF19] hover:text-[#2E8E37] transition-colors cursor-pointer"
                >
                    &times;
                </button>

                {/* Screenshot */}
                <div className="w-full aspect-video bg-[#e8e5dd] overflow-hidden shrink-0">
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2.5 p-5 overflow-y-auto flex-1 min-h-0">
                    <h3
                        className="text-3xl font-[crayon] text-[#2E8E37] uppercase"
                        style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.08)" }}
                    >
                        {project.title}
                    </h3>

                    <p className="text-[#555] text-sm sm:text-base leading-relaxed font-[crayon]">
                        {project.description}
                    </p>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t, i) => (
                            <span
                                key={i}
                                className="px-3 py-0.5 bg-[#2E8E37] text-[#F7DF19] text-sm rounded-full font-[crayon]"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 mt-1">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-5 py-2 bg-[#F7DF19] text-[#2E8E37] rounded-full font-[crayon] text-sm hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-colors"
                            >
                                <FaExternalLinkAlt size={12} /> Live Demo
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-5 py-2 border-2 border-[#2E8E37] text-[#2E8E37] rounded-full font-[crayon] text-sm hover:bg-[#2E8E37] hover:text-[#F7DF19] transition-colors"
                            >
                                <FaGithub size={14} /> GitHub
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
