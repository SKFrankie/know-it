import React from "react";
import { Flex, Text, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const Timer = ({ maxTime, timer, ...props }) => {
  console.log("timer", timer);
  console.log("maxTime", maxTime);
  console.log("calcul", (timer / maxTime) * 100);
  return (
    <CircularProgress
      value={(timer / maxTime) * 100}
      size="50px"
      color="blueClear.500"
      justify="center"
      alignItems="center"
      minW="50px"
      w="fit-content"
      h="50px"
      trackColor="transparent"
      color="deepDarkBlue"
      bg="blueClear.500"
      borderRadius="50%"
      thickness="15px"
      m={2}
      {...props}
    >
      <CircularProgressLabel>{timer}</CircularProgressLabel>
    </CircularProgress>
  );
};

export default Timer;
