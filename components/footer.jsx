"use client"

import { useState, useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Sparkles,
  Brain,
  ArrowUpRight,
  Zap,
  Star
} from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.2 })

  // Generate stable particle positions to avoid hydration errors
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      left: ((i * 8.33) + (i * 3.7)) % 100,
      top: ((i * 6.25) + (i * 5.3)) % 100,
      delay: i * 0.2,
      duration: 3 + (i % 3)
    }))
  }, [])

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Resume Builder", href: "/resume-builder" },
    { name: "Interview Prep", href: "/interview-prep" },
    { name: "Cover Letter", href: "/cover-letter" }
  ]

  const resourceLinks = [
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Privacy", href: "/privacy" },
    { name: "Support", href: "/support" }
  ]

  const socialLinks = [
    { Icon: Github, href: "https://github.com", label: "GitHub" },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { Icon: Mail, href: "mailto:contact@talensia.ai", label: "Email" }
  ]

  return (
    <footer ref={footerRef} className="relative bg-slate-950 text-white overflow-hidden">
      {/* Simplified Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10" />

        {/* Floating Particles with stable positions */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`
            }}
            animate={{
              y: [-20, -50, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Simple Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 pb-12 border-b border-white/10">
          {/* Brand */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="relative bg-slate-900 p-2.5 rounded-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-lg blur-md opacity-50" />
                <Sparkles className="w-6 h-6 text-cyan-400 relative z-10" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                  TalenSia
                </h3>
                <p className="text-sm text-slate-400">
                  AI-Powered Career Platform
                </p>
              </div>
            </div>
            
            <p className="text-slate-400 mb-6 max-w-md">
              Transforming careers with cutting-edge AI technology. Your success is our mission.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all cursor-pointer"
                  aria-label={social.label}
                >
                  <social.Icon className="w-5 h-5 text-slate-400 hover:text-cyan-400 transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Stats badges */}
            <div className="flex gap-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/20"
              >
                <Star className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-slate-300">4.9/5 Rating</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/20"
              >
                <Zap className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-slate-300">50+ Users</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:ml-auto"
          >
            <motion.div 
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              whileHover={{ scale: 1.02, borderColor: "rgba(6, 182, 212, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                  Stay Updated
                </span>
              </h4>
              <p className="text-sm text-slate-400 mb-4">
                Get weekly AI career insights delivered to your inbox
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all text-sm text-white placeholder:text-slate-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-pink-500 hover:from-cyan-500 hover:to-pink-400 font-medium text-sm flex items-center gap-2 transition-all"
                >
                  Subscribe
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors inline-block"
                    whileHover={{ x: 3 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-sm font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors inline-block"
                    whileHover={{ x: 3 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h4 className="text-sm font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2.5">
              {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((link) => (
                <li key={link}>
                  <motion.a
                    href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors inline-block"
                    whileHover={{ x: 3 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h4 className="text-sm font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2.5">
              {["ujjwal911872@gmail.com", "+91 8604328429", "Kanpur, India"].map((item) => (
                <motion.li
                  key={item}
                  className="text-sm text-slate-400"
                  whileHover={{ x: 2, color: "#22d3ee" }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-slate-400">
            © {currentYear} Talensia. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400"
            />
            <span className="text-sm text-slate-400">
              Powered by AI
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer