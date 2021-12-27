import {Box, Button as ChakraButton } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import Podium from "../features/Podium";
import * as ga from "../lib/ga";

const SubmitButton = ({children, ...props}) => {
  return (
    <ChakraButton borderRadius="10px" w="100%" my="4" colorScheme={"blueClear"} type="submit" {...props}> 
      {children}
    </ChakraButton>
  )
}
const Button = ({children, href, ...props}) => {
  if (href) {
    return (
      <NextLink href={href} passHref>
        <ChakraButton
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          fontSize="lg"
          fontWeight="bold"
          borderRadius="10px"
          colorScheme={"blueClear2"}
          p="25px"
          {...props}
        >
          {children}
        </ChakraButton>
      </NextLink>
    );
  }
  return <ButtonDesign {...props}>{children}</ButtonDesign>;
}

const ButtonDesign = ({children, ...props}) => {
  return (
    <ChakraButton  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)" fontSize="lg" fontWeight="bold" borderRadius="10px" colorScheme={"blueClear2"} {...props}>
      {children}
    </ChakraButton>
  );
}

const KnowlympicsButton = ({ children, disabled=true, ...props }) => {
  const GaEvent = () => {
    ga.event({
      action: "Knowlympics",
    });
  };
  return (
    <Box textAlign="center" filter={disabled ? "grayscale(1)" : null}>
      <Podium px="4" />
      <NextLink href="/knowlympics" passHref>
        <ChakraButton
          borderRadius="10px"
          w={{ base: "100%", md: "30vw" }}
          py="25px"
          bg="orange"
          fontSize="xl"
          fontWeight="bold"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          disabled={disabled}
          onClick={GaEvent}
        >
          Knowlympics
        </ChakraButton>
      </NextLink>
    </Box>
  );
};


export default Button
export { SubmitButton, KnowlympicsButton }
