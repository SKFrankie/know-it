import React from 'react'
import NextLink from 'next/link'
import { Link as ChakraLink} from '@chakra-ui/react'

const Link = ({children, href, ...props}) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  );
}

export default Link
