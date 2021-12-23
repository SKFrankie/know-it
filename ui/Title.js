import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Title = () => {
  return (
    <Flex direction="column" align="center" justify="center" w="100%" margin={5}>
      <Text fontSize="6xl"  fontFamily="Ribeye">
        Know It!
      </Text>
      <Text>
        a BluePopcorn Production
      </Text>
    </Flex>
  );
}

export default Title
