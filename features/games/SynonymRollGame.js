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

const RANDOM_SYNONYMS = gql`
  query RandomSynonyms {
    randomSynonyms(limit: 7) {
      synonyms
    }
  }
`;

const ContainedSynonymRollGame = () => {
  const game = GAME_TYPES.SYNONYM_ROLL;
  const [gameState, setGameState] = useState({ points: 0, starPercentage: 0, coins: 0, stars: 0 });
  return (
    <GameContainer game={game} gameState={gameState} setGameState={setGameState}>
      <SynonymRollGame gameState={gameState} setGameState={setGameState} />
    </GameContainer>
  );
};

const SynonymRollGame = ({ gameState, setGameState, onNextGame = null, knowlympics = false }) => {
  const [matchingWords, setMatchingWords] = useState({});
  const { data, error, loading, refetch } = useQuery(RANDOM_SYNONYMS, {
    onCompleted: (res) => {
      const { randomSynonyms } = res;
      const tmpSynonymObject = {};
      const alreadyUsedWords = [];
      randomSynonyms.forEach((synonymList) => {
        if (synonymList.synonyms.length > 1) {
          const shuffledSynonyms = shuffleArray(synonymList.synonyms.slice());
          const [synonym1, synonym2] = shuffledSynonyms;
          if (alreadyUsedWords.includes(synonym1) || alreadyUsedWords.includes(synonym2)) {
            // dealing with doublons
            return;
          }
          alreadyUsedWords.push(synonym1);
          alreadyUsedWords.push(synonym2);
          tmpSynonymObject[synonym1] = synonym2;
        }
      });
      setMatchingWords(tmpSynonymObject);
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
          same
        </Box>{" "}
        meaning
      </Text>
      {Object.keys(matchingWords).length ? (
        <MatchingWords
          matchingWords={matchingWords}
          onComplete={handleMatchingWordsComplete}
          setGameState={setGameState}
          gameState={gameState}
          knowlympics={knowlympics}
        />
      ) : null}
      {error && <Error />}
      {loading && <Loading />}
    </>
  );
};

export { SynonymRollGame };
export default ContainedSynonymRollGame;
