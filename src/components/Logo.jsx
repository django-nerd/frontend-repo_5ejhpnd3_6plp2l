import React from 'react'

const Logo = ({ size = 36, withText = true, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="relative"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className="drop-shadow-[0_0_18px_rgba(124,58,237,0.55)]"
        >
          <defs>
            <linearGradient id="synkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#39D2C9" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#39D2C9" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="64" height="64" rx="16" fill="#0A1E42" />
          <path
            d="M14 22c6-6 18-6 24 0s18 6 12 18c-6 12-20 6-26 0s-16-6-10-18z"
            fill="none"
            stroke="url(#synkGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M18 40c4 4 12 4 16 0s12-4 8-12"
            fill="none"
            stroke="url(#synkGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {withText && (
        <div className="leading-none">
          <span className="text-white font-semibold text-xl tracking-tight">synk<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-purple-400 to-teal-300">.ai</span></span>
        </div>
      )}
    </div>
  )
}

export default Logo
