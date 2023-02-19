// Game state

export type Round = {
  name: string;
  coordinates: number[];
  score: number;
};

export type GameState = {
  round: number;
  rounds: Round[];
};
