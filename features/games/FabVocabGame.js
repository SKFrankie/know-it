import React, { useState, useEffect } from "react";
import Button from "../../ui/Button";
import { Image, Flex, Text, Divider } from "@chakra-ui/react";
import GameContainer, { NextButton } from "./GameContainer";
import { useQuery, gql } from "@apollo/client";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import Error from "../Error";
import Loading from "../Loading";
import { GAME_TYPES, POINTS } from "../../constants";
import shuffleArray from "../../helpers/shuffleArray";

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

const ContainedFabVocabGame = () => {
  const game = GAME_TYPES.FAB_VOCAB;
  const [gameState, setGameState] = useState({ points: 0, starPercentage: 0, coins: 0, stars: 0 });
  const [stopTimer, setStopTimer] = useState(false);
  return (
    <GameContainer
      game={game}
      gameState={gameState}
      setGameState={setGameState}
      stopTimer={stopTimer}
    >
      <FabVocabGame gameState={gameState} setGameState={setGameState} setStopTimer={setStopTimer} />
    </GameContainer>
  );
};

const FabVocabGame = ({
  gameState,
  setGameState,
  setStopTimer,
  onNextGame = null,
  knowlympics = false,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [wordTries, setWordTries] = useState(null);
  const [picture, setPicture] = useState(
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  );
  const [sentenceTries, setSentenceTries] = useState(null);
  const [sentences, setSentences] = useState({
    "sentence what happens swith a logn senntenceone": { correct: false },
    "sentence two": { correct: true },
    "sentence three": { correct: false },
  });
  const [words, setWords] = useState({
    "word one": {
      correct: false,
    },
    "word two": {
      correct: true,
    },
    "word three": {
      correct: false,
    },
    "word four": {
      correct: true,
    },
  });
  const [wordArray, setWordArray] = useState([]);
  const [sentenceArray, setSentenceArray] = useState([]);

  useEffect(() => {
    // stop timer when no more tries left
    if (wordTries === 0 && sentenceTries === 0) {
      setStopTimer(true);
    }
  }, [wordTries, sentenceTries]);

  const handleTries = (words, sentences) => {
    // get as much tries as correct answers
    setWordTries(
      Object.keys(Object.fromEntries(Object.entries(words).filter(([key, { correct }]) => correct)))
        .length
    );
    setSentenceTries(
      Object.keys(
        Object.fromEntries(Object.entries(sentences).filter(([key, { correct }]) => correct))
      ).length
    );
  };

  const handleNewQuestion = (question) => {
    setPicture(question.picture);
    const tmpWords = {};
    const tmpSentences = {};

    // set words
    question.correctWords.forEach((word) => {
      tmpWords[word] = { correct: true };
    });
    question.wrongWords.forEach((word) => {
      tmpWords[word] = { correct: false };
    });

    // set sentences
    tmpSentences[question.correctSentence] = { correct: true };
    question.wrongSentences.forEach((sentence) => {
      tmpSentences[sentence] = { correct: false };
    });

    setWords(tmpWords);
    setSentences(tmpSentences);
    handleTries(tmpWords, tmpSentences);
    setWordArray(shuffleArray(Object.keys(tmpWords)));
    setSentenceArray(shuffleArray(Object.keys(tmpSentences)));
  };

  const handleNextQuestion = () => {
    setStopTimer(false);
    if (onNextGame) {
      onNextGame();
      return;
    }
    if (currentQuestion + 1 < data.randomFabVocab.length) {
      setCurrentQuestion(currentQuestion + 1);
      handleNewQuestion(data.randomFabVocab[currentQuestion + 1]);
    } else {
      refetch();
    }
  };

  const { data, error, loading, refetch } = useQuery(RANDOM_FAB_VOCAB, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      // loading new set of questions and setting first question
      const { randomFabVocab } = res;
      if (randomFabVocab.length === 0) {
        return;
      }
      const tmpCurrent = randomFabVocab[0];
      setCurrentQuestion(0);
      handleNewQuestion(tmpCurrent);
    },
    ...basicQueryResultSupport,
  });

  return (
    <>
      {data && (
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
            src={picture}
            my={2}
          />
          {/* GOOGLE AD */}
          <Flex fontSize={{base: "sm", md: "md"}} fontWeight={500} direction="column" alignItems="center">
            <Text fontWeight={400}>What do you see in the picture ?</Text>
            <Text fontSize="xs" fontWeight={500}>
              {wordTries} tries left
            </Text>
            <Words
              words={words}
              setWords={setWords}
              tries={wordTries}
              setTries={setWordTries}
              setGameState={setGameState}
              gameState={gameState}
              wordArray={wordArray}
              knowlympics={knowlympics}
            />
            <Divider />
            <Text my={2} fontWeight={400}>
              Which sentence best describes this picture?
            </Text>
            <Words
              words={sentences}
              setWords={setSentences}
              direction="column"
              tries={sentenceTries}
              setTries={setSentenceTries}
              numbered
              setGameState={setGameState}
              gameState={gameState}
              wordArray={sentenceArray}
              knowlympics={knowlympics}
            />
            {wordTries === 0 && sentenceTries === 0 ? (
              <NextButton onNext={handleNextQuestion}>Continue</NextButton>
            ) : null}
          </Flex>
        </Flex>
      )}
      {error && <Error />}
      {loading && <Loading />}
    </>
  );
};

