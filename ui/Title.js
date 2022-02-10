import { Flex, Text, Heading } from "@chakra-ui/react";
import React from "react";
import Info from "../features/games/Info";

const Title = ({ ...props }) => {
  return (
    <Flex direction="column" align="center" justify="center" margin={5} {...props}>
    <Flex>
      <Heading as="h1" fontSize={{ base: "5xl", md: "8vw" }} fontFamily="Ribeye">
        Know It!
      </Heading>
      <Info mt="210%" />
      </Flex>
      <Text fontSize="sm" color="deepDarkBlue">
        a BluePopcorn Production
      </Text>
    </Flex>
  );
};

const SectionTitle = ({ children, ...props }) => {
  return (
    <Text fontSize="xl" textAlign="center" fontWeight="bold" my="4" {...props}>
      {children}
    </Text>
  );
};

const SubTitle = ({ children, ...props }) => {
  return (
    <Text fontSize="lg" fontWeight="bold" my="3" {...props}>
      {children}
    </Text>
  );
};


export { SectionTitle, SubTitle };
export default Title;
