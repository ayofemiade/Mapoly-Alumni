"use client";

import { motion } from "framer-motion";
import { Compass, Hotel, Car, BookOpen, GraduationCap, Building2 } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";

const services = [
    { icon: Compass, title: "Guided Tours", desc: "Expert local guides bringing destinations to life." },
    { icon: Hotel, title: "Hotel Reservations", desc: "Handpicked premium accommodations across Nigeria." },
    { icon: Car, title: "Transportation", desc: "Safe, luxury, and air-conditioned travel arrangements." },
    { icon: BookOpen, title: "Cultural Planning", desc: "Deep immersive planning for festivals and traditions." },
    { icon: GraduationCap, title: "Educational Tours", desc: "Historical field trips and academic excursions." },
    { icon: Building2, title: "Corporate Retreats", desc: "Team building and leadership retreats in nature." },
];

export default function Services() {
    return (
        <section className="py-32 px-4 bg-black w-full overflow-hidden relative">
            <div className="max-w-7xl mx-auto z-10 relative">
                <div className="text-center mb-20">
                    <AnimatedText
                        text="Comprehensive Services"
                        el="h2"
                        className="text-4xl md:text-6xl font-heading text-white font-bold"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((svc, idx) => (
                        <motion.div
                            key={svc.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--color-accent)]/50 hover:bg-white/10 transition-all duration-500 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <svc.icon className="w-12 h-12 text-[var(--color-accent)] mb-6 group-hover:scale-110 transition-transform duration-500" />
                                <h3 className="text-2xl font-heading text-white font-bold mb-3">{svc.title}</h3>
                                <p className="text-[var(--color-secondary)]/80 leading-relaxed group-hover:text-white transition-colors duration-500">
                                    {svc.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
