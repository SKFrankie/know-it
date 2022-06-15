import React from "react";
import NextLink from "next/link";
import { Link as ChakraLink, LinkOverlay as ChakraLinkOverlay, Box } from "@chakra-ui/react";

const Link = ({ children, href, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink fontWeight="bold" {...props}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};
const LinkOverlay = ({ children, href, ...props }) => {
  if (href === null) return <Box {...props}>{children}</Box>;
  return (
    <NextLink href={href} passHref>
      <ChakraLink _focus={{ boxShadow: "none" }} _hover={{ textDecoration: "none" }} {...props}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};
export { LinkOverlay };
export default Link;
