import React from 'react'
import {Flex, Text} from '@chakra-ui/react'

const Timer = ({timer, ...props}) => {
  return (
    <Flex
      justify="center"
      alignItems="center"
      minW="50px"
      w="fit-content"
      h="50px"
      borderRadius="100px"
      border="2px solid #00455B"
      bg="blueClear.500"
      color="deepDarkBlue"
      m={2}
      {...props}
    >
      <Text fontWeight="500" fontSize="xs">{timer}</Text>
    </Flex>
  );
}

export default Timer
