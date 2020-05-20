import React from "react";
import NextDocument, {
  DocumentContext, Html, Head, Main, NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

import { common as strings } from "public/static/locales/en";
import { prod } from "public/static/links";

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/static/manifest.json" />

          <meta charSet="utf-8" />
          <meta name="theme-color" content="#f4511e" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-orientations" content="portrait-any" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content={strings.name} />
          <meta content="yes" name="apple-touch-fullscreen" />

          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="64x64" href="/static/favicon/favicon-64x64.png" />
          <link rel="icon" type="image/png" sizes="128x128" href="/static/favicon/favicon-128x128.png" />
          <link rel="icon" type="image/png" sizes="256x256" href="/static/favicon/favicon-256x256.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/static/favicon/favicon-512x512.png" />
          <link rel="icon" type="image/png" sizes="1024x1024" href="/static/favicon/favicon-1024x1024.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />

          <meta name="author" content={strings.name} />
          <meta name="publisher" content={strings.name} />
          <meta name="copyright" content={strings.name} />
          <meta name="language" content="EN" />
          <meta name="robots" content="index,follow" />
          <meta name="url" content={prod.url} />
          <meta name="rating" content="General" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
