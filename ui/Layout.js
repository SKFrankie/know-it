import React, {useEffect} from 'react'
import {Box} from "@chakra-ui/react"

const Layout = ({children}) => {
  useEffect(() => {
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);
  return (
    <Box as="body" p="5%">
      {children}
    </Box>
  );
}

export default Layout