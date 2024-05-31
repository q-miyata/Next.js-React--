import { Html, Head, Main, NextScript } from "next/document";
import { css, Global } from "@emotion/react";
import { global } from "./_app.styles"
import App from "./darkbutton";
import { lightTheme, darkTheme } from "./_app.styles";

export default function Document() {
  const theme = darkTheme;
  return (
    <Html lang="en">
      <Head />
      <body css={theme}>
      <App />
      
      <Global styles={global} />
    
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
