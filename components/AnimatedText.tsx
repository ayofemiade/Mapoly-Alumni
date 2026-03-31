"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
    text: string;
    className?: string;
    el?: React.ElementType;
    once?: boolean;
    delay?: number;
}

const defaultAnimations: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9],
        },
    },
};

export default function AnimatedText({
    text,
    className,
    el: Wrapper = "p",
    once = true,
    delay = 0,
}: AnimatedTextProps) {
    return (
        <Wrapper className={className}>
            <motion.span
                initial="hidden"
                whileInView="visible"
                viewport={{ once, margin: "-10%" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.05, delayChildren: delay } },
                    hidden: {},
                }}
                aria-hidden
            >
                {text.split(" ").map((word, wordIndex) => (
                    <span className="inline-block overflow-hidden" key={`${word}-${wordIndex}`}>
                        <motion.span className="inline-block" variants={defaultAnimations}>
                            {word}&nbsp;
                        </motion.span>
                    </span>
                ))}
            </motion.span>
            <span className="sr-only">{text}</span>
        </Wrapper>
    );
}
