"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";

export default function FinalCTA() {
    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Slow Zoom */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 20, ease: "linear" }}
                viewport={{ once: false }}
            >
                <div className="absolute inset-0 bg-black/50 mix-blend-multiply z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120B05] via-black/40 to-black/20 z-10" />
                <Image
                    src="/images/market.png"
                    alt="Nigeria Experience"
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
            </motion.div>

            <motion.div
                className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <AnimatedText
                    el="h2"
                    text="Experience Nigeria Through Local Eyes"
                    className="text-5xl md:text-7xl lg:text-8xl font-heading text-white font-bold mb-12 drop-shadow-2xl leading-tight"
                />

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <button className="px-10 py-5 bg-[var(--color-accent)] text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(200,169,106,0.4)]">
                        Book a Tour
                    </button>
                    <button className="px-10 py-5 backdrop-blur-md bg-white/10 border border-white/30 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/20 transition-all duration-300">
                        Plan Your Trip
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
