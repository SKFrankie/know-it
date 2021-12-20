import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import * as ga from "../lib/ga";

const theme = extendTheme({
  colors: {
    primary: "red",
    red: "#DB0000",
  },
  fonts: {
    body: "Maven Pro, system-ui, sans-serif",
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
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}
export default MyApp;
