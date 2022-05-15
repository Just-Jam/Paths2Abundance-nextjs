module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",   
    "./components/**/*.{js,ts,jsx,tsx}",  
  ],
  theme: {
    extend: {
      colors: {
        'btncolor': '#0192f3',
        'btncolor1': '#2a9df4',
        'btncolor2': '#5b6979',
        'btncolor3': '#a1b1c2',
  
      },
      
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    
  },
  plugins: [],
}
