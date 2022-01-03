import React, { useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import shuffleArray from "../../helpers/shuffleArray";

const MatchingWords = ({
  matchingWords = { word: "matching", word2: "matchingWord2", word3: "matchinWord3" },
}) => {
  const ColorArray = [
    "#FF8C00",
    "#D40000",
    "#FFD700",
    "#00B300",
    "#00FF00",
    "#00A5DB",
    "#BD00FF",
    "#FF00FF",
    "#0000FF",
  ];

  const [wordsObject, setWordsObject] = useState(
    Object.assign(
      {},
      ...Object.keys(matchingWords).map((word) => ({ [word]: { color: null, active: false } })),
      ...Object.values(matchingWords).map((word) => ({ [word]: { color: null, active: false } }))
    )
  );
  const [currentColor, setCurrentColor] = useState(0);
  const [word1, setWord1] = useState(null);

const onActive = (word) => {
  const tmpObj = {};
  for (const [key, value] of Object.entries(wordsObject)) {
    tmpObj = { ...tmpObj, [key]: { ...value, active: false } };
  }
  setWordsObject({ ...tmpObj, [word]: { ...wordsObject[word], active: true } });
}
  const onWord1Click = (word) => {
    onActive(word);
    setWord1(word);
  };
  const onWord2Click = (word) => {
    if (word1) {
      if(matchingWords[word1] === word) {
        console.log("match!");
        const color = ColorArray[currentColor];
        setWordsObject({ ...wordsObject, [word1]: { color }, [word]: { color } });
        setCurrentColor(currentColor + 1);
        return
      }
      console.log("no match!");
      // setCurrentColor((currentColor) => (currentColor + 1) % ColorArray.length);
    }
  };

  return (
    <Flex direction={{ base: "row", md: "column" }} justify="space-around" my={3}>
      <WordColumn wordsObject={wordsObject} words={Object.keys(matchingWords)} color={ColorArray[currentColor]} onWordClick={onWord1Click} />
      <WordColumn wordsObject={wordsObject} words={Object.values(matchingWords)} color={ColorArray[currentColor]} onWordClick={onWord2Click} />
    </Flex>
  );
};

const WordColumn = ({ words, color, onWordClick, wordsObject }) => {
  const [shuffleWords, setShuffleWords] = useState(shuffleArray(words));
  return (
    <Flex justify="center" align="center" direction={{ base: "column", md: "row" }}>
      {shuffleWords.map((word) => (
        <Word active={wordsObject[word]?.active} finalColor={wordsObject[word]?.color} key={word} word={word} color={color} onWordClick={onWordClick} />
      ))}
    </Flex>
  );
};

const Word = ({ word, color="green", onWordClick, finalColor, active }) => {
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
