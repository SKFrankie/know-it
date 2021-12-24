import { Box } from '@chakra-ui/react';
import React from 'react'
import { MobileHeader } from './Header';

const Layout = ({children}) => {
  return (
    <>
      {children} <Box h={{base:"10vh", md:"0"}}/> <MobileHeader />
    </>
  );
}

export default Layout
