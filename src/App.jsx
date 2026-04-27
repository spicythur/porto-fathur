import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import "lenis/dist/lenis.css" // Tambahkan css lenis agar bekerja optimal

import NavBar from "./components/NavBar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skill from "./components/skill"
import Projects from "./components/Projects"
import Contact from "./components/contact"

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // 1. Setup Smooth Scrolling dengan Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Sinkronisasi Lenis dengan GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Setup Zoom Responsiveness
    const handleResize = () => {
      setScale(window.innerWidth / 1440);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div style={{ zoom: scale }}>
      <NavBar />
      <Hero />
      <About />
      <Skill />
      <Projects />
      <Contact />
    </div>
  )
}