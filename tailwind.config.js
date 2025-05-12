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
        borderLight: '#E5E7EB',
        textLight: '#1F2937',
        textDark: '#F3F4F6',
        gray: {
          200: '#E5E7EB', // for borders
          400: '#9CA3AF', // secondary text in dark mode
          500: '#6B7280', // secondary text in light mode
          800: '#1F2937', // dark text in light mode
        },
        fontFamily: {
        'inter-regular': ['Inter-Regular'],
        'inter-bold': ['Inter-Bold'],
      },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
