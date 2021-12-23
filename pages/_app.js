import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import {UserWrapper} from "../context/user"

import * as ga from "../lib/ga";
import { RouteGuard } from "../features/auth/RouteGuard";

const theme = extendTheme({
  colors: {
    primary: "red",
    red: "#DB0000",
    darkBlue: "#007EA7",
    blueClear: {
      500: "#00A5DB",
      600: "#00BEDC",
    },
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
          <Component {...pageProps} />
        </ChakraProvider>
      </RouteGuard>
      </UserWrapper>
    </ApolloProvider>
  );
}
export default MyApp;
