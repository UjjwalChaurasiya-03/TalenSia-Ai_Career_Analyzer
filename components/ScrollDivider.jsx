"use client";

import { motion } from "framer-motion";

export default function ScrollDivider({ flip = false, gradient = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
      className={`relative w-full h-20 overflow-hidden ${
        flip ? "rotate-180" : ""
      }`}
    >
      <div
        className={`absolute bottom-0 left-0 w-full h-[100px] ${
          gradient
            ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
            : "bg-white dark:bg-[#0a0a0a]"
        } 
        [clip-path:polygon(0_0,60px_100%,calc(100%-60px)_100%,100%_0)]
        opacity-95`}
      />
    </motion.div>
  );
}
