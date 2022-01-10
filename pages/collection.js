import { Text, Flex } from "@chakra-ui/react";
import GigilCollection from "../features/GigilCollection";

const Collection = () => {
  return (
    <Flex direction="column" justify="center" align="center">
      <Text m={3} textAlign="center" fontWeight="bold" fontSize="2xl">
        My Gigil Collection
      </Text>
      <GigilCollection />
    </Flex>
  );
};

export default Collection;
