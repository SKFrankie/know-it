import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Title = ({ ...props }) => {
  return (
    <Flex direction="column" align="center" justify="center" margin={5} {...props}>
      <Text fontSize={{ base: "5xl", md: "8vw" }} fontFamily="Ribeye">
        Know It!
      </Text>
      <Text fontSize="sm" color="deepDarkBlue">a BluePopcorn Production</Text>
    </Flex>
  );
};

export default Title;
