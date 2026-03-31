"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/70 backdrop-blur-lg border-b border-white/10 py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 transition-transform hover:scale-105 duration-300 cursor-pointer shrink-0">
                        <Image
                            src="/logo.png"
                            alt="Detofun Holidays Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                <ul className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-semibold text-white/80">
                    <li className="hover:text-[var(--color-accent)] cursor-pointer transition-colors">Destinations</li>
                    <li className="hover:text-[var(--color-accent)] cursor-pointer transition-colors">Packages</li>
                    <li className="hover:text-[var(--color-accent)] cursor-pointer transition-colors">Services</li>
                    <li className="hover:text-[var(--color-accent)] cursor-pointer transition-colors">Contact</li>
                </ul>

                <button className="px-6 py-2.5 bg-white text-black font-semibold uppercase tracking-widest text-xs rounded-full hover:bg-[var(--color-accent)] hover:scale-105 transition-all duration-300">
                    Book Now
                </button>
            </div>
        </motion.nav>
    );
}
