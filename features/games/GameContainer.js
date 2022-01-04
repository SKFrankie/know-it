import React, { useState, useEffect } from "react";
import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { MobileGameHeader, DesktopGameHeader } from "../Header";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import HourGlassIcon from "../../ui/icons/HourGlassIcon";
import { CoinCurrencyNoUser } from "../Currency";
import Button from "../../ui/Button";
import { useUserContext } from "../../context/user";

const GET_TIMER = gql`
  query GetTimer($gameName: GameName!) {
    games(where: { name: $gameName }, options: { limit: 1 }) {
      gameId
      timer
      name
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($coins: Int, $stars: Int, $starPercentage: Int) {
    updateCurrentUser(coins: $coins, stars: $stars, starPercentage: $starPercentage) {
      coins
      stars
      starPercentage
    }
  }
`;

const GameContainer = ({ game, gameState, setGameState, children, onTimeOut = () => {} }) => {
  const [currentUser, setCurrentUser] = useUserContext();
  const [initialUserStarPercentage, setInitialUserStarPercentage ]= useState(null);
  const { data } = useQuery(GET_TIMER, {
    ...basicQueryResultSupport,
    variables: { gameName: game.name },
  });
  const [UpdateUser] = useMutation(UPDATE_USER, {onCompleted(data) {
    setCurrentUser({...currentUser, ...data.updateCurrentUser});
  },...basicQueryResultSupport});
  const [timer, setTimer] = useState(data?.games[0]?.timer || 120);
  const timerInterval = React.useRef(null);

  useEffect(() => {
    if(initialUserStarPercentage === null) {
      setInitialUserStarPercentage(currentUser?.starPercentage || null);
    }
  }, [currentUser]);

  useEffect(() => {
    setTimer(data?.games[0]?.timer || 120);
    timerInterval.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => clearInterval(timerInterval.current);
  }, [data]);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(timerInterval.current);
      // end of time
      UpdateUser({
        variables: {
          coins: currentUser.coins + gameState.coins,
          stars: currentUser.stars + gameState.stars,
          starPercentage: (initialUserStarPercentage + gameState.starPercentage) % 100,
        },
      });
      onTimeOut();
    }
  }, [timer]);
  useEffect(() => {
    // to see starbar grow in game
    const tmpStarPercentage = initialUserStarPercentage + gameState.starPercentage;
    setCurrentUser({
      ...currentUser,
      starPercentage: tmpStarPercentage % 100,
    });
    setGameState({ ...gameState, stars: parseInt(tmpStarPercentage / 100)});
  }, [gameState.starPercentage]);
  return timer > 0 ? (
    <Box>
      <MobileGameHeader timer={timer} />
      <DesktopGameHeader timer={timer} />
      <Box h={{ base: "0vh", md: "5vh" }} />
      <Flex direction="column">
        <GameTitle game={game} />
        {children}
      </Flex>
    </Box>
  ) : (
    <EndingScreen gameState={gameState} />
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
};

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
};

const EndingScreen = ({
  onRestart = () => {},
  gameState = { points: 0, starPercentage: 0, coins: 0 },
}) => {
  const { coins, points, starPercentage } = gameState;
  const [randomGigil, setRandomGigil] = useState("AntonymHuntMonster.png");
  const gigils = [
    "AntonymHuntMonster.png",
    "FabVocabMonster.png",
    "coming-soon-monster.png",
    "SynonymRollMonster.png",
    "GrammarGeekMonster.png",
  ];
  useEffect(() => {
    setRandomGigil(gigils[Math.floor(Math.random() * gigils.length)]);
  }, []);
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Flex
        position={{ base: "absolute", md: "initial" }}
        top="5"
        justifyContent="center"
        alignItems={{ base: "end", md: "center" }}
      >
        <Text fontSize={{ base: "4xl", md: "70px" }} fontWeight="500">
          Time's up!
        </Text>
        <HourGlassIcon boxSize={{ base: "10", md: "20" }} />
      </Flex>
      <Image src={`/images/${randomGigil}`} alt={randomGigil} w="fit-content" maxH="150" />
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w={{ base: "100%", md: "40%" }}
      >
        {/* <Text>Watch this ad for 10% more coins</Text> */}
        <PointDisplayer label="Points earned">
          <Text fontSize="md">{points}</Text>
        </PointDisplayer>
        <PointDisplayer label="Starbar">
          <Text color="yellowStar" fontSize="md">
            +{starPercentage}%
          </Text>
        </PointDisplayer>
        <PointDisplayer label="Coins won">
          <CoinCurrencyNoUser quantity={coins} fontSize="md" />
        </PointDisplayer>
        <Button w="70%" bg="#A80909" href="/">
          Continue
        </Button>
      </Flex>
    </Flex>
  );
};

const PointDisplayer = ({ label, children }) => {
  return (
    <Flex
      bg="deepDarkBlue"
      w="100%"
      borderRadius="15px"
      p={3}
      alignItems="space-between"
      placeContent="space-between"
      my={5}
    >
      <Text fontSize="md">{label}</Text>
      {children}
    </Flex>
  );
};

export default GameContainer;
