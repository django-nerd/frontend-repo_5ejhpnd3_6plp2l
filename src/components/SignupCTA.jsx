import React from 'react'
import SignupWaitlist from './SignupWaitlist'

const SignupCTA = () => {
  return (
    <section className="relative py-20 bg-[#0A1E42]">
      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <h3 className="text-3xl font-bold text-white">Get early access</h3>
        <p className="mt-2 text-slate-300/90">Join the waitlist and be first to try the full editor and dashboard.</p>
        <div className="max-w-2xl mx-auto">
          <SignupWaitlist />
        </div>
      </div>
    </section>
  )
}

export default SignupCTA
