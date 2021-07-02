import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: ${props => props.theme.colors.background};
    font-size: 14px;
    color: ${props => props.theme.colors.text};
  }
  body,
  input,
  button,
  textarea {
    font: 400 16px "Roboto", sans-serif;
  }
  h1,h2,p,span{
    color: ${props => props.theme.colors.text};
  }
  main{
    background-color: ${props => props.theme.colors.background};
  }
`;