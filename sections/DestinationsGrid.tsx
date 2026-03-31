"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import { ArrowUpRight } from "lucide-react";

const destinations = [
  {
    title: "Olumo Rock",
    image: "/images/abeokuta.png",
    description: "An ancient fortress and symbol of strength offering panoramic views.",
    cols: "md:col-span-2",
  },
  {
    title: "Obasanjo Library",
    image: "/images/library.png",
    description: "A premier presidential archive and luxurious cultural resort.",
    cols: "md:col-span-1",
  },
  {
    title: "Itoku Market",
    image: "/images/market.png",
    description: "The vibrant heart of Adire textile craftsmanship and culture.",
    cols: "md:col-span-3",
  },
];

export default function DestinationsGrid() {
  return (
    <section className="w-full py-32 px-4 bg-[var(--color-primary)] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-[var(--color-accent)] uppercase tracking-widest text-sm font-semibold mb-4 block">
              Curated Experiences
            </span>
            <AnimatedText 
              text="Explore Our Top Destinations"
              el="h2"
              className="text-5xl md:text-6xl font-heading font-bold"
            />
          </div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-[var(--color-accent)] font-semibold hover:text-white transition-colors"
          >
            View All Experiences <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer ${dest.cols}`}
            >
              {/* Image with zoom on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
              <Image
                src={dest.image}
                alt={dest.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-heading font-bold mb-2 text-white group-hover:text-[var(--color-accent)] transition-colors">
                  {dest.title}
                </h3>
                <p className="text-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-sm">
                  {dest.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <span className="font-semibold uppercase tracking-wider text-xs">View Experience</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
