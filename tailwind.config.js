module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#F30106',
        },
        secondary: {
          main: '#2755FF',
        },
        info: {
          main: '#162D55',
          dark: '#0A1831',
        },
      },
      boxShadow: {
        input: '0px 0px 4px 0px #2755FF',
      },
    },
  },
  variants: {},
  plugins: [],
};
