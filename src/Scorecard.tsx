import React from "react";
import { GameState } from "./Types";
import { pixelsToKm } from "./utils";

type Props = {
  game: GameState;
};

export default function Scorecard({ game }: Props) {
  const totalScore = game.rounds.reduce((acc, item) => acc + pixelsToKm(item.score), 0);
  // assign scores by distance
  const scoreBands = game.rounds.map((round) => {
    if (round.score <= 5)
      return {
        title: "Gold",
        class: "text-amber-300",
      };
    if (round.score <= 10)
      return {
        title: "Silver",
        class: "text-sky-50",
      };
    if (round.score <= 20)
      return {
        title: "Bronze",
        class: "text-yellow-600",
      };
    return { title: "X", class: "" };
  });
  return (
    <div>
      <div>
        <div className="text-xl mb-3">
          <h1>Game Over!</h1>
        </div>
      </div>
      <table className="mx-auto table table-compact w-1/3">
        <thead>
          <tr>
            <th>Round</th>
            <th>Target</th>
            <th>Distance (px)</th>
            <th>Distance (km)</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {game.rounds.map((round, index) => (
            <tr key={`${index}${round.name}`}>
              <td>{index + 1}</td>
              <td>
                <b>{round.name}</b>
              </td>
              <td>{round.score}</td>
              <td>{pixelsToKm(round.score).toFixed(0)}</td>
              <td>
                <p className={scoreBands[index].class}>{scoreBands[index].title}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p className="text-xl mb-4">
          <b>Score : {totalScore.toFixed(0)}</b>
        </p>
      </div>
      <div>
        <button onClick={() => location.reload()} className="btn">
          Play again!
        </button>
      </div>
    </div>
  );
}
