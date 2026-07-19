/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0d1117',
          card: '#161b22',
          border: '#30363d',
          hover: '#1c2333',
          elevated: '#1c212a',
        },
        accent: {
          DEFAULT: '#58a6ff',
          green: '#3fb950',
          orange: '#d29922',
          red: '#f85149',
          purple: '#bc8cff',
          cyan: '#39d2c0',
          pink: '#ff7b9c',
        },
        text: {
          DEFAULT: '#e6edf3',
          muted: '#8b949e',
          dim: '#484f58',
        },
        paper: {
          dark: '#1a1a2e',
          sepia: '#2d2430',
          scroll: '#1e2735',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Merriweather"', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'type-cursor': 'blink 1s step-end infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(88,166,255,0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(88,166,255,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
