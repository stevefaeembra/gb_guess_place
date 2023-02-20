import React, { useState } from "react";
import Canvas from "./Canvas";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELLSIZE, NUMBER_OF_ROUNDS } from "./constants";
import Scorecard from "./Scorecard";
import { GameState, UserGuess } from "./Types";
import { convertToCanvas, convertToOsgb, createGame, getDistanceBetween } from "./utils";

type Props = {};

export default function Game({}: Props) {
  const [game, setGame] = useState<GameState>();
  const [guess, setGuess] = useState<UserGuess | undefined>();
  const [gameOver, setGameOver] = useState<Boolean>(false);

  const resetGame = () => {
    const newGame = createGame(NUMBER_OF_ROUNDS);
    setGame(newGame);
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
    const placeInCanvas = convertToCanvas(targetOsgb);
    const currentGuess = {
      clickCoords: [xClick, yClick],
      targetCoords: placeInCanvas,
      distance,
    };
    setGuess(currentGuess);
    return currentGuess;
  };

  const advanceRound = (distance: number) => {
    // update scorboard, go to next round
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
    setGuess(undefined);
    setGame(newGameState);
    if (game.round === NUMBER_OF_ROUNDS - 1) {
      setGameOver(true);
    }
  };

  if (!game) {
    console.clear();
    resetGame();
    return null;
  }

  return !gameOver ? (
    <div className="container  grid grid-rows-10">
      <p className="row mx-auto text-xl">
        <b>UK Place Finding Game</b>
      </p>
      <Canvas
        onGuess={guessLocation}
        userGuess={guess}
        advanceRound={advanceRound}
        round={game.rounds[game.round]}
        roundNumber={game.round}
        className="row mx-auto grid-row-span-9"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </div>
  ) : (
    <Scorecard game={game} />
  );
}
