import React from 'react'
import GameContainer from './GameContainer'
import MatchingWords from './MatchingWords'
import {GAME_TYPES} from '../../constants.js'
import { Text, Image, Flex, Box } from "@chakra-ui/react";

const SynonymRollGame = () => {
  const game = GAME_TYPES.SYNONYM_ROLL;
  return (
    <GameContainer game={game}>
      <Text textAlign="center" justify="center" fontSize={{ base: "sm", md: "md" }}>
        Find the word with the{" "}
        <Box as="span" fontWeight="500">
          same
        </Box>{" "}
        meaning
      </Text>
      <MatchingWords />
    </GameContainer>
  );
}

export default SynonymRollGame
