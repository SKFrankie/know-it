import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_SERVER_URI,
});

const customHeaders = {
  key: "Access-Control-Allow-Origin",
  "Content-Type": "application/json",
  Accept: "*/*",
  Origin: process.env.NEXT_PUBLIC_URL, //make sur it's always filled by you navigator
};

const authLink = setContext((_, { headers }) => {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: process.env.NEXT_PUBLIC_APOLLO_SERVER_URI,
  headers: customHeaders,
  cache: new InMemoryCache(),
});

const getSSRClient = async (SSRtoken) => {
  console.log("creating ssr session with", SSRtoken)
  const SSRauthLink = setContext((_, { headers }) => {
    let token;
    if (typeof window !== "undefined" && !SSRtoken) {
      token = localStorage.getItem("token");
    } else {
      token = SSRtoken;
    }
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  const SSRclient = new ApolloClient({
    link: SSRauthLink.concat(httpLink),
    uri: process.env.NEXT_PUBLIC_APOLLO_SERVER_URI,
    headers: customHeaders,
    cache: new InMemoryCache(),
  });
  return SSRclient;
};

export { getSSRClient };
export default client;
