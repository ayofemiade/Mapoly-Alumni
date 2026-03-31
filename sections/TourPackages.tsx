"use client";

import { motion } from "framer-motion";
import { Check, CalendarDays, Users, Compass } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";

const packages = [
    {
        title: "Abeokuta Day Tour",
        price: "₦50,000",
        duration: "1 Day",
        popular: false,
        features: [
            "Guided Olumo Rock climb",
            "Itoku Market tour (Adire)",
            "Local lunch experience",
            "Air-conditioned transport",
        ],
        icon: Compass,
    },
    {
        title: "Ogun Heritage Exp.",
        price: "₦120,000",
        duration: "2 Days / 1 Night",
        popular: true,
        features: [
            "Everything in Day Tour",
            "Obasanjo Library access",
            "Premium hotel stay",
            "Evening cultural show",
            "All meals included",
        ],
        icon: CalendarDays,
    },
    {
        title: "Custom Packages",
        price: "Custom",
        duration: "Flexible",
        popular: false,
        features: [
            "Tailor-made itinerary",
            "Personalized pacing",
            "Private luxury transport",
            "Exclusive access",
            "Dedicated concierge",
        ],
        icon: Users,
    },
];

export default function TourPackages() {
    return (
        <section className="relative w-full py-32 px-4 bg-[#120B05] flex flex-col items-center">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />

            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center mb-20">
                    <span className="text-[var(--color-accent)] uppercase tracking-widest text-sm font-semibold mb-4 block">
                        Plan Your Journey
                    </span>
                    <AnimatedText
                        text="Unforgettable Tour Packages"
                        el="h2"
                        className="text-5xl md:text-6xl font-heading text-white font-bold"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, idx) => (
                        <motion.div
                            key={pkg.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            className={`relative rounded-3xl p-8 border ${pkg.popular
                                    ? "bg-[var(--color-primary)]/80 border-[var(--color-accent)] shadow-[0_0_30px_rgba(200,169,106,0.15)]"
                                    : "bg-black/50 border-white/10 hover:border-white/30"
                                } backdrop-blur-md flex flex-col items-center text-center transition-all duration-300 group`}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 bg-[var(--color-accent)] text-black text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className={`p-4 rounded-2xl mb-6 ${pkg.popular ? "bg-[#C8A96A] text-black" : "bg-white/10 text-white"} group-hover:scale-110 transition-transform duration-300`}>
                                <pkg.icon size={28} />
                            </div>

                            <h3 className="text-2xl font-heading font-bold text-white mb-2">{pkg.title}</h3>
                            <div className="flex items-baseline justify-center gap-1 mb-6">
                                <span className="text-4xl font-bold text-[var(--color-accent)]">{pkg.price}</span>
                                {pkg.price !== "Custom" && <span className="text-white/60">/person</span>}
                            </div>

                            <p className="text-[var(--color-secondary)]/80 mb-8 border-b border-white/10 pb-8 w-full">
                                Duration: <span className="text-white font-medium">{pkg.duration}</span>
                            </p>

                            <ul className="flex flex-col gap-4 text-left w-full mb-10">
                                {pkg.features.map(feat => (
                                    <li key={feat} className="flex items-start gap-3 text-[var(--color-secondary)]/90">
                                        <Check className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`mt-auto w-full py-4 rounded-full font-bold transition-all duration-300 ${pkg.popular
                                    ? "bg-[var(--color-accent)] text-black hover:bg-white"
                                    : "bg-white/10 text-white hover:bg-white hover:text-black"
                                }`}>
                                Book Now
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
