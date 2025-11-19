import React from 'react'

const plans = [
  {
    name: 'Creator',
    price: '$19',
    period: '/mo',
    features: ['Up to 10 videos / mo', '1080p exports', 'Auto captions', 'Smart music', 'B‑roll suggestions']
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/mo',
    features: ['Up to 40 videos / mo', '4K exports', 'Brand presets', 'Priority processing', 'Collaborators']
  },
  {
    name: 'Studio',
    price: 'Custom',
    period: '',
    features: ['Unlimited edits', 'API access', 'Dedicated support', 'SAML / SSO', 'SLAs']
  }
]

const Pricing = () => {
  return (
    <section id="pricing" className="relative py-24 bg-[#0A1E42]">
      <div className="absolute inset-0 bg-[radial-gradient(900px_400px_at_20%_0%,rgba(124,58,237,0.25),transparent)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Simple, flexible pricing</h2>
          <p className="mt-3 text-slate-300/90">Start free, scale as your content does.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {plans.map((p, i) => (
            <div key={p.name} className={`p-6 rounded-2xl border backdrop-blur-sm ${i===1 ? 'bg-gradient-to-b from-white/10 to-white/[0.06] border-white/20' : 'bg-white/5 border-white/10'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">{p.name}</h3>
                {i===1 && <span className="text-xs px-2 py-1 rounded bg-gradient-to-r from-teal-400/30 to-purple-500/30 border border-white/20 text-white/90">Popular</span>}
              </div>
              <div className="flex items-end gap-1">
                <div className="text-4xl font-bold text-white">{p.price}</div>
                <div className="text-slate-300/80 mb-1">{p.period}</div>
              </div>
              <ul className="mt-6 space-y-2 text-slate-300/90 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-6 w-full px-4 py-2.5 rounded-xl font-semibold transition ${i===1 ? 'bg-gradient-to-r from-teal-400 to-purple-500 text-slate-900 shadow-[0_0_25px_rgba(124,58,237,0.35)]' : 'border border-white/20 text-white/90 hover:bg-white/10'}`}>Get started</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
