import React from 'react'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="relative py-12 bg-[#0A1E42] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo size={28} />
        <div className="flex items-center gap-6 text-slate-300/90 text-sm">
          <a href="#" className="hover:text-white">Contact</a>
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">YouTube</a>
          <a href="#" className="hover:text-white">Privacy</a>
        </div>
        <div className="text-slate-400 text-sm">© {new Date().getFullYear()} synk.ai</div>
      </div>
    </footer>
  )
}

export default Footer
