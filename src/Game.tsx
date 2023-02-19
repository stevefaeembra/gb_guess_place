import React, { useState } from "react";
import Canvas from "./Canvas";
import { CELLSIZE } from "./constants";
import { GameState } from "./Types";
import { convertToOsgb, createGame, getDistanceBetween } from "./utils";

type Props = {};

export default function Game({}: Props) {
  const [game, setGame] = useState<GameState>();

  const resetGame = () => {
    const newGame = createGame(20);
    setGame(newGame);
    console.log("New Game", newGame);
  };

  const guessLocation = (clickCoords: number[]) => {
    // user clicked, check distance to current target
    // coordinates are relative to canvas, with y=0 at bottom
    if (!game) return;
    const [xClick, yClick] = clickCoords;
    const target = game.rounds[game.round];
    console.log("target", target);
    const targetOsgb = target.coordinates;
    const clickOsgb = convertToOsgb([xClick, yClick]);
    const distance = getDistanceBetween(targetOsgb, clickOsgb);
    alert(`You clicked at [${xClick},${yClick}], you were off by ${distance} pixels`);
  };

  if (!game) {
    console.clear();
    resetGame();
  }

  return game ? (
    <div className="container  grid grid-rows-10">
      <p className="row mx-auto text-xl">UK Place Finding Game</p>
      <Canvas
        onGuess={guessLocation}
        round={game.rounds[game.round]}
        className="row mx-auto grid-row-span-9"
        width="256"
        height="475"
      />
    </div>
  ) : null;
}
