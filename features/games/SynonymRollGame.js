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

const RANDOM_SYNONYMS = gql`
  query RandomSynonyms {
    randomSynonyms(limit: 7) {
      synonyms
    }
  }
`;

const SynonymRollGame = () => {
  const game = GAME_TYPES.SYNONYM_ROLL;
  const [matchingWords, setMatchingWords] = useState({});
  const { data, error, loading, refetch } = useQuery(RANDOM_SYNONYMS, {
    onCompleted: (res) => {
      const { randomSynonyms } = res;
      const tmpSynonymObject = {};
      randomSynonyms.forEach((synonymList) => {
        if (synonymList.synonyms.length > 1) {
          const shuffledSynonyms = shuffleArray(synonymList.synonyms.slice());
          tmpSynonymObject[shuffledSynonyms[0]] = shuffledSynonyms[1];
        }
      });
      setMatchingWords(tmpSynonymObject);
    },
    ...basicQueryResultSupport,
  });

  return (
    <GameContainer game={game}>
      <Text textAlign="center" justify="center" fontSize={{ base: "sm", md: "md" }}>
        Find the word with the{" "}
        <Box as="span" fontWeight="500">
          same
        </Box>{" "}
        meaning
      </Text>
      {Object.keys(matchingWords).length && <MatchingWords matchingWords={matchingWords} onComplete={refetch}/>}
      {error && <Error />}
      {loading && <Loading />}
    </GameContainer>
  );
};

export default SynonymRollGame;
