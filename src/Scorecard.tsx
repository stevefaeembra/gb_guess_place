import React from "react";
import { GameState } from "./Types";

type Props = {
  game: GameState;
};

export default function Scorecard({ game }: Props) {
  return (
    <div>
      <table className="mx-auto table table-compact w-3/4">
        <thead>
          <tr>
            <th>Round</th>
            <th>Target</th>
            <th>Distance</th>
          </tr>
        </thead>
        {game.rounds.map((round, index) => (
          <tr key={`${index}${round.name}`}>
            <td>{index + 1}</td>
            <td>{round.name}</td>
            <td>{round.score}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
