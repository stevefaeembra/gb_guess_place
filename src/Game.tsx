import React, { useState } from "react";
import Canvas from "./Canvas";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELLSIZE } from "./constants";
import { GameState, UserGuess } from "./Types";
import { convertToCanvas, convertToOsgb, createGame, getDistanceBetween } from "./utils";

type Props = {};

export default function Game({}: Props) {
  const [game, setGame] = useState<GameState>();
  const [guess, setGuess] = useState<UserGuess | undefined>();

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
    const targetOsgb = target.coordinates;
    const clickOsgb = convertToOsgb([xClick, yClick]);
    const distance = getDistanceBetween(targetOsgb, clickOsgb);
    //alert(`You clicked at [${xClick},${yClick}], you were off by ${distance} pixels`);
    const placeInCanvas = convertToCanvas(targetOsgb);
    const currentGuess = {
      clickCoords: [xClick, yClick],
      targetCoords: placeInCanvas,
      distance,
    };
    console.log("currentGuess", currentGuess);
    setGuess(currentGuess);
    return currentGuess;
  };

  const advanceRound = (distance: number) => {
    if (!game) return null;
    const newRounds = [...game.rounds];
    newRounds[game.round] = {
      ...game.rounds[game.round],
      score: distance,
    };
    const newGameState = {
      round: game.round + 1,
      rounds: newRounds,
    };
    setGuess(null);
    console.log("New game state", newGameState);
    setGame(newGameState);
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
        userGuess={guess}
        advanceRound={advanceRound}
        round={game.rounds[game.round]}
        className="row mx-auto grid-row-span-9"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </div>
  ) : null;
}
