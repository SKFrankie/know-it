import React, { useState, useEffect } from "react";
import { Text, Image, Flex, Box } from "@chakra-ui/react";
import { useQuery, useMutation, gql } from "@apollo/client";
import GameContainer from "./GameContainer";
import MatchingWords from "./MatchingWords";
import { GAME_TYPES } from "../../constants";
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

const ContainedAntonymHuntGame = () => {
  const game = GAME_TYPES.ANTONYM_HUNT;
  const [gameState, setGameState] = useState({ points: 0, starPercentage: 0, coins: 0, stars: 0 });
  return (
    <GameContainer game={game} gameState={gameState} setGameState={setGameState}>
      <AntonymHuntGame gameState={gameState} setGameState={setGameState} />
    </GameContainer>
  );
};

const AntonymHuntGame = ({ gameState, setGameState, onNextGame = null, knowlympics = false }) => {
  const [matchingWords, setMatchingWords] = useState({});
  const { data, error, loading, refetch } = useQuery(RANDOM_ANTONYM, {
    onCompleted: (res) => {
      const { randomAntonyms } = res;
      const tmpAntonymObject = {};
      const alreadyUsedWords = [];
      randomAntonyms.forEach((antonymAssociation) => {
        const { leftWord, rightWord } = antonymAssociation;
        if (alreadyUsedWords.includes(rightWord) || alreadyUsedWords.includes(leftWord)) {
          // dealing with doublons
          return;
        }
        alreadyUsedWords.push(rightWord);
        alreadyUsedWords.push(leftWord);
        tmpAntonymObject[antonymAssociation.rightWord] = antonymAssociation.leftWord;
      });
      setMatchingWords(tmpAntonymObject);
    },
    ...basicQueryResultSupport,
  });
  const handleMatchingWordsComplete = () => {
    if (onNextGame) {
      onNextGame();
      return;
    }
    refetch();
  };

  return (
    <>
      <Text textAlign="center" justify="center" fontSize={{ base: "sm", md: "md" }}>
        Find the word with the{" "}
        <Box as="span" fontWeight="500">
          opposite
        </Box>{" "}
        meaning
      </Text>
      {Object.keys(matchingWords).length && (
        <MatchingWords
          matchingWords={matchingWords}
          onComplete={handleMatchingWordsComplete}
          setGameState={setGameState}
          gameState={gameState}
          knowlympics={knowlympics}
          colorArray={[
            "#930000",
            "#925003",
            "#F0940B",
            "#6D00B0",
            "#06B402",
            "#00A5DB",
            "#00398E",
            "#00B4B4",
            "#0F0FA4",
          ]}
        />
      )}
      {error && <Error />}
      {loading && <Loading />}
    </>
  );
};
export { AntonymHuntGame };
export default ContainedAntonymHuntGame;
