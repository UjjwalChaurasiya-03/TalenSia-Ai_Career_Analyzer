'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Brain, Target, Rocket, Sparkles, TrendingUp, Zap, Shield, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRef } from 'react';

function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const fadeInScale = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const values = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Leverage cutting-edge Gemini AI to unlock personalized career insights and strategic recommendations.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Human-Centric Design',
      description: 'Technology serves people. We build tools that empower your unique journey, not replace your vision.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Precision & Clarity',
      description: 'From resume optimization to interview prep, we deliver actionable guidance with measurable impact.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Rocket,
      title: 'Continuous Growth',
      description: 'Your career evolves, and so do we. Real-time market analytics keep you ahead of industry trends.',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { number: '50+', label: 'Active Users', icon: Users },
    { number: '98%', label: 'Success Rate', icon: Award },
    { number: '24/7', label: 'AI Support', icon: Zap },
    { number: '100%', label: 'Secure', icon: Shield }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Section with Parallax */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative px-4 py-32 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-3 backdrop-blur-xl"
            >
              <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
              <span className="text-sm font-semibold text-purple-300">Powered by Gemini AI</span>
            </motion.div>

            <motion.h1
              className="mb-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Your Career,
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto mb-12 max-w-3xl text-xl text-slate-300 sm:text-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Talensia harnesses the power of AI to transform career development.
              <span className="text-purple-400 font-semibold"> Intelligent resume optimization</span>,
              <span className="text-pink-400 font-semibold"> dynamic interview prep</span>, and
              <span className="text-blue-400 font-semibold"> real-time insights</span>—all in one platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-8 py-6 text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-500/50 bg-slate-900/50 backdrop-blur-xl text-white px-8 py-6 text-lg font-semibold hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 gap-6 lg:grid-cols-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInScale}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <Card className="relative border-slate-800 bg-slate-900/50 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-3 text-purple-400" />
                      <div className="text-3xl font-black text-white mb-1">{stat.number}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision with Glass Cards */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 lg:grid-cols-2"
          >
            <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative h-full border-slate-800 bg-slate-900/30 backdrop-blur-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="p-10">
                  <motion.div
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Target className="h-8 w-8 text-white" />
                  </motion.div>
                  <h2 className="mb-6 text-3xl font-black text-white">Our Mission</h2>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    To democratize career excellence by making world-class coaching accessible to everyone.
                    We believe that with the right guidance and technology, every professional can unlock
                    their full potential and achieve extraordinary outcomes.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative h-full border-slate-800 bg-slate-900/30 backdrop-blur-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-10">
                  <motion.div
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <TrendingUp className="h-8 w-8 text-white" />
                  </motion.div>
                  <h2 className="mb-6 text-3xl font-black text-white">Our Vision</h2>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    A future where career decisions are empowered by intelligence, not guesswork. Where
                    professionals confidently navigate opportunities backed by data-driven insights,
                    personalized strategies, and AI that truly understands their aspirations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values with Gradient Cards */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-black text-white sm:text-5xl">
              What <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Drives Us</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-300">
              Our values shape every feature, every interaction, and every success story on Talensia.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full border-slate-800 bg-slate-900/50 backdrop-blur-xl overflow-hidden hover:border-slate-700 transition-all duration-300 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <CardContent className="p-8 relative">
                      <motion.div
                        className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${value.gradient}`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </motion.div>
                      <h3 className="mb-4 text-xl font-bold text-white">{value.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Gradient Border */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <div className="relative group">
            {/* Animated gradient border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

            <Card className="relative border-0 bg-slate-900 backdrop-blur-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10" />
              <CardContent className="relative p-12 text-center sm:p-16">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 backdrop-blur-xl"
                >
                  <Zap className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-semibold text-purple-300">Limited Time Offer</span>
                </motion.div>

                <h2 className="mb-6 text-4xl font-black text-white sm:text-5xl">
                  Ready to Transform <br />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Your Career?
                  </span>
                </h2>

                <p className="mb-10 text-lg text-slate-300 max-w-2xl mx-auto">
                  Join thousands of professionals who are already using Talensia to land their dream roles,
                  ace interviews, and stay ahead of the competition.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-10 py-7 text-lg font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Get Started 
                      <Rocket className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-xl text-white px-10 py-7 text-lg font-bold hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>

              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default AboutPage;