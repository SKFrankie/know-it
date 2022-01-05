import React, { useState, useEffect } from "react";
import { Image, Flex, Text, Divider} from "@chakra-ui/react";
import GameContainer from "./GameContainer";
import { useQuery, gql } from "@apollo/client";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import Error from "../Error";
import Loading from "../Loading";
import { GAME_TYPES } from "../../constants.js";

const RANDOM_FAB_VOCAB = gql`
  query RandomFabVocab {
    randomFabVocab(limit: 10) {
      picture
      correctWords
      wrongWords
      correctSentence
      wrongSentences
    }
  }
`;

const FabVocabGame = () => {
  const game = GAME_TYPES.FAB_VOCAB;
  const [gameState, setGameState] = useState({ points: 0, starPercentage: 0, coins: 0, stars: 0 });
  const [sentences, setSentences] = useState([ {sentence: "sentence what happens swith a logn senntenceone", correct: false}, {sentence: "sentence two", correct: true}, {sentence: "sentence three", correct: false}]);
  const [words, setWords] = useState([
    {
      word: "word one",
      correct: false,
    },
    {
      word: "word two",
      correct: true,
    },
    {
      word: "word three",
      correct: false,
    },
    {
      word: "word four",
      correct: false,
    },
  ]);
  const { data, error, loading, refetch } = useQuery(RANDOM_FAB_VOCAB, {
    onCompleted: (res) => {
      const { randomFabVocab } = res;
      console.log("res", res);
    },
    ...basicQueryResultSupport,
  });
  return (
    <GameContainer game={game} gameState={gameState} setGameState={setGameState}>
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems={{ base: "center", md: "initial" }}
        my={2}
        w="100%"
        justify="space-around"
      >
        <Image
          maxH={{ base: "50vh", md: "100%" }}
          w={{ base: "fit-content", md: "100%" }}
          maxW={{ base: "100%", md: "50vh" }}
          h={{ base: "100%", md: "fit-content" }}
          src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          my={2}
        />
        {/* GOOGLE AD */}
        <Flex fontSize="sm"  fontWeight={500} direction="column" alignItems="center">
          <Text fontWeight={400}>What do you see in the picture ?</Text>
          <Words words={words} />
          <Divider />
          <Text my={2} fontWeight={400}>Which sentence best describes this picture?</Text>
          <Sentences sentences={sentences} />
        </Flex>
      </Flex>
      {error && <Error />}
      {loading && <Loading />}
    </GameContainer>
  );
};

const Words = ({ words }) => {
  return (
    <Flex my={3} flexWrap="wrap" justify="center" w="90%">
      {words.map(({word}, index) => {
        return (
          <Text fontSize="md" m={3} key={word}>
            {word}
          </Text>
        );
      })}
    </Flex>
  );
};

const Sentences = ({ sentences }) => {
  return (
    <Flex my={3} direction="column" flexWrap="wrap" justify="center" w="90%">
      {sentences.map(({sentence}, index) => {
        return (
          <Text fontSize="sm" m={3} key={sentence}>
            {index + 1}. {sentence}
          </Text>
        );
      })}
    </Flex>
  );
};

export default FabVocabGame;
