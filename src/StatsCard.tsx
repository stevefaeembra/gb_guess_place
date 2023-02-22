import React from "react";
import { GameState } from "./Types";
import { pixelsToKm } from "./utils";
import { useLocalStorage } from "usehooks-ts";

type Props = {};

export default function StatsCard(props: Props) {
  const [highScoreDistance] = useLocalStorage("gbguessgame.highscore.distance", "99999999");
  const [highScoreGame] = useLocalStorage("gbguessgame.highscore.gamescore", "0");
  const [gamesPlayed] = useLocalStorage("gbguessgame.highscore.gamecount", "0");
  const [platinum, setPlatinum] = useLocalStorage("gbguessgame.count.platinum", "0");
  const [gold, setGold] = useLocalStorage("gbguessgame.count.gold", "0");
  const [silver, setSilver] = useLocalStorage("gbguessgame.count.silver", "0");
  const [bronze, setBronze] = useLocalStorage("gbguessgame.count.bronze", "0");
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
            <th>Best (lowest) total distance, in Km</th>
            <th>{parseFloat(highScoreDistance).toFixed(0)}</th>
          </tr>
          <tr>
            <th>Platinum</th>
            <th>Guesses within 2 pixels</th>
            <th>{platinum}</th>
          </tr>
          <tr>
            <th>Gold</th>
            <th>Guesses within 5 pixels</th>
            <th>{gold}</th>
          </tr>
          <tr>
            <th>Silver</th>
            <th>Guesses within 10 pixels</th>
            <th>{silver}</th>
          </tr>
          <tr>
            <th>Bronze</th>
            <th>Guesses within 20 pixels</th>
            <th>{bronze}</th>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={() => location.reload()} className="btn mt-6">
          Play again!
        </button>
      </div>
    </div>
  );
}
