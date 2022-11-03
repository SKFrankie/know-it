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

const RANDOM_GRAMMAR_GEEK = gql`
  query RandomGrammarGeek {
    randomGrammarGeek(limit: 10) {
      grammarId
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

const ContainedGrammarGeekGame = () => {
  const game = GAME_TYPES.GRAMMAR_GEEK;
  const [gameState, setGameState] = useState({ points: 0, starPercentage: 0, coins: 0, stars: 0 });
  const [stopTimer, setStopTimer] = useState(false);
  return (
    <GameContainer
      game={game}
      gameState={gameState}
      setGameState={setGameState}
      stopTimer={stopTimer}
    >
      <GrammarGeekGame
        gameState={gameState}
        setGameState={setGameState}
        setStopTimer={setStopTimer}
      />
    </GameContainer>
  );
};

const GrammarGeekGame = ({
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
    if (currentQuestion + 1 < data.randomGrammarGeek.length) {
      setCurrentQuestion(currentQuestion + 1);
      handleNewQuestion(data.randomGrammarGeek[currentQuestion + 1]);
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

  const { data, error, loading, refetch } = useQuery(RANDOM_GRAMMAR_GEEK, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      const { randomGrammarGeek } = res;
      if (randomGrammarGeek.length === 0) {
        return;
      }
      setCurrentQuestion(0);
      handleNewQuestion(randomGrammarGeek[0]);
    },
    ...basicQueryResultSupport,
  });

  return (
    <>
      <Flex justify="center" align="center" flexDirection="column" m={2} w="100%">
        <Question question={question} />
        <Answers
          answers={answers}
          setAnswers={setAnswers}
          answerArray={answerArray}
          onAnswerClick={handleAnswerClick}
        />
        {modules.map ((module) => (
          <Hint key={module.grammarModuleId} hint={module.name} showHint={showHint} id={module.grammarModuleId}  text={module.text}/>
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

const Answers = ({ answers, setAnswers, answerArray, onAnswerClick }) => {
  const isActive = (answer) => {
    return answers[answer]?.active;
  };

  const isCorrect = (answer) => {
    return answers[answer]?.correct;
  };

  const isDisabled = (answer) => {
    return answers[answer]?.disabled;
  };

  const handleClick = (answer) => {
    const tmpAnswerObject = answers;
    // on click we active the clicked answer, the right answer, and the other answers are disabled
    tmpAnswerObject[answer].clicked = true;
    tmpAnswerObject[answer].active = true;
    Object.keys(tmpAnswerObject).map(function (key) {
      if (tmpAnswerObject[key].correct) {
        tmpAnswerObject[key].active = true;
      }
      tmpAnswerObject[key].disabled = true;
    });
    setAnswers({ answers, ...tmpAnswerObject });
    onAnswerClick(isCorrect(answer));
  };

  return (
    <Flex
      justify="center"
      align="center"
      flexDirection={{ base: "column", lg: "row" }}
      w={{ base: "90%", lg: "100%" }}
      m={4}
      flexWrap="wrap"
      alignContent="center"
    >
      {answerArray.map((answer, index) => {
        return (
          <Button
            disabled={isActive(answer) || isDisabled(answer)}
            bg={isActive(answer) ? (isCorrect(answer) ? "#04C417" : "red") : "#88A8B3"}
            _hover={{ bg: isActive(answer) ? (isCorrect(answer) ? "#04C417" : "red") : "#88A8D1" }}
            key={answer}
            answer={answer}
            w="auto"
            minW="fit-content"
            whiteSpace="normal"
            h="fit-content"
            p="3"
            display="table"
            w={{ base: "100%", lg: "20%" }}
            m={4}
            onClick={() => {
              handleClick(answer);
            }}
          >
            {answer}
          </Button>
        );
      })}
    </Flex>
  );
};

const Hint = ({text, hint, showHint, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log("id", id)
  return (
    // <LinkOverlay href={text ? `/grammar-module/${id}` : null} target={text ? "_blank" : null}
    //     minW={{ base: "60%", lg: "50%" }}
    // >
    <Flex
      onClick={text ? onOpen : null}
      justify="center"
      align="center"
      flexDirection="column"
      border="3px solid #04C417"
      boxSizing="border-box"
      borderRadius="5px"
      m={4}
      color="#04C417"
      p={2}
      display={showHint && hint ? "flex" : "none"}
      position="relative"
      textAlign="center"
      cursor="pointer"
      _hover={{ color: "#00B9F5" }}
    >
      <Icon
        name="info-circle-outlined"
        color="white"
        as={Iconify}
        icon="ant-design:info-circle-outlined"
        sx={{ position: "absolute", top: "5%", right: "5%" }}
      />
      <Text m={6} fontSize="xl" fontWeight="bold">
        {hint?.toUpperCase()}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
      <GrammarModule moduleId={id}/>
      </Modal>
    </Flex>
    // </LinkOverlay>
  );
};

export { GrammarGeekGame, Answers, Hint };
export default ContainedGrammarGeekGame;
