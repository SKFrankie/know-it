import React, { useState, useEffect } from "react";
import { Text, Image, Flex, Box, Icon, useDisclosure } from "@chakra-ui/react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Icon as Iconify } from "@iconify/react";
import GameContainer, { NextButton } from "./GameContainer";
import { GAME_TYPES, POINTS } from "../../constants";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import shuffleArray from "../../helpers/shuffleArray";
import Error from "../Error";
import Loading from "../Loading";
import Button from "../../ui/Button";
import { LinkOverlay } from "../../ui/Link";
import Modal from '../../ui/Modal';
import GrammarModule from './GrammarModule';
import {Answers, Hint} from "./GrammarGeekGame"

const RANDOM_NUMBERS_PLUS = gql`
  query RandomNumbersPlus {
    randomNumbersPlus(limit: 10) {
      numbersPlusId
      sentence
      correctWord
      wrongWords
      modules {
        grammarModuleId
        name
        text
      }
    }
  }
`;

const ContainedNumbersPlusGame = () => {
  const game = GAME_TYPES.NUMBERS_PLUS;
  const [gameState, setGameState] = useState({ points: 0, starPercentage: 0, coins: 0, stars: 0 });
  const [stopTimer, setStopTimer] = useState(false);
  return (
    <GameContainer
      game={game}
      gameState={gameState}
      setGameState={setGameState}
      stopTimer={stopTimer}
    >
      <NumbersPlusGame
        gameState={gameState}
        setGameState={setGameState}
        setStopTimer={setStopTimer}
      />
    </GameContainer>
  );
};

const NumbersPlusGame = ({
  gameState,
  setGameState,
  knowlympics,
  setStopTimer,
  onNextGame = null,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState({});
  const [modules, setModules] = useState([]);
  const [showHint, setShowHint] = useState(false);

  const [answerArray, setAnswerArray] = useState([]);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setGameState((prevState) => ({
        ...prevState,
        starPercentage: knowlympics ? 0 : gameState.starPercentage + POINTS.MEDIUM,
        points: knowlympics ? gameState.points + POINTS.MEDIUM : 0,
        coins: gameState.coins + POINTS.SMALL,
      }));
    }
    setShowHint(true);
    setStopTimer(true);
  };

  const handleNextQuestion = () => {
    setStopTimer(false);
    if (onNextGame) {
      onNextGame();
      return;
    }
    if (currentQuestion + 1 < data.randomNumbersPlus.length) {
      setCurrentQuestion(currentQuestion + 1);
      handleNewQuestion(data.randomNumbersPlus[currentQuestion + 1]);
    } else {
      refetch();
    }
  };

  const handleNewQuestion = (question) => {
    const tmpAnswers = {};

    // set answers
    question.wrongWords.forEach((word) => {
      tmpAnswers[word] = { correct: false };
    });
    tmpAnswers[question.correctWord] = { correct: true };
    setAnswers(tmpAnswers);

    setQuestion(question.sentence);
    setModules(question.modules);
    setShowHint(false);

    setAnswerArray(shuffleArray(Object.keys(tmpAnswers)));
  };

  const { data, error, loading, refetch } = useQuery(RANDOM_NUMBERS_PLUS, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      const { randomNumbersPlus } = res;
      if (randomNumbersPlus.length === 0) {
        return;
      }
      setCurrentQuestion(0);
      handleNewQuestion(randomNumbersPlus[0]);
    },
    ...basicQueryResultSupport,
  });

  return (
    <>
      <Text textAlign="center" justify="center" fontSize={{ base: "sm", lg: "md" }}>
        Find the right way to write the numbers
      </Text>
      <Flex justify="center" align="center" flexDirection="column" m={2} w="100%">
        <Question question={question} modules={modules} />
        <Answers
          answers={answers}
          setAnswers={setAnswers}
          answerArray={answerArray}
          onAnswerClick={handleAnswerClick}
        />
        {modules.map((module) => (
          <Hint
            key={module.grammarModuleId}
            hint={module.name}
            showHint={showHint}
            id={module.grammarModuleId}
            text={module.text}
          />
        ))}
        {showHint && (
          <NextButton w={{ base: "100%", lg: "40%" }} onNext={handleNextQuestion}>
            Continue
          </NextButton>
        )}
      </Flex>
      {error && <Error />}
      {loading && <Loading />}
    </>
  );
};

const Question = ({ question, modules }) => {
  return (
    <Flex m={4} justify="center" align="center" flexDirection="column" w={{ base: "100%", lg: "50%" }}>
      {modules.length ? (
        <Flex
          justify="center"
          align="center"
          flexDirection="column"
          bg="midDarkBlue"
          border="1px solid #00B9F5"
          boxSizing="border-box"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          borderRadius="50px"
          borderBottomRadius="0px"
          w={{ base: "60%", lg: "30%" }}
        >
          <Text textAlign="center" m={4} fontSize={{ base: "md", lg: "lg" }}>
            {modules.map(
              (module, index) => `${module.name} ${index + 1 < modules.length ? "/" : ""}`
            )}
          </Text>
        </Flex>
      ) : null}
      <Flex
        justify="center"
        align="center"
        flexDirection="column"
        bg="midDarkBlue"
        border="1px solid #00B9F5"
        boxSizing="border-box"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        borderRadius="15px"
        m={4}
        mt={0}
        w={{ base: "100%", lg: "50%" }}
      >
        <Text textAlign="center" m={4} fontSize={{ base: "2xl", lg: "3xl" }}>
          {question}
        </Text>
      </Flex>
    </Flex>
  );
};


export { NumbersPlusGame, Answers };
export default ContainedNumbersPlusGame;