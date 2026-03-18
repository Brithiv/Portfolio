/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'body': ['DM Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        abyss: '#0B0F19',
        'deep-slate': '#111827',
        'electric-cyan': '#06B6D4',
        'neon-violet': '#8B5CF6',
        'iced-slate': '#F8FAFC',
        'pristine-frost': '#FAFAFC',
        'royal-cobalt': '#2563EB',
        'emerald-insight': '#10B981',
        'ink-slate': '#0F172A',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'card-light': '0 8px 30px rgb(0,0,0,0.04)',
        'glow-cyan': '0 0 30px rgba(6,182,212,0.3)',
        'glow-violet': '0 0 30px rgba(139,92,246,0.3)',
        'glow-blue': '0 0 30px rgba(37,99,235,0.3)',
      }
    },
  },
  plugins: [],
}
