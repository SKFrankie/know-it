import React, { useState, useEffect } from "react";
import { Text, Image, Flex, Box } from "@chakra-ui/react";
import { useQuery, useMutation, gql } from "@apollo/client";
import GameContainer from "./GameContainer";
import MatchingWords from "./MatchingWords";
import { GAME_TYPES } from "../../constants.js";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import shuffleArray from "../../helpers/shuffleArray";
import Error from "../Error";
import Loading from "../Loading";

const RANDOM_ANTONYM = gql`
  query RandomAntonyms {
    randomAntonyms(limit: 7) {
      rightWord
      leftWord
    }
  }
`;

const AntonymHuntGame = () => {
  const game = GAME_TYPES.ANTONYM_HUNT;
  const [matchingWords, setMatchingWords] = useState({});
  const { data, error, loading, refetch } = useQuery(RANDOM_ANTONYM, {
    onCompleted: (res) => {
      const { randomAntonyms } = res;
      const tmpAntonymObject = {};
      randomAntonyms.forEach((antonymAssociation) => {
          tmpAntonymObject[antonymAssociation.rightWord] = antonymAssociation.leftWord;
      });
      setMatchingWords(tmpAntonymObject);
    },
    ...basicQueryResultSupport,
  });

  const [gameState, setGameState] = useState({points:0, starPercentage:0, coins:0, stars:0});

  return (
    <GameContainer game={game} gameState={gameState} setGameState={setGameState}>
      <Text textAlign="center" justify="center" fontSize={{ base: "sm", md: "md" }}>
        Find the word with the{" "}
        <Box as="span" fontWeight="500">
          same
        </Box>{" "}
        meaning
      </Text>
      {Object.keys(matchingWords).length && (
        <MatchingWords
          matchingWords={matchingWords}
          onComplete={refetch}
          setGameState={setGameState}
          gameState={gameState}
        />
      )}
      {error && <Error />}
      {loading && <Loading />}
    </GameContainer>
  );
};

export default AntonymHuntGame;