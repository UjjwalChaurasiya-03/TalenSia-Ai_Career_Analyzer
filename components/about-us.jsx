"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Target, Rocket, Brain } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-primary">Talensia</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Talensia is an AI-powered career growth companion built to help you
            unlock your potential. From personalized resume creation to
            interview simulations and career insights — we redefine how
            professionals prepare for success.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At Talensia, we believe that every individual deserves access to
              cutting-edge career intelligence. Our mission is to democratize
              AI-powered career guidance — providing real-time market insights,
              resume optimization, and interactive interview preparation to
              empower professionals globally.
            </p>
            <Button asChild>
              <a href="/onboarding">Get Started with Talensia</a>
            </Button>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/about-team.jpg"
              alt="Talensia Team"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>

          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
            {[
              {
                icon: <Users className="w-10 h-10 text-primary mb-4 mx-auto" />,
                title: "Empathy",
                text: "We build with heart. Every feature is designed to help users grow confidently in their careers.",
              },
              {
                icon: <Brain className="w-10 h-10 text-primary mb-4 mx-auto" />,
                title: "Innovation",
                text: "Powered by Gemini AI, Talensia continuously learns to make smarter and more human recommendations.",
              },
              {
                icon: <Target className="w-10 h-10 text-primary mb-4 mx-auto" />,
                title: "Precision",
                text: "We rely on real-time data and industry trends to deliver actionable insights, not generic advice.",
              },
              {
                icon: <Rocket className="w-10 h-10 text-primary mb-4 mx-auto" />,
                title: "Empowerment",
                text: "Our goal is to help professionals build better careers, faster — guided by data and AI expertise.",
              },
            ].map((value, i) => (
              <Card
                key={i}
                className="hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>{value.icon}</CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-semibold mb-2">
                    {value.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{value.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-gradient-to-t from-background to-muted/40">
        <motion.h3
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Join Talensia’s AI-Powered Career Revolution
        </motion.h3>
        <motion.p
          className="text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Start building your smarter, data-driven career journey today.
          Discover insights, ace interviews, and craft resumes that stand out
          with Talensia.
        </motion.p>
        <Button asChild size="lg">
          <a href="/signup">Create Your Account</a>
        </Button>
      </section>
    </main>
  );
}
