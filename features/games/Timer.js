import React from "react";
import { Flex, Text, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const Timer = ({ maxTime, timer, ...props }) => {
  return (
    <CircularProgress
      value={(timer / maxTime) * 100}
      size={{ base: "4rem", lg: "5rem" }}
      justify="center"
      alignItems="center"
      minW="50px"
      w="auto"
      display="table"
      h="50px"
      trackColor="transparent"
      color="deepDarkBlue"
      borderRadius="50%"
      m={2}
      {...props}
    >
      <CircularProgressLabel>{parseInt(timer)}</CircularProgressLabel>
    </CircularProgress>
  );
};

export default Timer;
