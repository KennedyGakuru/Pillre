/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
     './src/screens/**/*.{js,ts,tsx}',
     './src/components/**/*.{js,ts,tsx}',
      "./components/**/*.{js,ts,jsx,tsx}",
     './src/navigation/**/*.{js,ts,tsx}',
     './src/**/*.{js,ts,tsx}',
    ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#29B6F6',
        backgroundLight: '#FFFFFF',
        backgroundDark: '#0E1A2B',
        textLight: '#1F2937',
        textDark: '#F3F4F6',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
