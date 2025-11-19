import React from 'react'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Showcase from './components/Showcase'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import SignupCTA from './components/SignupCTA'
import DemoUploader from './components/DemoUploader'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#0A1E42] text-white">
      <Hero />
      <HowItWorks />
      <Features />
      <Showcase />
      <DemoUploader />
      <Pricing />
      <SignupCTA />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default App
