import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'DungGeunMo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.0/DungGeunMo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
* {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  text-decoration: none;
  outline: none;
  box-sizing: border-box;
  background-color: transparent;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
a,
a:link,
a:visited,
a:active {
  text-decoration: none;
  color: unset;
}
ol,
ul,
li {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
button {
  background: none;
  cursor: pointer;
}
input[type='button'],
input[type='submit'],
input[type='reset'],
input[type='radio'],
label {
  cursor: pointer;
}
input[type='radio'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
  
  body {
    @supports (height: 100svh) { height: 100svh; }
    @supports not (height: 100svh) { height: 100vh; }

    @supports (width: 100svw) { width: 100svw; }
    @supports not (width: 100svw) { width: 100vw; }

     font-family: ${({ theme }) => theme.fonts.families.body};
  }
`;

export default GlobalStyle;
