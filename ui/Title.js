import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Title = () => {
  return (
    <Flex direction="column" align="center" justify="center" margin={5}>
      <Text fontSize={{base:"5xl", md:"150px"}}  fontFamily="Ribeye">
        Know It!
      </Text>
      <Text fontSize="sm">
        a BluePopcorn Production
      </Text>
    </Flex>
  );
}

export default Title
