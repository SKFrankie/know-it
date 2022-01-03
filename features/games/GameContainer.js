import React, {useState, useEffect} from 'react'
import {Flex, Box, Image, Text} from '@chakra-ui/react'
import { useQuery, useMutation, gql } from "@apollo/client";
import { MobileGameHeader, DesktopGameHeader } from "../Header";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";

const GET_TIMER = gql`
  query GetTimer($gameName: GameName!) {
    games(where: { name: $gameName }, options: { limit: 1 }) {
      gameId
      timer
      name
    }
  }
`;

const GameContainer = ({ game, children }) => {
  const { data } = useQuery(GET_TIMER, {
    ...basicQueryResultSupport,
    variables: { gameName: game.name },
  });
  const [timer, setTimer] = useState(data?.games[0]?.timer || 120);
  const timerInterval = React.useRef(null);

  useEffect(() => {
    setTimer(data?.games[0]?.timer || 120);
    timerInterval.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => clearInterval(timerInterval.current);
  }, [data]);

  useEffect(() => {
    if(timer <= 0) {
      clearInterval(timerInterval.current);
      console.log("the end!")
    }
  }, [timer]);
  return (
    <Box>
      <MobileGameHeader timer={timer} />
      <DesktopGameHeader timer={timer} />
      <Box h={{ base: "0vh", md: "5vh" }} />
      <Flex direction="column">
        <GameTitle game={game} />
        {children}
      </Flex>
    </Box>
  );
};

const GameTitle = ({ game }) => {
  return (
    <Flex justifyContent="center" alignItems={{ base: "end", md: "center" }}>
      <GameImage game={game} />
      <Text fontSize={{ base: "lg", md: "5xl" }} fontWeight="500">
        {game.label}
      </Text>
      <GameImage game={game} maxH={{ base: "60px", md: "80px" }} />
    </Flex>
  );
}

const GameImage = ({ game, ...props }) => {
  return (
    game.image && (
      <Image
        src={game.image}
        alt={game.label}
        w="fit-content"
        maxH={{ base: "50px", md: "70px" }}
        marginBottom={{ base: "-10px", md: "-30px" }}
        {...props}
      />
    )
  );
  }

export default GameContainer;
