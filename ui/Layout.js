import React, {useEffect} from 'react'
import {Box} from "@chakra-ui/react"

const Layout = ({children}) => {
  useEffect(() => {
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);
  return (
    <Box as="body" p={'1rem'}>
      {children}
    </Box>
  );
}

export default Layout