import React from "react";
import { GameState } from "./Types";
import { pixelsToKm } from "./utils";
import { useLocalStorage } from "usehooks-ts";

type Props = {
  game: GameState;
  showStats: Function;
};

export default function Scorecard({ game, showStats }: Props) {
  // default to really high number, as we want lower total distance to be a winner
  const [highScoreDistance, setHighScoreDistance] = useLocalStorage("gbguessgame.highscore.distance", "99999999");
  const [highScoreGame, setHighScoreGame] = useLocalStorage("gbguessgame.highscore.gamescore", "0");
  const [cumulativeGameScore, setCumulativeGameScore] = useLocalStorage("gbguessgame.score.cumulative", "0");

  const [gamesPlayed, setGamesPlayed] = useLocalStorage("gbguessgame.highscore.gamecount", "0");
  const [platinum, setPlatinum] = useLocalStorage("gbguessgame.count.platinum", "0");
  const [gold, setGold] = useLocalStorage("gbguessgame.count.gold", "0");
  const [silver, setSilver] = useLocalStorage("gbguessgame.count.silver", "0");
  const [bronze, setBronze] = useLocalStorage("gbguessgame.count.bronze", "0");

  const totalScore = game.rounds.reduce((acc, item) => acc + pixelsToKm(item.score), 0);

  // assign scores by distance
  const scoreBands = game.rounds.map((round) => {
    if (round.score <= 1)
      return {
        title: "Platinum",
        class: "text-slate-900 font-bold",
        score: 200,
      };
    if (round.score <= 5)
      return {
        title: "Gold",
        class: "text-amber-300 font-bold",
        score: 100,
      };
    if (round.score <= 10)
      return {
        title: "Silver",
        class: "text-slate-400 font-bold ",
        score: 50,
      };
    if (round.score <= 20)
      return {
        title: "Bronze",
        class: "text-yellow-600 font-bold",
        score: 25,
      };
    return { title: "", class: "text-slate-300", score: 0 };
  });

  const gameScore = scoreBands.reduce((acc, item) => acc + item.score, 0);
  const countPlatinum = scoreBands.filter((i) => i.title === "Platinum").length;
  const countGold = scoreBands.filter((i) => i.title === "Gold").length;
  const countSilver = scoreBands.filter((i) => i.title === "Silver").length;
  const countBronze = scoreBands.filter((i) => i.title === "Bronze").length;

  const updateHighScores = (distance: number, score: number, reload: boolean) => {
    setPlatinum((parseInt(platinum) + countPlatinum).toString());
    setGold((parseInt(gold) + countGold).toString());
    setSilver((parseInt(silver) + countSilver).toString());
    setBronze((parseInt(bronze) + countBronze).toString());
    if (distance < parseInt(parseFloat(highScoreDistance).toFixed(0))) {
      // XXX
      setHighScoreDistance(distance.toString());
    }
    if (score > parseInt(highScoreGame)) {
      setHighScoreGame(score.toString());
    }
    setGamesPlayed((parseInt(gamesPlayed) + 1).toString());
    setCumulativeGameScore((parseInt(cumulativeGameScore) + score).toString());
    if (reload) {
      location.reload();
    } else {
      showStats();
    }
  };

  return (
    <div>
      <div>
        <div className="mb-3">
          <h1 className="text-lg font-bold">Game Over!</h1>
        </div>
      </div>
      <table className="mx-auto table table-compact w-1/3">
        <thead>
          <tr>
            <th>Round</th>
            <th>Target</th>
            <th>Off by</th>
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
              <td>
                <p className={scoreBands[index].class}>{scoreBands[index].title}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p className="text-xl my-2">
          <b>Out by {totalScore.toFixed(0)} Km in total</b>
        </p>
      </div>
      <div>
        <p className="text-xl my-2">
          <b>Score : {gameScore.toFixed(0)}</b>
        </p>
      </div>
      <div>
        <button onClick={() => updateHighScores(totalScore, gameScore, true)} className="btn">
          Play again!
        </button>
        &nbsp;
        <button onClick={() => updateHighScores(totalScore, gameScore, false)} className="btn">
          Stats
        </button>
      </div>
    </div>
  );
}
