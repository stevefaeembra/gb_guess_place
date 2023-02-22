import React from "react";
import { GameState } from "./Types";
import { pixelsToKm } from "./utils";
import { useLocalStorage } from "usehooks-ts";

type Props = {};

export default function StatsCard(props: Props) {
  const [highScoreDistance] = useLocalStorage("gbguessgame.highscore.distance", "99999999");
  const [highScoreGame] = useLocalStorage("gbguessgame.highscore.gamescore", "0");
  const [gamesPlayed] = useLocalStorage("gbguessgame.highscore.gamecount", "0");

  return (
    <div>
      <div>
        <div className="mb-3">
          <h1 className="text-lg font-bold">Game Stats</h1>
        </div>
      </div>
      <table className="mx-auto table table-compact w-1/3">
        <thead>
          <tr>
            <th>Statistic</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Games Played</th>
            <th>Total number games played</th>
            <th>{gamesPlayed}</th>
          </tr>
          <tr>
            <th>High Score</th>
            <th>Highest game score</th>
            <th>{highScoreGame}</th>
          </tr>
          <tr>
            <th>Minimum Distance</th>
            <th>Best (lowest) total distance</th>
            <th>{highScoreDistance}</th>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={() => location.reload()} className="btn">
          Play again!
        </button>
      </div>
    </div>
  );
}
