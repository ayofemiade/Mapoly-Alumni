"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section ref={ref} style={{ position: "relative" }} className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black pb-32 pt-24">
            {/* Background Parallax and Zoom Image */}
            <motion.div style={{ y, scale, willChange: "transform" }} className="absolute inset-0 w-full h-full">
                {/* Slow zoom animation applied directly to the image container */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    style={{ willChange: "transform" }}
                    className="absolute inset-0 w-full h-full origin-center"
                >
                    <div className="absolute inset-0 bg-[var(--color-primary)] mix-blend-multiply opacity-40 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120B05] via-black/40 to-black/60 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#120B05] z-10" />
                    <Image
                        src="/images/hero-bg.png"
                        alt="Nigerian Landscape"
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div style={{ opacity }} className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-6xl w-full mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
                    className="flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse shadow-[0_0_10px_var(--color-accent)]" />
                        <span className="text-white/90 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">Unforgettable Journeys</span>
                    </div>
                </motion.div>

                <AnimatedText
                    el="h1"
                    text="DETOFUN HOLIDAYS"
                    className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[6rem] text-white font-bold tracking-tighter mb-8 leading-[1.1] drop-shadow-2xl hero-title"
                    delay={0.1}
                />

                <AnimatedText
                    el="h2"
                    text="Discover the Hidden Treasures of Nigeria"
                    delay={0.5}
                    className="text-2xl sm:text-3xl lg:text-4xl text-[var(--color-accent)] font-medium mb-12 tracking-wide drop-shadow-lg"
                />

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full mt-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-10 py-5 bg-[var(--color-accent)] text-black font-semibold rounded-full overflow-hidden shadow-[0_0_30px_rgba(200,169,106,0.3)] hover:shadow-[0_0_50px_rgba(200,169,106,0.6)] transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3"
                    >
                        <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                        <span className="relative z-10 text-sm sm:text-base uppercase tracking-widest font-bold">Explore Destinations</span>
                        <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-10 py-5 bg-black/30 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-md w-full sm:w-auto flex items-center justify-center gap-3"
                    >
                        <span className="text-sm sm:text-base uppercase tracking-widest font-bold">Book a Tour</span>
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Premium Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 z-20 flex flex-col items-center justify-center cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
            >
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/50 to-transparent overflow-hidden relative">
                    <motion.div
                        className="w-full h-1/2 bg-[var(--color-accent)]"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
                <span className="text-white/60 text-[0.65rem] mt-6 uppercase tracking-[0.4em] font-medium">Scroll to Discover</span>
            </motion.div>
        </section>
    );
}
