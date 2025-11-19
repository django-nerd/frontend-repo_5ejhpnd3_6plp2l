import React from 'react'
import { motion } from 'framer-motion'

const clips = [
  'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1600&auto=format&fit=crop'
]

const Showcase = () => {
  return (
    <section id="demo" className="relative py-24 bg-[#0A1E42]">
      <div className="absolute inset-0 bg-[radial-gradient(800px_300px_at_80%_0%,rgba(57,210,201,0.2),transparent)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">See it in action</h2>
          <p className="mt-3 text-slate-300/90">A crisp, professional result with captions, music, and b‑roll — generated automatically.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {clips.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              <div className="aspect-video">
                <img src={src} alt="Edited sample" className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E42] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90">
                <span className="px-2 py-1 rounded bg-black/40 text-xs">Auto‑edited</span>
                <button className="px-3 py-1.5 rounded bg-white/90 text-slate-900 text-xs font-medium hover:bg-white">Play</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Showcase
