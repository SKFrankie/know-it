import React from 'react'
import { Flex } from "@chakra-ui/react";
import Header from "./Header";

const ShopContainer = ({ children }) => {
  return (
    <Flex>
      <Header />
      {children}
    </Flex>
  );
};

export default ShopContainer
