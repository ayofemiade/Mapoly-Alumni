"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";

const testimonials = [
    {
        name: "Sarah Jenkins",
        location: "London, UK",
        text: "The Abeokuta Day Tour was phenomenal. The guides were knowledgeable, and Olumo Rock exceeded all my expectations. Truly a 5-star experience.",
        initials: "SJ",
        color: "bg-amber-600",
    },
    {
        name: "Michael Chen",
        location: "Toronto, Canada",
        text: "Custom itinerary planned to perfection. From the rich culture at Itoku Market to the peaceful evening at the resort, DETOFUN delivered pure luxury.",
        initials: "MC",
        color: "bg-emerald-600",
    },
    {
        name: "Aisha Mohammed",
        location: "Abuja, Nigeria",
        text: "Even as a Nigerian, I discovered hidden treasures I never knew about! The transport was premium and the experience was culturally rich and safe.",
        initials: "AM",
        color: "bg-purple-600",
    },
];

export default function Testimonials() {
    return (
        <section className="py-32 bg-[var(--color-primary)] overflow-hidden relative w-full">
            <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                <Quote className="w-96 h-96 text-white rotate-12" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-[var(--color-accent)] uppercase tracking-widest text-sm font-semibold mb-4 block">
                        Traveler Stories
                    </span>
                    <AnimatedText
                        text="What Our Guests Say"
                        el="h2"
                        className="text-4xl md:text-6xl font-heading text-white font-bold"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-6 lg:gap-8 justify-center items-stretch">
                    {testimonials.map((test, idx) => (
                        <motion.div
                            key={test.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="flex-1 bg-black/40 backdrop-blur-md border border-[var(--color-accent)]/20 rounded-3xl p-8 lg:p-10 relative group hover:bg-black/60 hover:border-[var(--color-accent)]/50 transition-all duration-500"
                        >
                            <Quote className="text-[var(--color-accent)]/40 w-10 h-10 mb-6 group-hover:text-[var(--color-accent)] transition-colors" />
                            <p className="text-lg md:text-xl text-[var(--color-secondary)]/90 font-light leading-relaxed mb-10 italic">
                                "{test.text}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${test.color} shadow-lg`}>
                                    {test.initials}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold font-heading text-lg">{test.name}</h4>
                                    <p className="text-[var(--color-accent)] text-sm">{test.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
