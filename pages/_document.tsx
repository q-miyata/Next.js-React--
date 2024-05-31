import { Html, Head, Main, NextScript } from "next/document";
import { css, Global } from "@emotion/react";
import { lightTheme, darkTheme } from "./_app.styles";


export default function Document() {
  const theme = darkTheme; // デフォルトはライトモード

  return (
    <Html lang="en">
      <Head />
      <body css={theme}>
        <Global styles={theme} />
       
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

