import React, { useState, useEffect } from "react";
import GameContainer from "./GameContainer";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import Error from "../Error";
import Loading from "../Loading";
import { GAME_TYPES } from "../../constants.js";

const FabVocabGame = () => {
  const game = GAME_TYPES.FAB_VOCAB;
  const [gameState, setGameState] = useState({points:0, starPercentage:0, coins:0, stars:0});
  return (
    <GameContainer game={game} gameState={gameState} setGameState={setGameState}>
      
    </GameContainer>
  )
}

export default FabVocabGame
