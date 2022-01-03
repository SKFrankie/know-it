import React, {useState, useEffect} from 'react'
import {Flex} from '@chakra-ui/react'
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
    <Flex>
      <MobileGameHeader timer={timer} />
      <DesktopGameHeader timer={timer} />
      {children}
    </Flex>
  );
};

export default GameContainer;
