import React, { useState } from 'react'

const AuthModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-[#0B234F] p-6 shadow-2xl">
        <h4 className="text-white font-semibold text-lg">Sign in</h4>
        <p className="text-slate-300/80 text-sm">Access your dashboard and editing history.</p>
        <div className="mt-4 space-y-3">
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none text-white placeholder:text-white/50" />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none text-white placeholder:text-white/50" />
          <button onClick={onClose} className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-purple-500 text-slate-900 font-semibold">Continue</button>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
