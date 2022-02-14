import { Box } from "@chakra-ui/react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            data-ad-client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            function getCookie(name) {
              var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
              if (match) return match[2];
            }
            if (getCookie("CookieConsent") !== "false") {
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            }
          `,
            }}
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <link rel="icon" href="/images/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Maven+Pro&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Ribeye+Marrow&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Ribeye&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#fff" />
          <meta
            name="description"
            content="A learning by gaming app to test and improve your English!!"
          />
          <meta property="og:title" content="Know It!" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dvdqswi8x/image/upload/v1643625971/Avatar%20Picture/hbkcmb6xgiblmg5qtrk8.png"
          />
        </Head>
        <Box as="body" p="5%">
          <Main />
          <NextScript />
        </Box>
      </Html>
    );
  }
}

export default MyDocument;
