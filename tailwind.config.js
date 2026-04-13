/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core - near black & pure white
        'core-dark': '#0F1623',
        'core-darker': '#080C14',
        'core-light': '#F8FAFC',
        'core-lighter': '#FFFFFF',
        // Gray scale - cool tones
        'gray-900': '#0F1623',
        'gray-800': '#1C2333',
        'gray-700': '#2D3748',
        'gray-600': '#4A5568',
        'gray-500': '#718096',
        'gray-400': '#A0AEC0',
        'gray-300': '#CBD5E0',
        'gray-200': '#E2E8F0',
        'gray-100': '#F1F5F9',
        // Accent - signal blue (sparingly)
        'accent': '#00A6E4',
        'accent-dim': '#0090C8',
        // Score ring
        'score-high': '#00D4AA',
        'score-mid': '#00A6E4',
        'score-low': '#FFC65C',
        'score-min': '#FF8A65',
      },
      fontFamily: {
        'display': ['Manrope', 'sans-serif'],
        'body': ['IBM Plex Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.8125rem', { lineHeight: '1.5' }],
        'base': ['0.875rem', { lineHeight: '1.6' }],
        'lg': ['1rem', { lineHeight: '1.5' }],
        'xl': ['1.125rem', { lineHeight: '1.4' }],
        '2xl': ['1.25rem', { lineHeight: '1.3' }],
        '3xl': ['1.5rem', { lineHeight: '1.2' }],
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(255,255,255,0.06)',
        'card-hover': '0 0 0 1px rgba(0, 166, 228, 0.3)',
        'input-focus': '0 0 0 2px rgba(0, 166, 228, 0.25)',
        'tag': '0 0 0 1px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'tag-pop': 'tagPop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ring-fill': 'ringFill 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        tagPop: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        ringFill: {
          '0%': { strokeDashoffset: 'var(--circumference)' },
          '100%': { strokeDashoffset: 'var(--dash-offset)' },
        },
      },
      backgroundImage: {
        'dot-pattern': "radial-gradient(circle, #2D3748 1px, transparent 1px)",
      },
      backgroundSize: {
        'dot': '24px 24px',
      },
    },
  },
  plugins: [],
}
