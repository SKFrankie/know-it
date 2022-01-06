import React, { useState, useEffect } from "react";
import GameContainer from "./GameContainer";
import { GAME_TYPES } from "../../constants.js";
import {redirect} from "../auth/helper";
import {useRouter} from "next/router";
import {useUserContext} from "../../context/user";

import {AntonymHuntGame} from "./AntonymHuntGame";
import {SynonymRollGame} from "./SynonymRollGame";

const KnowlympicsGame = () => {
  const game = GAME_TYPES.KNOWLYMPICS;
  const games = [GAME_TYPES.SYNONYM_ROLL, GAME_TYPES.ANTONYM_HUNT];
  const [currentUser] = useUserContext();
  const router = useRouter();
  // we initialize the game state to -1 so the user pays his one star at the end of the game
  const [gameState, setGameState] = useState({ points: 0, starPercentage: 0, coins: 0, stars: -1 });
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  useEffect(() => {
    if (!currentUser.stars === 0) {
      // redirect to home page if user has no stars to play the game
      console.log("user", currentUser);
      redirect(router, "/");
    }
  }, [currentUser.stars]);

  const handleNextGame = () => {
    if (currentGameIndex + 1 > games.length) {
      setCurrentGameIndex(0);
    } else {
      setCurrentGameIndex((currentGameIndex) => currentGameIndex + 1);
    }
  };

  const renderCurrentGame = () => {
    const currentGame = games[currentGameIndex];
    switch (currentGame) {
      case GAME_TYPES.ANTONYM_HUNT:
        return <AntonymHuntGame gameState={gameState} setGameState={setGameState} knowlympics onNextGame={handleNextGame} />;
      case GAME_TYPES.SYNONYM_ROLL:
        return <SynonymRollGame gameState={gameState} setGameState={setGameState} knowlympics onNextGame={handleNextGame}  />;
      default:
        return null;
    }
  };


  return (
    <GameContainer game={game} gameState={gameState} setGameState={setGameState}>
      {renderCurrentGame()}
    </GameContainer>
  );
};

export default KnowlympicsGame;
