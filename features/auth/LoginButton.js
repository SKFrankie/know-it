import React from 'react'
import {Icon, Button as ChakraButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { Icon as Iconify } from "@iconify/react";

const LoginButton = () => {
  return (
    <NextLink href="/login" passHref>
      <ChakraButton
        m={2}
        boxShadow="0px 2.16px 2.16px rgba(0, 0, 0, 0.25), inset 0px 2.16px 2.16px rgba(0, 0, 0, 0.25)"
        colorScheme="red"
        aria-label="login"
        size="lg"
        rightIcon={<Icon boxSize={7} color="white" as={Iconify} icon="fe:login" />}
        position="absolute"
        right="0"
        top="0"
        display={{ base: "flex", md: "none" }}
      >
        Login
      </ChakraButton>
    </NextLink>
  );
}

export default LoginButton