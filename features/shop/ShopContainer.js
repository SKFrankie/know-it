import React from 'react'
import { Flex } from "@chakra-ui/react";
import Header from "./Header";

const ShopContainer = ({ children }) => {
  return (
    <Flex direction="column"  my={2}>
      <Header />
      <Flex direction="column" w="100%" h="100%" mt={2} p={5}>
      {children}
      </Flex>
    </Flex>
  );
};

export default ShopContainer
