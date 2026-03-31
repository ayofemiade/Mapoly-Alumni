"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
    return (
        <section className="w-full bg-[#120B05] text-white py-32 border-t border-[var(--color-primary)]">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center"
                >
                    <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6">Let's Talk</h2>
                    <p className="text-[var(--color-secondary)]/80 text-lg md:text-xl mb-12 max-w-md">
                        Ready to discover the hidden treasures of Nigeria? Reach out and let us craft your perfect journey.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6 group cursor-pointer">
                            <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center border border-white/10 group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all duration-300">
                                <Phone className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <p className="text-[var(--color-secondary)]/60 text-sm uppercase tracking-wider mb-1">Phone</p>
                                <p className="text-xl font-medium">+234 (0) 800 DETOFUN</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group cursor-pointer">
                            <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center border border-white/10 group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all duration-300">
                                <Mail className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <p className="text-[var(--color-secondary)]/60 text-sm uppercase tracking-wider mb-1">Email</p>
                                <p className="text-xl font-medium">hello@detofunholidays.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group cursor-pointer">
                            <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center border border-white/10 group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all duration-300">
                                <MapPin className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <p className="text-[var(--color-secondary)]/60 text-sm uppercase tracking-wider mb-1">Location</p>
                                <p className="text-xl font-medium">Abeokuta, Ogun State, Nigeria</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-black/50 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10"
                >
                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[var(--color-secondary)]/60 uppercase tracking-widest pl-2">Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[var(--color-secondary)]/60 uppercase tracking-widest pl-2">Guests</label>
                                <input type="number" min="1" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[var(--color-secondary)]/60 uppercase tracking-widest pl-2">Destination</label>
                                <select className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none">
                                    <option>Abeokuta Tour</option>
                                    <option>Ogun Heritage</option>
                                    <option>Custom Package</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[var(--color-secondary)]/60 uppercase tracking-widest pl-2">Date</label>
                                <input type="date" className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors [color-scheme:dark]" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[var(--color-secondary)]/60 uppercase tracking-widest pl-2">Special Requests</label>
                            <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none" placeholder="Tell us how we can make your trip perfect..."></textarea>
                        </div>

                        <button className="w-full py-5 bg-[var(--color-accent)] text-black font-bold text-lg rounded-xl hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-lg mt-4">
                            Send Inquiry
                        </button>
                    </form>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-32 text-center text-[var(--color-secondary)]/40 text-sm">
                <p>© {new Date().getFullYear()} DETOFUN HOLIDAYS. All Rights Reserved.</p>
                <p className="mt-2">Designed as a High-End Cinematic Web Experience.</p>
            </div>
        </section>
    );
}
