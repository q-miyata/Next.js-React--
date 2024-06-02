import { Html, Head, Main, NextScript } from "next/document";
import { css, Global } from "@emotion/react";
import { InitializeColorMode } from "theme-ui";



export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <InitializeColorMode />
      
      <body>
        <Main />
        <NextScript />
      </body>
      
    </Html>
  );
}
