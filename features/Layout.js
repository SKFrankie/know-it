import { Box } from '@chakra-ui/react';
import React from 'react'
import { DesktopHeader, MobileNavbar, MobileHeader } from './Header';

const Layout = ({children}) => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
      {children} <Box h={{ base: "10vh", md: "0" }} /> <MobileNavbar />
    </>
  );
}

export default Layout
