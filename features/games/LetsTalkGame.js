import React, { useState, useEffect, useCallback } from "react";
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
import {Answers} from "./GrammarGeekGame"

const RANDOM_LETS_TALK = gql`
  query RandomLetsTalk {
    randomLetsTalk(limit: 10) {
      letsTalkId
      sentence
      correctWord
      wrongWords
    }
  }
`;

const ContainedLetsTalkGame = () => {
  const game = GAME_TYPES.LETS_TALK;
  const [gameState, setGameState] = useState({ points: 0, starPercentage: 0, coins: 0, stars: 0 });
  const [stopTimer, setStopTimer] = useState(false);
  return (
    <GameContainer
      game={game}
      gameState={gameState}
      setGameState={setGameState}
      stopTimer={stopTimer}
    >
      <LetsTalkGame
        gameState={gameState}
        setGameState={setGameState}
        setStopTimer={setStopTimer}
      />
    </GameContainer>
  );
};

const LetsTalkGame = ({
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

  const { data, error, loading, refetch } = useQuery(RANDOM_LETS_TALK, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      const { randomLetsTalk } = res;
      if (randomLetsTalk.length === 0) {
        return;
      }
      setCurrentQuestion(0);
      handleNewQuestion(randomLetsTalk[0]);
    },
    ...basicQueryResultSupport,
  });

  const handleNextQuestion = useCallback(() => {
    setStopTimer(false);
    if (onNextGame) {
      onNextGame();
      return;
    }
    if (currentQuestion + 1 < data.randomLetsTalk.length) {
      setCurrentQuestion(currentQuestion + 1);
      handleNewQuestion(data.randomLetsTalk[currentQuestion + 1]);
    } else {
      refetch();
    }
  }, [data, refetch, currentQuestion]);

  return (
    <>
      <Text textAlign="center" justify="center" mt="4" fontSize={{ base: "sm", lg: "md" }}>
        Choose the best response to each question or statement
      </Text>
      <Flex justify="center" align="center" flexDirection="column" m={2} w="100%">
        <Question question={question} />
        <Answers
          answers={answers}
          setAnswers={setAnswers}
          answerArray={answerArray}
          onAnswerClick={handleAnswerClick}
        />
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

const Question = ({ question }) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexDirection="column"
      border="2px solid #00B9F5"
      boxSizing="border-box"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      borderRadius="15px"
      m={4}
      w={{ base: "100%", lg: "50%" }}
    >
      <Text textAlign="center" m={4} fontSize={{ base: "2xl", lg: "3xl" }}>
        {question}
      </Text>
    </Flex>
  );
};



export { LetsTalkGame };
export default ContainedLetsTalkGame;
