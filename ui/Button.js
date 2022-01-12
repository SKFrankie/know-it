import { Box, Text, Button as ChakraButton } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Podium from "../features/Podium";
import * as ga from "../lib/ga";

const SubmitButton = ({ children, ...props }) => {
  return (
    <ChakraButton
      borderRadius="10px"
      w="100%"
      my="4"
      colorScheme={"blueClear"}
      type="submit"
      {...props}
    >
      {children}
    </ChakraButton>
  );
};
const Button = ({ children, href, ...props }) => {
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
};

const ButtonDesign = ({ children, ...props }) => {
  return (
    <ChakraButton
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      fontSize="lg"
      fontWeight="bold"
      borderRadius="10px"
      colorScheme={"blueClear2"}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

const KnowlympicsButton = ({ children, href="/games/knowlympics", text="Knowlympics", disabled = true, ...props }) => {
  const GaEvent = () => {
    ga.event({
      action: "Knowlympics",
    });
  };
  return (
    <Box textAlign="center" filter={disabled ? "grayscale(1)" : null} {...props}>
      <Podium px="4" />
      <NextLink href={href} passHref>
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
          {text}
        </ChakraButton>
      </NextLink>
      {disabled && <Text fontSize="xs">You need to be logged in and at least one star to play Knowlympics</Text>}
    </Box>
  );
};

const SuccessButton = ({ children, ...props }) => {
  return (
    <Button {...props} colorScheme="green" fontSize="md" height="fit-content" p={1}>
      {children}
    </Button>
  );
};
const CancelButton = ({ children, ...props }) => {
  return (
    <Button {...props} colorScheme="red" fontSize="md" height="fit-content" p={1}>
      {children}
    </Button>
  );
};

export default Button;
export { SubmitButton, KnowlympicsButton, SuccessButton, CancelButton };
