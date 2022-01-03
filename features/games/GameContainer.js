import React from 'react'
import { MobileGameHeader } from "../Header";
import {Flex} from '@chakra-ui/react'

const GameContainer = ({timer=0, children}) => {
  return (
    <Flex>
      <MobileGameHeader timer={timer} />
    </Flex>
  );
}

export default GameContainer
