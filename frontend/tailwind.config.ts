import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#cce5ff',
          200: '#99caff',
          300: '#66b0ff',
          400: '#3395ff',
          500: '#0A84FF',
          600: '#0068cc',
          700: '#004e99',
          800: '#003466',
          900: '#001a33',
        },
        navy: {
          50: '#e8eaf0',
          100: '#c5cad9',
          200: '#9ea7c0',
          300: '#7785a7',
          400: '#596b93',
          500: '#0d1b3e',
          600: '#0a1630',
          700: '#081022',
          800: '#050b17',
          900: '#02050b',
        },
        cyan: {
          glow: '#00d4ff',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0d1b3e 0%, #0A84FF 50%, #00d4ff 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.6s ease forwards',
        'slide-in-right': 'slideInRight 0.6s ease forwards',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-shift': 'gradientShift 6s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(10, 132, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(10, 132, 255, 0.8)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'glow': '0 0 30px rgba(10, 132, 255, 0.3)',
        'glow-strong': '0 0 60px rgba(10, 132, 255, 0.5)',
        'glow-cyan': '0 0 30px rgba(0, 212, 255, 0.3)',
        'card': '0 20px 60px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 30px 80px rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
