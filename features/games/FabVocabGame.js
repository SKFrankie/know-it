import React, { useState, useEffect } from "react";
import Button from "../../ui/Button";
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
  const [wordTries, setWordTries] = useState(null);
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

  useEffect(() => {
    // get as much tries as correct answers
    if (wordTries == null) {
      setWordTries(
        Object.keys(
          Object.fromEntries(Object.entries(words).filter(([key, { correct }]) => correct))
        ).length
      );
    }
    if (sentenceTries == null) {
      setSentenceTries(
        Object.keys(
          Object.fromEntries(Object.entries(sentences).filter(([key, { correct }]) => correct))
        ).length
      );
    }
  }, [words, sentences])

  const { data, error, loading, refetch } = useQuery(RANDOM_FAB_VOCAB, {
    onCompleted: (res) => {
      const { randomFabVocab } = res;
      console.log("res", res);
    },
    ...basicQueryResultSupport,
  });
  return (
    <GameContainer game={game} gameState={gameState} setGameState={setGameState}>
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
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            my={2}
          />
          {/* GOOGLE AD */}
          <Flex fontSize="sm" fontWeight={500} direction="column" alignItems="center">
          {wordTries === 0 && sentenceTries === 0 ? <NextButton display={{base: "flex", md: "none"}} /> : null}
            <Text fontWeight={400}>What do you see in the picture ?</Text>
            <Text fontSize="xs" fontWeight={400}>
              {wordTries} words left to find
            </Text>
            <Words words={words} setWords={setWords} tries={wordTries} setTries={setWordTries} />
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
            />
          {wordTries === 0 && sentenceTries === 0 ? <NextButton /> : null}
          </Flex>
        </Flex>
      )}
      {error && <Error />}
      {loading && <Loading />}
    </GameContainer>
  );
};


const NextButton = ({...props}) => {
  return <Button w="100%" my={3} {...props}>Next picture</Button>;
};

const Words = ({ words, setWords, tries, setTries, numbered = false, ...props }) => {
  // we get as much tries as correct answers
  const handleClick = (word) => {
    console.log("word", tries);
    if (tries > 1) {
      setTries(tries - 1);
    setWords({ ...words, [word]: { ...words[word], active: true, clicked: true } });
      if (words[word].correct) {
        // word correct
      }
      // word incorrect
      return;
    }
    // no more tries
    setTries(0);
    const tmpWordObject = words;
    Object.keys(tmpWordObject).map(function (key) {
      tmpWordObject[key].active = true;
    });
    setWords({ ...tmpWordObject, [word]: { ...words[word], active: true, clicked: true } });
  };

  const isActive = (word) => {
    return words[word].active;
  };

  const isCorrect = (word) => {
    return words[word]?.correct;
  };

  const isClicked = (word) => {
    return words[word]?.clicked;
  };

  return (
    <Flex my={3} flexWrap="wrap" justify="center" w="90%" {...props}>
      {Object.keys(words).map((word, index) => {
        return (
          <Text
            color={isActive(word) ? (isCorrect(word) ? "#07E503" : "#A80909") : "white"}
            textDecoration={
              !isClicked(word) && isActive(word) ? (isCorrect(word) ? "underline" : "line-through") : "none"
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

export default FabVocabGame;
