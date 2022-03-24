import Document, { Html, Head, Main, NextScript } from "next/document";
import Layout from "../ui/Layout";
import { getCookieConsentValue } from "react-cookie-consent";
import { useCookies } from "react-cookie";

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
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            function getCookie(name) {
              var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
              if (match) return match[2];
            }
            if (getCookie("CookieConsent") === "true") {
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
          <link rel="stylesheet" media="print" onLoad="this.onload=null;this.removeAttribute('media');" href="https://fonts.googleapis.com/css2?family=Maven+Pro&display=swap"/>
          <link rel="stylesheet" media="print" onLoad="this.onload=null;this.removeAttribute('media');" href="https://fonts.googleapis.com/css2?family=Ribeye+Marrow&display=swap"/>
          <link rel="stylesheet" media="print" onLoad="this.onload=null;this.removeAttribute('media');" href="https://fonts.googleapis.com/css2?family=Ribeye&display=swap"/>
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
        <Layout>
          <Main />
          <NextScript />
        </Layout>
      </Html>
    );
  }
}

export default MyDocument;
