/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode:"class",
  important:true,
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor:{
        primary:"#1A5CFF",
        secondary:"#7c0346",
        success:"#46C93A",
        danger:"#FF4757",
        warn:"#FFBA00",
        dark:"#1E1E1E"
      },
      textColor:{
        primary:"#1A5CFF",
        secondary:"#7c0346",
        success:"#46C93A",
        danger:"#FF4757",
        warn:"#FFBA00",
        dark:"#1E1E1E"
      },
      boxShadow:{
        "primary-btn":'0 10px 20px -7px #1A5CFF',
        "secondary-btn":'0 10px 20px -7px #7c0346',
        "success-btn":'0 10px 20px -7px #46C93A',
        "danger-btn":'0 10px 20px -7px #FF4757',
        "warn-btn":'0 10px 20px -7px #FFBA00',
        "dark-btn":'0 10px 20px -7px #1E1E1E',
      }
    },
  },
  plugins: [],
}
