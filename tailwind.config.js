/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dustyBlack : "#222831",
        beige : "#F1DEC9",
        brown : "#8D7B68",
        oceanBlue : "#112D4E",
        blue : "#034D8D",
        mistyBlue : '#3F72AF',
        iceBlue : '#DDE3F1',
        paleBlue : '#EDF0F7',
        skyBlue : '#D6E6F2',
        pearlWhite : '#F9F7F7',
        purpleWhite : '#EEF2F5',
        blueGray : '#a0aec0',
        coral : '#FEFCF3',
        gray : {
          900: '#202225',
          800: '#2f3136'
        },
        

      },
    },
  },
  plugins: [],
}