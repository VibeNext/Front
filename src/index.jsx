import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/glabal';
import Router from './Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </GlobalStyle>
  </React.StrictMode>,
);
