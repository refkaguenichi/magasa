import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
html{
    height:100%;
}

body {
  position: relative;
  min-height: 100%;
}

*{
    margin:0;
    padding:0;
    box-sizing:border-box;

    a{
        text-decoration:none;
         color: inherit;
          cursor: pointer;
    }
    a:active, a:active{
        color:teal;
    }
}

*:focus {
    outline: none;
}
`;
