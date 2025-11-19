import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import Logo from './Logo'

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#0A1E42]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E42]/40 via-[#0A1E42]/60 to-[#0A1E42] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-8">
        <header className="flex items-center justify-between">
          <Logo size={36} />
          <div className="hidden md:flex items-center gap-6">
            <a href="#how" className="text-slate-200/80 hover:text-white transition">How it works</a>
            <a href="#features" className="text-slate-200/80 hover:text-white transition">Features</a>
            <a href="#pricing" className="text-slate-200/80 hover:text-white transition">Pricing</a>
            <a href="#demo" className="text-slate-200/80 hover:text-white transition">Demo</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl text-slate-200 hover:text-white transition">Sign in</button>
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-purple-500 text-slate-900 font-semibold shadow-[0_0_25px_rgba(124,58,237,0.35)] hover:opacity-90 transition">Get Started</button>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-10 items-center mt-20">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white"
            >
              AI that edits your entire video for you
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-5 text-lg sm:text-xl text-slate-200/90 max-w-xl"
            >
              synk.ai understands style, pacing, and context — delivering a polished cut in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-purple-500 text-slate-900 font-semibold shadow-[0_0_35px_rgba(124,58,237,0.45)] hover:opacity-90 transition">
                Try synk.ai
              </button>
              <button className="px-6 py-3 rounded-xl border border-white/20 text-white/90 hover:text-white hover:border-white/40 transition">
                Watch demo
              </button>
            </motion.div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-slate-200/80">
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">10x</div>
                <div className="text-sm">Faster edits</div>
              </div>
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">Auto</div>
                <div className="text-sm">Captions + B-roll</div>
              </div>
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">Smart</div>
                <div className="text-sm">Music selection</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="aspect-video">
                <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1600&auto=format&fit=crop" alt="Editor demo" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-teal-400/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-lg bg-black/50 text-white/90 text-sm">Auto cuts • Captions • B‑roll</div>
                <button className="px-4 py-2 rounded-lg bg-white/90 text-slate-900 font-medium hover:bg-white">Play sample</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
