import React from "react";
import { GameState } from "./Types";
import { pixelsToKm } from "./utils";

type Props = {
  game: GameState;
};

export default function Scorecard({ game }: Props) {
  const totalScore = game.rounds.reduce((acc, item) => acc + pixelsToKm(item.score), 0);
  return (
    <div>
      <div>
        <p className="text-xl mb-3">
          <b>Game over!</b>
        </p>
      </div>
      <table className="mx-auto table table-compact w-3/4">
        <thead>
          <tr>
            <th>Round</th>
            <th>Target</th>
            <th>Distance (px)</th>
            <th>Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {game.rounds.map((round, index) => (
            <tr key={`${index}${round.name}`}>
              <td>{index + 1}</td>
              <td>{round.name}</td>
              <td>{round.score}</td>
              <td>{pixelsToKm(round.score).toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p className="text-xl">
          <b>Score : {totalScore.toFixed(0)}</b>
        </p>
      </div>
    </div>
  );
}
