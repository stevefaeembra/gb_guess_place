// Game state

export type Round = {
  // one randomly chosen location for each round
  name: string;
  coordinates: number[];
  score: number;
};

export type GameState = {
  // state of the game
  round: number;
  rounds: Round[];
};

export type UserGuess = {
  // on user click, this represents Canvas coords of guess and target
  // used to draw the result
  clickCoords: number[];
  targetCoords: number[];
  distance: number;
};
