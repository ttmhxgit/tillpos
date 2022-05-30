module.exports = {
  purge: {
    mode: "all",
    content: ["./src/**/*.ts", "./src/**/*.tsx"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        'indigo-dark': "var(--color-indigo-dark)",
        'indigo-light': "var(--color-indigo-light)",
      },
      spacing: {
        '128': '32rem',
        '84': '23rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}