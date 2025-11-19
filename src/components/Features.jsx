import React from 'react'
import { motion } from 'framer-motion'
import { Captions, Scissors, Music2, Cpu, Timer, Workflow } from 'lucide-react'

const features = [
  {
    icon: Captions,
    title: 'Animated captions',
    desc: 'Stylish, on‑beat captions and on‑screen text generated automatically.'
  },
  {
    icon: Music2,
    title: 'Smart music',
    desc: 'Automatic track selection that matches mood and momentum for every scene.'
  },
  {
    icon: Workflow,
    title: 'Reference detection',
    desc: 'Understands mentions and inserts relevant b‑roll and side clips instantly.'
  },
  {
    icon: Scissors,
    title: 'Full edit, end‑to‑end',
    desc: 'Cuts, pacing, color, effects, text, and transitions — done for you.'
  },
  {
    icon: Cpu,
    title: 'Understands content',
    desc: 'Vlog, review, cinematic, tutorial — the right style every time.'
  },
  {
    icon: Timer,
    title: 'Minutes, not hours',
    desc: 'Ship more content with professional consistency and speed.'
  }
]

const Features = () => {
  return (
    <section id="features" className="relative py-24 bg-[#0A1E42]">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Built for creators and teams</h2>
          <p className="mt-3 text-slate-300/90">Automation that feels like magic — quality that feels handcrafted.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20 transition"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-teal-400/20 to-purple-500/20 border border-white/10 mb-4">
                {React.createElement(f.icon, { className: 'text-teal-300', size: 24 })}
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">{f.title}</h3>
              <p className="text-slate-300/90 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
