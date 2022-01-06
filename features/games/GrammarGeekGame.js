import React, { useState, useEffect } from "react";
import { Text, Image, Flex, Box } from "@chakra-ui/react";
import { useQuery, useMutation, gql } from "@apollo/client";
import GameContainer, {NextButton} from "./GameContainer";
import { GAME_TYPES, POINTS } from "../../constants.js";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import shuffleArray from "../../helpers/shuffleArray";
import Error from "../Error";
import Loading from "../Loading";
import Button from "../../ui/Button";
import InfoIcon from "../../ui/icons/InfoIcon";

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

  const [currentQuestion, setCurrentQuestion] = useState(0);
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

  const [answerArray, setAnswerArray] = useState([]);


  const handleAnswerClick = (isCorrect) => {
    console.log("state", gameState)
    if (isCorrect) {
      setGameState((prevState) => ({
        ...prevState,
        starPercentage: gameState.starPercentage + POINTS.SMALL,
        points: gameState.points + POINTS.SMALL,
        coins: gameState.coins + POINTS.SMALL,
      }));
    }
    setShowHint(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < data.randomGrammarGeek.length) {
      setCurrentQuestion(currentQuestion + 1);
      handleNewQuestion(data.randomGrammarGeek[currentQuestion + 1]);
    } else {
      refetch();
    }
  }

  const handleNewQuestion = (question) => {
    const tmpAnswers = {};

    // set answers
    question.wrongWords.forEach((word) => {
      tmpAnswers[word] = { correct: false };
    });
    tmpAnswers[question.correctWord] = { correct: true };
    setAnswers(tmpAnswers);

    setQuestion(question.sentence);
    setHint(question.hint);
    setShowHint(false)

    setAnswerArray(shuffleArray(Object.keys(tmpAnswers)));
  };

  const { data, error, loading, refetch } = useQuery(RANDOM_GRAMMAR_GEEK, {
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
    <GameContainer game={game} gameState={gameState} setGameState={setGameState} align="center">
      <Flex justify="center" align="center" flexDirection="column" m={2} w="100%">
        {showHint && (
          <NextButton
            onNext={handleNextQuestion}
            display={{ base: "flex", md: "none" }}
            onNext={handleNextQuestion}
          >
            Next Question
          </NextButton>
        )}
        <Question question={question} />
        <Answers
          answers={answers}
          setAnswers={setAnswers}
          answerArray={answerArray}
          onAnswerClick={handleAnswerClick}
        />
        <Hint hint={hint} showHint={showHint} />
        {showHint && <NextButton w={{base: "100%", md: "50%"}} onNext={handleNextQuestion}>Next Question</NextButton>}
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
    setAnswers({answers, ... tmpAnswerObject});
    onAnswerClick(isCorrect(answer));
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
      {answerArray.map((answer, index) => {
        return (
          <Button
            disabled={isActive(answer) || isDisabled(answer)}
            bg={isActive(answer) ? (isCorrect(answer) ? "#04C417" : "red") : "#88A8B3"}
            _hover={{ bg: isActive(answer) ? (isCorrect(answer) ? "#04C417" : "red") : "#88A8D1" }}
            key={answer}
            answer={answer}
            minW="fit-content"
            w={{ base: "100%", md: "20%" }}
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
      display={showHint && hint ? "flex" : "none"}
      position="relative"
    >
    <InfoIcon position="absolute" left="1" top="1" color="white" boxSize="5" />
      <Text m={6} fontSize="xl" fontWeight="bold">
        {hint}
      </Text>
    </Flex>
  );
};

export default GrammarGeekGame;
