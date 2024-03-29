import React, { useState, useEffect } from "react";
import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { MobileGameHeader, DesktopGameHeader } from "../Header";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import { isPremium } from "../../helpers/premium";
import HourGlassIcon from "../../ui/icons/HourGlassIcon";
import { CoinCurrencyNoUser, MedalCurrency } from "../Currency";
import Button from "../../ui/Button";
import Link from "../../ui/Link";
import { useUserContext } from "../../context/user";
import { isCurrentWeek } from "./helpers";
import Confetti from "../animations/Confetti";
import useSound from "../../hooks/useSound";
import { GAME_TYPES } from "../../constants";
import Info from "./Info";

const GET_TIMER = gql`
  query GetTimer($gameName: GameName!) {
    games(where: { name: $gameName }, options: { limit: 1 }) {
      gameId
      timer
      name
    }
  }
`;

const GET_TOP_RANKING_AND_REWARDS = gql`
  query GetTopRankingAndRewards {
    rankingUsers(limit: 3) {
      userId
    }
    avatarCollections(where: { name_CONTAINS: "MONSTARS" }) {
      avatarCollectionId
      avatars {
        picture
      }
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

const UPDATE_POINTS = gql`
  mutation UpdatePoints($points: Int) {
    updatePoints(points: $points) {
      points
      lastRankingDate
    }
  }
