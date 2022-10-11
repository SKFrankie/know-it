import { Box, Text, Button as ChakraButton, Icon, Flex } from "@chakra-ui/react";
import { Icon as Iconify } from "@iconify/react";
import NextLink from "next/link";
import React from "react";
import Podium from "../features/Podium";
import * as ga from "../lib/ga";
import { useUserContext } from "../context/user";
import { getCookieConsentValue } from "react-cookie-consent";
import { useCookies } from "react-cookie";
import Star from "../features/Star";
import StarComplete from "../features/animations/StarComplete";

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

const KnowlympicsButton = ({
  children,
  href = "/games/knowlympics",
  text = "Knowlympics",
  disabled = true,
  podium = false,
  bg="orange",
  ...props
}) => {
  const [cookies] = useCookies(["CookieConsent"]);
    const isConsent = getCookieConsentValue();
    if (isConsent === "true") {
      const GaEvent = () => {
        ga.event({
          action: "Knowlympics",
        });
      };
    };
  const [currentUser] = useUserContext();
  return (
    <Flex 
      flexDirection="column" 
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      filter={disabled ? "grayscale(1)" : null} 
      {...props}
    >
      {podium && <Podium px="4" />}
      <NextLink href={href} passHref>
        <ChakraButton
          className={currentUser?.stars ? "notification" : null}
          borderRadius="10px"
          w={{ base: "100%", lg: "30vw" }}
          py="25px"
          bg={bg}
          fontSize="xl"
          fontWeight="bold"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          disabled={disabled}
          onClick={GaEvent}
        >
          {text}
        </ChakraButton>
      </NextLink>
      {disabled && (
        <Text fontSize="xs">
          You need to be logged in and have at least one star to play Knowlympics
        </Text>
      )}
    </Flex>
  );
};

const SuccessButton = ({ children, ...props }) => {
  return (
    <Button {...props} colorScheme="green" fontSize="md" display="table" height="auto" p={1}>
      {children}
    </Button>
  );
};
const CancelButton = ({ children, ...props }) => {
  return (
    <Button {...props} colorScheme="red" fontSize="md" display="table" height="auto" p={1}>
      {children}
    </Button>
  );
};

export default Button;
export { SubmitButton, KnowlympicsButton, SuccessButton, CancelButton };
