"use client";

import * as motion from "motion/react-client";
import { ReactNode } from "react";

interface AdDetailsAnimatorProps {
    children: ReactNode;
}

const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
        },
    },
};

export default function AdDetailsAnimator({
    children,
}: AdDetailsAnimatorProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full"
        >
            {children}
        </motion.div>
    );
}
