export default function ToothAnimation() {
  return (
    <div className="relative w-96 h-96 flex items-center justify-center">
      {/* Outer orbit ring */}
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-6 rounded-full border border-white/10" />
      <div className="absolute inset-12 rounded-full border border-white/15" />

      {/* Orbiting icons */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Orbit 1 items */}
          {[0, 90, 180, 270].map((deg, i) => (
            <div
              key={`o1-${i}`}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                animation: `spin${i % 2 === 0 ? 'CW' : 'CCW'} ${10 + i * 2}s linear infinite`,
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(148px)`,
              }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-xl"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transform: `rotate(-${deg}deg)`,
                  animation: `counterRotate${i % 2 === 0 ? 'CW' : 'CCW'} ${10 + i * 2}s linear infinite`,
                }}
              >
                {['🪥', '🦷', '💉', '🔬'][i]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sparkles */}
      <div className="absolute top-4 right-12 sparkle-1">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z" fill="#7dd3fc" />
        </svg>
      </div>
      <div className="absolute top-16 right-4 sparkle-2">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
          <path d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z" fill="#38bdf8" />
        </svg>
      </div>
      <div className="absolute bottom-16 right-6 sparkle-3">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z" fill="#bae6fd" />
        </svg>
      </div>
      <div className="absolute top-8 left-6 sparkle-4">
        <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
          <path d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z" fill="#e0f2fe" />
        </svg>
      </div>
      <div className="absolute bottom-8 left-4 sparkle-5">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z" fill="#7dd3fc" />
        </svg>
      </div>

      {/* Central tooth SVG */}
      <div className="relative z-10 tooth-glow">
        <svg
          width="110"
          height="130"
          viewBox="0 0 110 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tooth body */}
          <path
            d="M55 5 C35 5, 12 18, 10 40 C8 58, 15 68, 18 80 C22 96, 25 125, 35 125 C42 125, 44 108, 50 98 C52 94, 53 92, 55 92 C57 92, 58 94, 60 98 C66 108, 68 125, 75 125 C85 125, 88 96, 92 80 C95 68, 102 58, 100 40 C98 18, 75 5, 55 5Z"
            fill="url(#toothGrad)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
          />
          {/* Shine highlights */}
          <ellipse cx="40" cy="35" rx="8" ry="12" fill="rgba(255,255,255,0.3)" transform="rotate(-20 40 35)" />
          <ellipse cx="35" cy="28" rx="3" ry="5" fill="rgba(255,255,255,0.5)" transform="rotate(-20 35 28)" />

          {/* Smiley face */}
          {/* Eyes */}
          <circle cx="44" cy="58" r="3.5" fill="#2dd4bf" />
          <circle cx="66" cy="58" r="3.5" fill="#2dd4bf" />
          {/* Smile arc */}
          <path
            d="M42 70 Q55 82 68 70"
            stroke="#2dd4bf"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="toothGrad" x1="10" y1="5" x2="100" y2="125" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Checkmark badge */}
        <div className="absolute -bottom-1 -right-2 w-9 h-9 rounded-full bg-teal-400 border-2 border-white flex items-center justify-center shadow-lg">
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
            <path d="M1.5 6L5.5 10L12.5 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Glowing circle behind tooth */}
      <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary-400/20 blur-2xl animate-pulse-soft" />
    </div>
  );
}
