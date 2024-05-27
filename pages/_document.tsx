import { Html, Head, Main, NextScript } from "next/document";
import { Global,css } from "@emotion/react"
import { styles,global } from "./_app.styles"


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
