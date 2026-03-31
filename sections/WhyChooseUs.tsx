"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Compass, ShieldCheck, Wallet, Map, Globe2 } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";

const cards = [
    {
        title: "Experienced Local Guides",
        description: "Discover deep cultural insights from our expert local guides across Nigeria.",
        icon: Compass,
    },
    {
        title: "Affordable Packages",
        description: "Premium cinematic experiences that won't break your bank.",
        icon: Wallet,
    },
    {
        title: "Safe Transport",
        description: "Travel with peace of mind in our secure, well-maintained vehicles.",
        icon: ShieldCheck,
    },
    {
        title: "Custom Plans",
        description: "Tailor-made itineraries crafted specifically for your interests.",
        icon: Map,
    },
    {
        title: "Cultural Expertise",
        description: "Immerse yourself fully in local heritage, festivals, and history.",
        icon: Globe2,
    },
];

function InteractiveCard({ card, index }: { card: typeof cards[0]; index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={(e) => {
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - left - width / 2);
                mouseY.set(e.clientY - top - height / 2);
            }}
            onMouseLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
            }}
            className="relative group p-8 rounded-2xl bg-[var(--color-primary)]/40 border border-[#C8A96A]/20 backdrop-blur-sm overflow-hidden flex flex-col items-start gap-4 hover:border-[#C8A96A]/50 transition-colors duration-500 will-change-transform"
            style={{
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02, y: -5 }}
        >
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(200, 169, 106, 0.1), transparent 80%)`,
                }}
            />

            <div className="p-4 rounded-xl bg-black/50 text-[var(--color-accent)] group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[#C8A96A] group-hover:text-black transition-all duration-300 transform-gpu">
                <card.icon size={32} strokeWidth={1.5} />
            </div>

            <h3 className="text-2xl font-heading text-white font-semibold mt-4 line-clamp-2">
                {card.title}
            </h3>
            <p className="text-[var(--color-secondary)]/80 leading-relaxed font-body">
                {card.description}
            </p>
        </motion.div>
    );
}

export default function WhyChooseUs() {
    return (
        <section className="relative w-full py-32 px-4 bg-black overflow-hidden flex flex-col items-center">
            {/* Background ambient light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--color-primary)] opacity-30 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col items-center text-center mb-20 gap-4">
                    <span className="text-[var(--color-accent)] uppercase tracking-widest text-sm font-semibold">
                        The Detofun Difference
                    </span>
                    <AnimatedText
                        text="Why Choose Us"
                        el="h2"
                        className="text-5xl md:text-6xl font-heading text-white font-bold"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {cards.map((card, idx) => (
                        <InteractiveCard key={card.title} card={card} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
