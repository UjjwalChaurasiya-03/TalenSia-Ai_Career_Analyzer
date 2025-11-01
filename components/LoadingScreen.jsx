"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    setParticles(
      [...Array(20)].map(() => ({
        size: 2 + Math.random() * 4,
        color: ['rgba(6,182,212,0.8)', 'rgba(59,130,246,0.8)', 'rgba(168,85,247,0.8)'][Math.floor(Math.random() * 3)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 12,
      }))
    );

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      {/* Central animated orb system */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer rotating rings */}
        <div className="absolute w-64 h-64 rounded-full border border-cyan-500/20 animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute w-52 h-52 rounded-full border border-blue-500/30 animate-[spin_15s_linear_infinite_reverse]"></div>
        
        {/* Glowing orbs */}
        <div className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-500/30 via-blue-600/20 to-purple-600/30 animate-[spin_8s_linear_infinite] blur-3xl"></div>
        <div className="absolute w-36 h-36 rounded-full bg-gradient-to-b from-blue-500/40 to-purple-700/40 animate-[pulse_3s_ease-in-out_infinite] blur-2xl"></div>
        
        {/* Central spinning loader */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute w-full h-full border-4 border-transparent border-t-cyan-400 border-r-blue-500 rounded-full animate-[spin_1.5s_linear_infinite]"></div>
          <div className="absolute w-24 h-24 border-4 border-transparent border-t-purple-500 border-l-blue-400 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
          <div className="absolute w-16 h-16 border-4 border-transparent border-t-cyan-300 rounded-full animate-[spin_1s_linear_infinite]"></div>
          
          {/* Center pulse dot */}
          <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_20px_rgba(6,182,212,0.8)]"></div>
        </div>
      </div>

      {/* TALENSIA text with enhanced effects */}
      <div className="relative">
        <h1 className="text-5xl sm:text-7xl font-black tracking-[0.2em] mb-2">
          <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-[gradient_4s_ease_infinite] bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 transition-transform">
            TALENSIA
          </span>
        </h1>
        {/* Underline animation */}
        <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"></div>
      </div>

      {/* Enhanced tagline */}
      <p className="mt-8 text-slate-300 text-sm sm:text-base tracking-[0.3em] font-light animate-[fadeIn_2s_ease-in-out_forwards] uppercase">
        AI-Powered Career Growth
      </p>

      {/* Loading progress bar */}
      <div className="mt-6 w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-[loading_2.5s_ease-in-out_forwards] rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
      </div>

      {/* Enhanced floating particles - only rendered after mount */}
      {particles.map((particle, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-[float_linear_infinite] opacity-0"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}, transparent)`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            boxShadow: '0 0 10px currentColor',
          }}
        ></span>
      ))}

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30 animate-[fadeIn_1s_ease-in-out]"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/30 animate-[fadeIn_1s_ease-in-out]"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
            transform: translateY(-40px) translateX(20px);
          }
          90% {
            opacity: 1;
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0%, 100% {
            opacity: 0.3;
            transform: scaleX(0.8);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        
        @keyframes loading {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}