`;

const GameContainer = ({
  game,
  gameState,
  setGameState,
  children,
  onTimeOut = () => {},
  stopTimer = false,
  knowlympics = false,
  ...props
}) => {
  const [currentUser, setCurrentUser, { refetch }] = useUserContext();
  const [initialUserStarPercentage, setInitialUserStarPercentage] = useState(null);
  const [timer, setTimer] = useState(data?.games[0]?.timer || 120);

  const router = useRouter();

  const timerInterval = React.useRef(null);
  const container = React.useRef(null);

  const { data } = useQuery(GET_TIMER, {
    ...basicQueryResultSupport,
    variables: { gameName: knowlympics ? GAME_TYPES.KNOWLYMPICS.name : game.name },
  });
  const [UpdateUser] = useMutation(UPDATE_USER, {
    onCompleted(data) {
      if (refetch) {
        refetch();
        setCurrentUser({ ...data.updateCurrentUser, ...currentUser });
      }
    },
    ...basicQueryResultSupport,
  });
  const [UpdatePoints] = useMutation(UPDATE_POINTS, {
    onCompleted(data) {},
    ...basicQueryResultSupport,
  });

  const tick = () => {
    setTimer((timer) => {
      if (timer - 0.1 <= 0.1) {
        return 0;
      }
      return timer - 0.1;
    });
  };

  useEffect(() => {
    // leaving game
    const handleRouteChange = () => {
      if (timer > 0) {
        setCurrentUser({ ...currentUser, starPercentage: initialUserStarPercentage });
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [initialUserStarPercentage, timer]);

  useEffect(() => {
    if (initialUserStarPercentage === null) {
      setInitialUserStarPercentage(currentUser?.starPercentage || null);
    }
  }, [currentUser]);

  useEffect(() => {
    setTimer(data?.games[0]?.timer || 120);
  }, [data]);

  useEffect(() => {
    // start And pause timer
    if (stopTimer) {
      // stop timer and scroll to bottom (for small screens)
      if (container.current) {
        window.scrollTo(0, document.body.scrollHeight);

        // console.log("container.current.scrollHeight", container.current.scrollHeight)
        // container.current.scrollIntoView({
        //   top: document.body.scrollHeigh,
        //   behavior: "smooth",
        // });
      }
      clearInterval(timerInterval.current);
    } else {
      timerInterval.current = setInterval(() => {
        tick();
      }, 100);
    }
    return () => {
      clearInterval(timerInterval.current);
    };
  }, [stopTimer, container]);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(timerInterval.current);
      // end of time
      if (!currentUser?.online) {
        // user is offline
        return;
      }
      const variables = {};
      if (gameState.points > 0) {
        let points = 0;
        if (
          !currentUser?.lastRankingDate ||
          !isCurrentWeek(new Date(currentUser?.lastRankingDate))
        ) {
          // not current week start points from 0
          points = gameState.points;
        } else {
          // current week, continue to add points
          points = currentUser?.points + gameState.points;
        }
        variables = { points, lastRankingDate: new Date(), ...variables };
        UpdatePoints({ variables });
      }

      const stars = knowlympics ? -1 : gameState.stars;
      if (isPremium(currentUser)) {
        // premium user : we add 10% coins
        gameState.coins = Math.floor(gameState.coins * 1.1);
      }

      variables = {
        coins: currentUser.coins + gameState.coins,
        stars: currentUser.stars + stars,
        starPercentage: (initialUserStarPercentage + gameState.starPercentage) % 100,
      };
      UpdateUser({
        variables,
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
    setGameState({ ...gameState, stars: parseInt(tmpStarPercentage / 100) });
  }, [initialUserStarPercentage, gameState.starPercentage]);
  return timer > 0 ? (
    <Box refs={container} pt={{base:"10vh", lg:"auto"}}>
      <MobileGameHeader maxTime={data?.games[0]?.timer} timer={timer} />
      <DesktopGameHeader maxTime={data?.games[0]?.timer} timer={timer} />
      <Flex
        mt={{ base:"10vh", lg:"6vh" }} 
        direction="column" 
        {...props}
      >
        {knowlympics && (
          <Box pt={{ lg:"2rem" }} pl={{ lg:"2rem" }}>
            <Text m={3} fontSize="md" fontWeight="md">
              Knowlympic Medals
            </Text>
            <MedalCurrency quantity={gameState.points || 0}/>
          </Box>
        )}
        <GameTitle game={game} knowlympics={knowlympics} />
        {children}
      </Flex>
    </Box>
  ) : (
    <EndingScreen knowlympics={knowlympics} gameState={gameState} />
  );
};

const GameTitle = ({ game, knowlympics = false }) => {
  return (
    <Flex justifyContent="center" alignItems={{ base: "end", lg: "center" }} mb={3}>
      <GameImage game={game} />
      <Text fontSize={{ base: "xl", sm: "2xl", lg: "5xl" }} fontWeight="500">
        {game.label}
      </Text>
      <Info id={knowlympics ? "knowlympics" : game?.id} />
      <GameImage right game={game} />
    </Flex>
  );
};

const GameImage = ({ game, right = false, ...props }) => {
  return game.image ? (
    <Image
      src={right && game.right ? game.right : game.image}
      alt={game.label}
      h="auto"
      display="table"
      w={right ? { base: "70px", lg: "120px" } : { base: "70px", lg: "120px" }}
      mb={{ base: "0px", lg: "-30px" }}
      mx={2}
      transform={right && !game.right ? "scaleX(-1)" : "scaleX(1)"}
      {...props}
    />
  ) : null;
};

const EndingScreen = ({
  onRestart = () => {},
  gameState = { points: 0, starPercentage: 0, coins: 0 },
  knowlympics = false,
}) => {
  const [currentUser, , { refetch }] = useUserContext();
  const { coins, points, starPercentage } = gameState;
  const [randomGigil, setRandomGigil] = useState("AntonymHuntMonster.png");
  const [play] = useSound("/sounds/endgame.mp3");
  const gigils = [
    "Amazing.png",
    "Awesome.png",
    "GoodJob.png",
    "KeepItUp.png",
    "VeryGood.png",
    "WellDone.png",
  ];

  useEffect(() => {
    setRandomGigil(gigils[Math.floor(Math.random() * gigils.length)]);
  }, []);
  useEffect(() => {
    play();
  }, [play]);
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Flex
        position={{ base: "absolute", lg: "initial" }}
        top="5"
        justifyContent="center"
        alignItems={{ base: "end", lg: "center" }}
      >
        <Text fontSize={{ base: "4xl", lg: "70px" }} fontWeight="500">
          Time's up!
        </Text>
        <HourGlassIcon boxSize={{ base: "10", lg: "20" }} />
      </Flex>
      <Image src={`/images/timesup/${randomGigil}`} alt={randomGigil} w="auto" maxH="200px" />
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w={{ base: "100%", lg: "40%" }}
      >
        {/* <Text>Watch this ad for 10% more coins</Text> */}
        {knowlympics && (
          <PointDisplayer label="Knowlympic Medals">
            <Text fontSize="md">{points}</Text>
          </PointDisplayer>
        )}
        {currentUser.online ? (
          <>
            {!knowlympics && (
              <PointDisplayer label="Star Bar points">
                <Text color="yellowStar" fontSize="md">
                  +{starPercentage}
                </Text>
              </PointDisplayer>
            )}
            <PointDisplayer label="Coins earned">
              <CoinCurrencyNoUser quantity={coins} fontSize="md" />
            </PointDisplayer>
          </>
        ) : (
          <Text m={3} fontSize="lg" align="center">
            You are not logged in, if you want to get stars and coins at the end of a game you need
            to <Link href="/login">Login</Link> or <Link href="/signup">Sign up</Link>
          </Text>
        )}
        <Button w="70%" bg="green" href="/">
          Continue
        </Button>
      </Flex>
      <Confetti />
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

const NextButton = ({ onNext, children, ...props }) => {
  return (
    <Button bg="green" onClick={onNext} w="100%" my={3} {...props}>
      {children}
    </Button>
  );
};

export { NextButton };
export default GameContainer;
