import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import {UserWrapper} from "../context/user"

import * as ga from "../lib/ga";
import { RouteGuard } from "../features/auth/RouteGuard";
import Layout from "../features/Layout";

const theme = extendTheme({
  colors: {
    darkBlue: "#007EA7",
    deepDarkBlue: "#00455B",
    blueClear: {
      500: "#00A5DB",
      600: "#00BEDC",
      700: "#00B9F5", //blueclear2
    },
    blueClear2: {
      500: "#00B9F5", //blueclear2
      600: "#00BEDC",
      700: "#00A5DB",
    },
    yellowStar: "#FFBE0B",
  },
  styles: {
    global: {
      body: {
        color: "white",
        bg: "darkBlue",
      },
    },
  },
  fonts: {
    body: "system-ui, sans-serif",
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ApolloProvider client={client}>
      <UserWrapper>
        <RouteGuard>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </RouteGuard>
      </UserWrapper>
    </ApolloProvider>
  );
}
export default MyApp;
