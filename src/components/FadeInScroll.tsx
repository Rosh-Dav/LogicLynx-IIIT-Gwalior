"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function FadeInScroll({ children, className, delay = 0 }: { children: ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }} // smooth ease-out (lovable-style)
      className={className}
    >
      {children}
    </motion.div>
  );
}
