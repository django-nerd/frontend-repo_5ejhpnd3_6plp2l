import React, { useState } from 'react'

const SignupWaitlist = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch(`${BACKEND}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source: 'landing' })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      setStatus('success')
      setMessage('You are on the list! We will reach out soon.')
      setEmail('')
      setName('')
    } catch (err) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none text-white placeholder:text-white/50"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none text-white placeholder:text-white/50"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-purple-500 text-slate-900 font-semibold shadow-[0_0_30px_rgba(124,58,237,0.35)] hover:opacity-90"
          disabled={status==='loading'}
        >
          {status==='loading' ? 'Joining…' : 'Join waitlist'}
        </button>
      </form>
      {message && <p className={`mt-3 text-sm ${status==='success' ? 'text-teal-300' : 'text-red-300'}`}>{message}</p>}
    </div>
  )
}

export default SignupWaitlist
