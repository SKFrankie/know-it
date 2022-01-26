import { Box } from "@chakra-ui/react";
import React from "react";
import { DesktopHeader, MobileNavbar, MobileHeader } from "./Header";
import CookieConsent from "./CookieConsent";

const Layout = ({ children }) => {
  return (
    <>
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
