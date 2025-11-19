import React from 'react'

const testimonials = [
  {
    name: 'Nova Studios',
    role: 'Agency',
    quote: 'We cut delivery times by 80% without sacrificing quality. synk.ai feels like a senior editor in the loop.'
  },
  {
    name: 'Ari Chen',
    role: 'YouTuber',
    quote: 'I post twice as much with more polish than ever. The captions and music sync are spot on.'
  },
  {
    name: 'Lightwave',
    role: 'Production Team',
    quote: 'Our editors use synk.ai to handle first cuts. Clients are blown away by the speed and consistency.'
  }
]

const Testimonials = () => {
  return (
    <section className="relative py-24 bg-[#0A1E42]">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Trusted by creators</h2>
          <p className="mt-3 text-slate-300/90">Social proof from teams shipping more content in less time.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-slate-200/90">“{t.quote}”</p>
              <div className="mt-4 text-sm text-slate-400">{t.name} • {t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
