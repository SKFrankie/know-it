import React from 'react'
import {Box} from "@chakra-ui/react"

const Layout = ({children}) => {
  return (
    <Box as="body" p="5%">
      {children}
    </Box>
  );
}

export default Layout