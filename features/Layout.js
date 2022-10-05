import { Box, Container } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";

import { DesktopHeader, MobileNavbar } from "./Header";
import CookieConsent from "./CookieConsent";

import { useUserContext } from "../context/user";
import { isPremium } from "../helpers/premium";

const Layout = ({ children }) => {
  const [currentUser] = useUserContext();
  return (
    <>
      <Head>
        <title>Know It!</title>
        {
          !isPremium(currentUser) && 
          <script
            data-ad-client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
        }
      </Head>
      <DesktopHeader />
      <Box as="body" p="1rem">
        { children } 
      </Box>
      <CookieConsent />
      <MobileNavbar />
    </>
  );
};

export default Layout;
