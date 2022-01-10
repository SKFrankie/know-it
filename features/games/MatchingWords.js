import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
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
}) => {
  const [wordsObject, setWordsObject] = useState({});
  const [currentColor, setCurrentColor] = useState(0);
  const [word1, setWord1] = useState(null);
  const [goodAnswers, setGoodAnswers] = useState(0);

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
  const onWord1Click = (word) => {
    onActive(word);
    setWord1(word);
  };
  const onWord2Click = (word) => {
    if (word1) {
      if (matchingWords[word1] === word) {
        // words matched
        const tmpGameState = {
          ...gameState,
          starPercentage: gameState.starPercentage + POINTS.SMALL,
          points: gameState.points + POINTS.SMALL,
          coins: gameState.coins + POINTS.SMALL,
        };
        if (goodAnswers + 1 === Object.keys(matchingWords).length) {
          // all completed
          tmpGameState = {
            ...tmpGameState,
            starPercentage: gameState.starPercentage + POINTS.SMALL,
            coins: gameState.coins + POINTS.BIG,
            points: gameState.points + POINTS.SMALL,
          };
          // game state is updated here too because there's a return
          setGameState(tmpGameState);
          handleComplete();
          return;
        }
        setGoodAnswers(goodAnswers + 1);
        const color = colorArray[currentColor];
        setWordsObject({ ...wordsObject, [word1]: { color }, [word]: { color } });
        setCurrentColor(currentColor + 1);
        setGameState(tmpGameState);
        return;
      }
      // words did not match
    }
  };

  const handleComplete = () => {
    setWordsObject({});
    setCurrentColor(0);
    setWord1(null);
    setGoodAnswers(0);
    onComplete();
  };

  return (
    <Flex direction={{ base: "row", md: "column" }} justify="space-around" my={3}>
      <Box h="10vh" display={{ base: "none", md: "block" }} />
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
        _hover={{ background: finalColor ? finalColor : color }}
        bg={finalColor ? finalColor : active ? color : "transparent"}
        fontWeight="bold"
        fontSize="md"
        disabled={finalColor}
      >
        {word}
      </Button>
    </Flex>
  );
};

export default MatchingWords;
