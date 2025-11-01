"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, TrendingUp, Star } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden pt-24 pb-12">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-6 md:px-8 lg:px-16 z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 max-w-2xl">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex"
            >
              <div className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 backdrop-blur-sm ">
                <Star className="h-4 w-4 text-purple-400 fill-purple-400 animation-pulse " />
                <span className="text-sm font-medium text-purple-300">
                  Trusted by Working professionals
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-3"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="block text-cyan-300 mb-2">
                  Your AI Career Coach for
                </span>
                <span className="block bg-gradient-to-r from-pink-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                   Professional Success
                </span>
              </h1>

              <p className="text-lg md:text-l text-gray-400 leading-relaxed">
                Transform your professional journey with AI-driven insights, personalized coaching, and powerful tools designed for your career growth.
              </p>
            </motion.div>

            {/* Features Grid */}
        

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  onClick={() => window.location.href = '/onboarding'}
                  className="bg-gradient-to-r from-pink-00 to-purple-500 hover:from-cyan-700 hover:to-blue-400 text-white text-base font-semibold px-7 py-6 rounded-xl shadow-lg shadow-purple-500/25 border-0"
                >
                  <span className="flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  onClick={() => window.location.href = '/about'}
                  className="bg-transparent hover:bg-slate-800 text-white text-base font-semibold px-7 py-6 rounded-xl border-2 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    Learn More
                    <TrendingUp className="h-5 w-5" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-8 pt-4"
            >
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  10+
                </div>
                <div className="text-xs text-gray-500 mt-1">Career Success</div>
              </div>
              <div className="w-px h-10 bg-gray-800" />
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  95%
                </div>
                <div className="text-xs text-gray-500 mt-1">Satisfaction</div>
              </div>
              <div className="w-px h-10 bg-gray-800" />
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-xs text-gray-500 mt-1">AI Support</div>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
  className="relative group"
>
  <motion.div 
    ref={imageRef}
    className="relative"
    whileHover={{ y: -12, scale: 1.02 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* Main container with gradient border effect */}
    <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-2xl p-1 overflow-hidden">
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Inner content */}
      <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-2xl p-6 backdrop-blur-xl">
        {/* Image container */}
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src="/banner4.png"
            width={1280}
            height={720}
            alt="Dashboard Preview"
            className="rounded-xl w-full h-auto shadow-xl transform transition-transform duration-700 group-hover:scale-105"
            priority
          />
          
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"
            initial={{ y: '-100%' }}
            whileHover={{ y: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>

    {/* Multi-layered glow effects */}
    <div className="absolute -inset-4 bg-purple-600/20 rounded-3xl blur-2xl -z-10 group-hover:bg-purple-600/40 transition-all duration-500" />
    <div className="absolute -inset-6 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 rounded-3xl blur-3xl -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Pulsing glow */}
    <motion.div
      className="absolute -inset-8 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-blue-600/5 rounded-3xl blur-3xl -z-30"
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </motion.div>

  {/* Spotlight effect following cursor */}
  <motion.div
    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
    style={{
      background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(168, 85, 247, 0.15), transparent 40%)'
    }}
  />
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;