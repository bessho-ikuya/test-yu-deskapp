module.exports = {
  mode: 'jit',
  purge: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        600: '600px',
        85: '85px',
      },
      height: {
        400: '400px',
      },
      colors: {
        'off-white': '#F2F2E9',
        'dark-blue': '#333311'
      },
      maxHeight: {
        'cus': '380px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
