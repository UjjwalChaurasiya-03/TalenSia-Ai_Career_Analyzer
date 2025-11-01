"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";

import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";
import ScrollReveal from "@/components/ScrollReveal";
import { AnimatedTestimonialsDemo } from "@/components/AnimatedTestinomialsDemo";

export default function LandingPage() {
  return (
    <>
      {/* 🌌 Hero Section */}
      <ScrollReveal delay={0.2}>
        <HeroSection />
      </ScrollReveal>

      {/* 💎 Features Section */}
      <ScrollReveal delay={0.3}>
        <section className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] right-[20%] w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Powerful Features for Your Career Growth
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <ScrollReveal key={index} delay={index * 0.2} yOffset={60}>
                  <div
                    className="group relative rounded-2xl border border-cyan-400/30 bg-white/[0.03] 
                    backdrop-blur-xl shadow-lg overflow-hidden 
                    transition-all duration-500 ease-out 
                    hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-red-400"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-yellow-500/10 via-red-500/10 to-pink-500/10" />
                    <div className="relative z-10 p-8 text-center flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative transform transition-transform duration-500 group-hover:scale-110">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-purple-500">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                        {feature.description}
                      </p>
                      <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-500 group-hover:w-24" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 📊 Stats Section */}
      <ScrollReveal delay={0.3}>
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              {[
                { value: "50+", label: "Industries Covered" },
                { value: "1000+", label: "Interview Questions" },
                { value: "95%", label: "Success Rate" },
                { value: "24/7", label: "AI Support" },
              ].map((stat, index) => (
                <ScrollReveal key={index} delay={index * 0.2} yOffset={50}>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <h3 className="text-4xl font-bold">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ⚙️ How It Works Section */}
      <section className="w-full py-20 bg-gradient-to-b from-background via-background/80 to-background relative overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[25rem] h-[25rem] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[10%] w-[25rem] h-[25rem] bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal delay={0.2}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg">
                Four simple steps to accelerate your career growth
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.2} yOffset={70}>
                <div
                  className="group relative flex flex-col items-center text-center space-y-4 
                  p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg 
                  transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <div className="text-3xl text-cyan-400 group-hover:text-purple-400 transition-colors duration-500">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-500 group-hover:w-16" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 💬 Testimonials Section */}
      <ScrollReveal delay={0.3}>
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2
              className="relative text-center text-4xl md:text-5xl font-bold mb-1 
              tracking-tight select-none  bg-clip-text 
              bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-500"
            >
              What Our Users Say
            </h2>
            <AnimatedTestimonialsDemo />
          </div>
        </section>
      </ScrollReveal>

      {/* ❓ FAQ Section */}
      <ScrollReveal delay={0.3}>
        <section className="relative w-full py-16 md:py-28 bg-gradient-to-b from-background via-cyan-950/5 to-background overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-500/90 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Find answers to common questions about our platform
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} delay={index * 0.2} yOffset={50}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm hover:shadow-cyan-500/10 transition-all duration-300"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left text-base md:text-lg font-semibold text-foreground hover:text-cyan-400 transition-colors flex items-center justify-between">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </section>
      </ScrollReveal>

      {/* 🚀 CTA Section */}
      <ScrollReveal delay={0.4}>
  <section className="relative w-full overflow-hidden py-24 bg-gradient-to-b from-background via-background/90 to-background">
    {/* 🌈 Animated Gradient Background */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_60%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_70%)] animate-pulse-slow"></div>

    {/* 💫 Glow Orbs */}
    <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-float-slow"></div>
    <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-float-slow delay-3000"></div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center space-y-10">
      {/* 🌟 Heading */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.3)] animate-gradient-flow">
        Ready to Accelerate Your Career?
      </h2>

      {/* ✨ Subtext */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
        Unlock your next big opportunity with AI-powered career insights — faster, smarter, and beautifully personalized for you.
      </p>

      {/* ⚡ CTA Button */}
      <Link href="/dashboard">
        <div className="relative group mt-6">
          {/* Glowing border layer */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-500"></div>

          {/* Button core */}
          <Button
            size="lg"
            className="relative px-10 py-5 text-lg font-semibold rounded-lg bg-gray-900 text-white border border-white/10 
            hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-600 hover:text-black 
            transition-all duration-500 ease-out transform group-hover:scale-105 group-hover:-translate-y-1"
          >
            Start Your Journey Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </Link>
    </div>

    {/* ✨ Keyframes for animations */}
    <style jsx>{`
      @keyframes float-slow {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }
      .animate-float-slow {
        animation: float-slow 6s ease-in-out infinite;
      }
      @keyframes gradient-flow {
        0%, 100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }
      .animate-gradient-flow {
        background-size: 200% 200%;
        animation: gradient-flow 6s ease infinite;
      }
    `}</style>
  </section>
</ScrollReveal>

    </>
  );
}
