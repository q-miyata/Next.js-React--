import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function() {
                const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const theme = darkModeMediaQuery.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
        }}
      />
      <Head />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
