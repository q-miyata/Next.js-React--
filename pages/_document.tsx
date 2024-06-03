import { Html, Head, Main, NextScript } from "next/document";
import { css, Global } from "@emotion/react";
import { global } from "./_app.styles"
import Togglebutton from "./darkbutton";
import { lightTheme, darkTheme } from "./_app.styles";
import App from "./_app";

export default function Document() {
const theme = darkTheme;
  return (
    <Html lang="en">
      <Head />
      <body css={theme}>
        <Global styles={theme} />
      {/* <App /> */}
       {/* 以下、styles={global}にしてたらダークモードにならなかった */}
     
    
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
