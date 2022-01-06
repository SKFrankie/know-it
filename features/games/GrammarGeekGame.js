import React, { useState, useEffect } from "react";
import { Text, Image, Flex, Box } from "@chakra-ui/react";
import { useQuery, useMutation, gql } from "@apollo/client";
import GameContainer from "./GameContainer";
import { GAME_TYPES } from "../../constants.js";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import shuffleArray from "../../helpers/shuffleArray";
import Error from "../Error";
import Loading from "../Loading";
import Button from "../../ui/Button";

const RANDOM_GRAMMAR_GEEK = gql`
  query RandomGrammarGeek {
    randomGrammarGeek(limit: 10) {
      grammarId
      sentence
      correctWord
      wrongWords
      hint
    }
  }
`;

const GrammarGeekGame = () => {
  const game = GAME_TYPES.GRAMMAR_GEEK;

  const [gameState, setGameState] = useState({points:0, starPercentage:0, coins:0, stars:0});
  const [question, setQuestion] = useState("I am a very _ person");
  const [answers, setAnswers] = useState({
    "thing long word like": { correct: false, active: false },
    person: { correct: false, active: false },
    good: { correct: true, active: false },
    yes: { correct: false, active: false },
  });
  const [hint, setHint] = useState("Present Perfect");
  const [showHint, setShowHint] = useState(false);

  const { data, error, loading, refetch } = useQuery(RANDOM_GRAMMAR_GEEK, {
    onCompleted: (res) => {
    },
    ...basicQueryResultSupport,
  });
  return (
    <GameContainer game={game} gameState={gameState} setGameState={setGameState} align="center">
      <Flex justify="center" align="center" flexDirection="column" m={2} w="100%">
        <Question question={question} />
        <Answers answers={answers} setAnswers={setAnswers} />
        <Hint hint={hint} showHint={showHint} />
      </Flex>
      {error && <Error />}
      {loading && <Loading />}
    </GameContainer>
  );
};

const Question = ({ question }) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexDirection="column"
      border="2px solid #00B9F5"
      boxSizing="border-box"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)"
      borderRadius="15px"
      m={4}
      w={{ base: "100%", md: "50%" }}
    >
      <Text m={4} fontSize="xl">
        {question}
      </Text>
    </Flex>
  );
};

const Answers = ({ answers, setAnswers }) => {
  const isActive = (answer) => {
    return answers[answer]?.active;
  };

  const isCorrect = (answer) => {
    return answers[answer]?.correct;
  };

  const isClicked = (answer) => {
    return answers[answer]?.clicked;
  };
  return (
    <Flex
      justify="center"
      align="center"
      flexDirection={{ base: "column", md: "row" }}
      w={{ base: "90%", md: "100%" }}
      m={4}
      flexWrap="wrap"
      alignContent="center"
    >
      {Object.keys(answers).map((answer, index) => (
        <Button
          disabled={isActive(answer)}
          bg={isActive ? "#88A8B3" : isCorrect(answer) ? "#04C417" : "red"}
          key={answer}
          answer={answer}
      minW="fit-content"
          w={{base: "100%", md: "20%"}}
          m={4}
        >
          {answer}
        </Button>
      ))}
    </Flex>
  );
};

const Hint = ({ hint, showHint }) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexDirection="column"
      border="3px solid #04C417"
      boxSizing="border-box"
      borderRadius="5px"
      m={4}
      w={{ base: "100%", md: "50%" }}
      color="#04C417"
      p={4}
    >
      <Text m={6} fontSize="xl" fontWeight="bold">
        {hint}
      </Text>
    </Flex>
  )
}


export default GrammarGeekGame;
