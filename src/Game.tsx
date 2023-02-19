import React, { useState } from "react";
import Canvas from "./Canvas";
import { GameState } from "./Types";
import { createGame } from "./utils";

type Props = {};

export default function Game({}: Props) {
  const [game, setGame] = useState<GameState>();

  const resetGame = () => {
    const newGame = createGame(20);
    setGame(newGame);
    console.log("New Game", newGame);
  };

  if (!game) {
    console.clear();
    resetGame();
  }

  return (
    <div className="container  grid grid-rows-6">
      <p className="row mx-auto text-xl">UK Place Finding Game</p>
      <Canvas className="row mx-auto grid-row-span-5" width="256" height="475" />
    </div>
  );
}
