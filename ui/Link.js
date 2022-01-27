import React from "react";
import NextLink from "next/link";
import { Link as ChakraLink, LinkOverlay as ChakraLinkOverlay } from "@chakra-ui/react";

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
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};
export { LinkOverlay };
export default Link;
