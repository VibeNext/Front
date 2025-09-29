// prettier-ignore
const globalCss = {
  'body': {
    '@supports (height: 100svh)': { height: '100svh' },
    '@supports not (height: 100svh)': { height: '100vh' },

    '@media (max-width: 480px)': {
      '@supports (width: 100svw)': { width: '100svw' },
      '@supports not (width: 100svw)': { width: '100vw' },
    },
    '@media (min-width: 480px)': {
      width: '480px',
      margin: '0 auto',
    },
  },
};

const theme = {
  globalCss,
};
export { theme };
