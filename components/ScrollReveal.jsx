"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function ScrollReveal({
  children,
  delay = 0,
  yOffset = 40,
  once = false, // 👈 fade-out also works when once = false
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hiddenExit");
    }
  }, [controls, inView, once]);

  const variants = {
    hidden: { opacity: 0, y: yOffset, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
    // 👇 fade out downward (reverse of fade in)
    hiddenExit: {
      opacity: 0,
      y: yOffset * 0.8,
      scale: 0.97,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="relative will-change-transform"
    >
      {/* Soft glowing background effect */}
      <motion.div
        className="absolute -inset-8 opacity-0 blur-3xl bg-gradient-to-r from-blue-500/10 via-purple-600/10 to-pink-500/10 rounded-3xl"
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
