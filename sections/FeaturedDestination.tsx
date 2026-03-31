"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";

export default function FeaturedDestination() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    return (
        <section
            ref={containerRef}
            style={{ position: "relative" }}
            className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Immersive Background */}
            <motion.div
                className="absolute w-full h-full origin-top"
                style={{ scale: imgScale }}
            >
                <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10 opacity-80" />
                <Image
                    src="/images/abeokuta.png"
                    alt="Abeokuta - Olumo Rock"
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ y: textY }}
                className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl"
            >
                <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-white border border-white/30 rounded-full px-6 py-2 text-sm uppercase tracking-widest backdrop-blur-md mb-8"
                >
                    Featured Destination
                </motion.span>

                <AnimatedText
                    el="h2"
                    text="Starting from Abeokuta"
                    className="text-5xl md:text-8xl font-heading text-[var(--color-accent)] font-bold mb-4 drop-shadow-2xl"
                />

                <AnimatedText
                    el="p"
                    text="The Heartbeat of Egba Heritage"
                    delay={0.4}
                    className="text-2xl md:text-4xl text-white font-medium mb-8"
                />

                <p className="text-lg md:text-xl text-[var(--color-secondary)]/90 mb-12 leading-relaxed max-w-2xl mx-auto backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10">
                    Discover a city built on ancient rocks and deep resilience. Abeokuta offers breathtaking views, rich history, and a vibrant culture that echoes through its vibrant markets and legendary hills.
                </p>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="px-10 py-5 bg-white text-black font-semibold rounded-full hover:bg-[var(--color-accent)] hover:text-black transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] text-lg"
                >
                    Explore Abeokuta
                </motion.button>
            </motion.div>
        </section>
    );
}
