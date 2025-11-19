import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Brain, Sparkles, Download } from 'lucide-react'

const Step = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ delay, duration: 0.5 }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
  >
    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-teal-400/20 to-purple-500/20 border border-white/10 mb-4">
      <Icon className="text-teal-300" size={24} />
    </div>
    <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
    <p className="text-slate-300/90 text-sm">{desc}</p>
  </motion.div>
)

const HowItWorks = () => {
  return (
    <section id="how" className="relative py-24 bg-[#0A1E42]">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_50%_0%,rgba(124,58,237,0.25),transparent)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">How it works</h2>
          <p className="mt-3 text-slate-300/90">From raw footage to a polished final cut — fully automated.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <Step icon={Upload} title="Upload your video" desc="Drop in your footage or paste a link." />
          <Step icon={Brain} title="AI analyzes" desc="Understands style, pacing, and context like a real editor." delay={0.1} />
          <Step icon={Sparkles} title="Smart editing" desc="Auto captions, b‑roll, music, color, cuts — perfectly synced." delay={0.2} />
          <Step icon={Download} title="Download" desc="Export a professional cut in minutes, not hours." delay={0.3} />
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
