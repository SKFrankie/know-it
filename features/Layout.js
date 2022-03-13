import { Box } from "@chakra-ui/react";
import React from "react";
import { DesktopHeader, MobileNavbar, MobileHeader } from "./Header";
import CookieConsent from "./CookieConsent";
import Head from "next/head";
import { useUserContext } from "../context/user";
import { isPremium } from "../helpers/premium";

const Layout = ({ children }) => {
  const [currentUser] = useUserContext();
  return (
    <>
      <Head>
        <title>Know It!</title>
        {!isPremium(currentUser) && <script
          data-ad-client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />}
      </Head>
      <DesktopHeader />
      <MobileHeader />
      <Box h={{ base: "10vh", md: "5vh" }} />
      {children} <Box h={{ base: "10vh", md: "0" }} />
      <CookieConsent />
      <MobileNavbar />
    </>
  );
};

export default Layout;
