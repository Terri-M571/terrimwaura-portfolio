/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'un-blue': '#009EDB',
        'un-blue-dark': '#0077A8',
        'un-blue-deep': '#005F87',
        'un-blue-light': '#E0F4FB',
        'orange': '#F97316',
        'orange-hover': '#EA6C0A',
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
        'border': '#E2E8F0',
        'bg-light': '#F8FAFC',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.8s ease forwards',
        'slideInLeft': 'slideInLeft 0.8s ease forwards',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          from: { opacity: 0, transform: 'translateY(40px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: 0, transform: 'translateX(-40px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,158,219,0.12)',
        'card-hover': '0 8px 40px rgba(0,158,219,0.22)',
        'orange': '0 4px 24px rgba(249,115,22,0.20)',
      },
    },
  },
  plugins: [],
}
