import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Info from "../features/games/Info";

const Title = ({ ...props }) => {
  return (
    <Flex direction="column" align="center" justify="center" margin={5} {...props}>
    <Flex>
      <Text fontSize={{ base: "5xl", md: "8vw" }} fontFamily="Ribeye">
        Know It!
      </Text>
      <Info mt="210%" />
      </Flex>
      <Text fontSize="sm" color="deepDarkBlue">
        a BluePopcorn Production
      </Text>
    </Flex>
  );
};

export default Title;