const Words = ({
  words,
  setWords,
  tries,
  setTries,
  numbered = false,
  gameState,
  setGameState,
  wordArray,
  knowlympics = false,
  ...props
}) => {
  // we get as much tries as correct answers
  const [perfect, setPerfect] = useState(true);

  const handleClick = (word) => {
    const bonusPoints = tries === 1 && perfect ? POINTS.SMALL : 0; // if we have no wrong answers we get bonus points
    if (tries > 1) {
      setTries(tries - 1);
      setWords({ ...words, [word]: { ...words[word], active: true, clicked: true } });
    } else {
      setTries(0);
      const tmpWordObject = words;
      Object.keys(tmpWordObject).map(function (key) {
        tmpWordObject[key].active = true;
      });
      setWords({ ...tmpWordObject, [word]: { ...words[word], active: true, clicked: true } });
    }
    if (words[word]?.correct) {
      const tmpGameState = {
        ...gameState,
        starPercentage: knowlympics ? 0 : gameState.starPercentage + POINTS.SMALL + bonusPoints,
        points: knowlympics ? gameState.points + POINTS.SMALL + bonusPoints : 0,
        coins: gameState.coins + POINTS.SMALL + bonusPoints,
      };
      setGameState(tmpGameState);
      return;
    }
    // word incorrect
    setPerfect(false);
  };

  const isActive = (word) => {
    return words[word]?.active;
  };

  const isCorrect = (word) => {
    return words[word]?.correct;
  };

  const isClicked = (word) => {
    return words[word]?.clicked;
  };

  return (
    <Flex my={3} flexWrap="wrap" justify="center" w="90%" {...props}>
      {wordArray.map((word, index) => {
        return (
          <Text
            color={isActive(word) ? (isCorrect(word) ? "#07E503" : "#A80909") : "white"}
            textDecoration={
              !isClicked(word) && isActive(word)
                ? isCorrect(word)
                  ? "underline"
                  : "line-through"
                : "none"
            }
            cursor={tries > 0 && !isActive(word) ? "pointer" : "default"}
            onClick={isActive(word) ? null : () => handleClick(word)}
            fontSize="md"
            m={3}
            key={word}
          >
            {numbered && `${index + 1}. `}
            {word}
          </Text>
        );
      })}
    </Flex>
  );
};

export { FabVocabGame };
export default ContainedFabVocabGame;
