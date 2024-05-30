import { Html, Head, Main, NextScript } from "next/document";
import { css, Global } from "@emotion/react";
import { global } from "./_app.styles"


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
      <Global styles={global} />
    
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
