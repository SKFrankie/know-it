import React from "react";
import { Flex } from "@chakra-ui/react";
import Header from "./Header";

const AboutContainer = ({ children }) => {
  return (
    <Flex bg="white" color="deepDarkBlue" direction="column" my={2} p={3}>
      <Header />
      <Flex direction="column" w="100%" h="100%" mt={2} p={5}>
        {children}
      </Flex>
    </Flex>
  );
};

export default AboutContainer;
