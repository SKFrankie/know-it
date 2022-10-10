import { Flex } from "@chakra-ui/react";
import React from "react";

const Form = ({ children, ...props }) => {
  return (
    <form {...props}>
      <Flex justify="center">
        <Flex w={{ base: "100%", lg: "60%" }} direction="column">
          {children}
        </Flex>
      </Flex>
    </form>
  );
};

export default Form;
