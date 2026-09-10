/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
      },
      colors: {
        cosmos: '#5E141B',
        khaki: '#AF9D80',
        errie: '#1C1F23',
        charcoal: '#253A4A',
        holy: '#FBFBFB'
      },
      backgroundImage: {
        'Home': "url('/images/Home.webp')", 
      },
      boxShadow: {
        'blacky': '0px 6px 20px #000',
        'blured': '0px 20px 10px #253A4A',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-slowed': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'floates': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%' : {transform: 'rotate(-3deg)'},
          '50%' : {transform: 'rotate(3deg)'},
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
