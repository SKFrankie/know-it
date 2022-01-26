import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Box, useToast } from "@chakra-ui/react";
import shuffleArray from "../../helpers/shuffleArray";
import { POINTS } from "../../constants";

const MatchingWords = ({
  matchingWords = null,
  onComplete,
  gameState,
  setGameState,
  colorArray = [
    "#FF8C00",
    "#D40000",
    "#FFD700",
    "#00B300",
    "#00FF00",
    "#00A5DB",
    "#BD00FF",
    "#FF00FF",
    "#0000FF",
  ],
  knowlympics = false,
}) => {
  const [wordsObject, setWordsObject] = useState({});
  const [currentColor, setCurrentColor] = useState(0);
  const [word1, setWord1] = useState(null);
  const [word2, setWord2] = useState(null);
  const [goodAnswers, setGoodAnswers] = useState(0);

  const toast = useToast();

  useEffect(() => {
    if (matchingWords) {
      setWordsObject(
        Object.assign(
          {},
          ...Object.keys(matchingWords).map((word) => ({ [word]: { color: null, active: false } })),
          ...Object.values(matchingWords).map((word) => ({
            [word]: { color: null, active: false },
          }))
        )
      );
    }
  }, [matchingWords]);

  const onActive = (word) => {
    const tmpObj = {};
    for (const [key, value] of Object.entries(wordsObject)) {
      tmpObj = { ...tmpObj, [key]: { ...value, active: false } };
    }
    setWordsObject({ ...tmpObj, [word]: { ...wordsObject[word], active: true } });
  };

  const resetWords = (obj) => {
    setWord1(null);
    setWord2(null);
    const tmpObj = {};
    for (const [key, value] of Object.entries(obj || wordsObject)) {
      tmpObj = { ...tmpObj, [key]: { ...value, active: false } };
    }
    setWordsObject({ ...tmpObj });
  };

  const wordsMatch = (word1, word2) => {
    if (word1 && word2) {
      if (matchingWords[word1] === word2) {
        // words matched
        const tmpGameState = {
          ...gameState,
          starPercentage: knowlympics ? 0 : gameState.starPercentage + POINTS.SMALL,
          points: knowlympics ? gameState.points + POINTS.SMALL : 0,
          coins: gameState.coins + POINTS.SMALL,
        };
        if (goodAnswers + 1 === Object.keys(matchingWords).length) {
          // all completed
          tmpGameState = {
            ...tmpGameState,
            starPercentage: knowlympics ? 0 : gameState.starPercentage + POINTS.SMALL,
            points: knowlympics ? gameState.points + POINTS.SMALL : 0,
            coins: gameState.coins + POINTS.SMALL,
          };
          // game state is updated here too because there's a return
          setGameState(tmpGameState);
          handleComplete();
          return;
        }
        setGoodAnswers(goodAnswers + 1);
        const color = colorArray[currentColor];
        const tmpObj = { ...wordsObject, [word1]: { color }, [word2]: { color } };
        setWordsObject(tmpObj);
        setCurrentColor(currentColor + 1);
        setGameState(tmpGameState);
        resetWords(tmpObj);
        return;
      }
      // words did not match
      toast({
        title: "Words don't match",
        status: "error",
        duration: 1000,
      });
      resetWords();
    }
  };

  const onWord1Click = (word) => {
    if (!word2) {
      onActive(word);
    }
    setWord1(word);
    wordsMatch(word, word2);
  };
  const onWord2Click = (word) => {
    if (!word1) {
      onActive(word);
    }
    setWord2(word);
    wordsMatch(word1, word);
  };

  const handleComplete = () => {
    setWordsObject({});
    resetWords();
    setGoodAnswers(0);
    setCurrentColor(0);
    onComplete();
  };

  return (
    <Flex
      direction={{ base: "row", md: "column" }}
      justify="space-around"
      my={3}
      mt={{ base: "5vh", md: "15vh" }}
    >
      <WordColumn
        wordsObject={wordsObject}
        matchingWords={matchingWords}
        color={colorArray[currentColor]}
        onWordClick={onWord1Click}
        variant="left"
      />
      <WordColumn
        wordsObject={wordsObject}
        matchingWords={matchingWords}
        color={colorArray[currentColor]}
        onWordClick={onWord2Click}
        variant="right"
      />
    </Flex>
  );
};

const WordColumn = ({ matchingWords, color, onWordClick, wordsObject, variant = "left" }) => {
  const [shuffleWords, setShuffleWords] = useState([]);
  useEffect(() => {
    if (variant === "left") {
      setShuffleWords(shuffleArray(Object.keys(matchingWords)));
    } else {
      setShuffleWords(shuffleArray(Object.values(matchingWords)));
    }
  }, [matchingWords]);

  return (
    <Flex justify="center" align="center" direction={{ base: "column", md: "row" }}>
      {shuffleWords.map((word) => (
        <Word
          active={wordsObject[word]?.active}
          finalColor={wordsObject[word]?.color}
          key={word}
          word={word}
          color={color}
          onWordClick={onWordClick}
        />
      ))}
    </Flex>
  );
};

const Word = ({ word, color = "green", onWordClick, finalColor, active }) => {
  const handleClick = () => {
    onWordClick(word);
  };

  return (
    <Flex justify="center" align="center" direction="column" m={2}>
      <Button
        onClick={handleClick}
        border="1px solid"
        _hover={{ background: finalColor ? finalColor : active ? color : "transparent" }}
        bg={finalColor ? finalColor : active ? color : "transparent"}
        fontWeight="bold"
        fontSize={{ base: "md", md: "xl" }}
        minW={{ base: "30vw", md: "8vw" }}
        disabled={finalColor}
      >
        {word}
      </Button>
    </Flex>
  );
};

export default MatchingWords;
