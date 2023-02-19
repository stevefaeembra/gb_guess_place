// convert canvas coords to EPSG:27700
import { CANVAS_HEIGHT, CELLSIZE } from "./constants";
import { PLACES } from "./places";
import { GameState, Round } from "./Types";

export const convertToOsgb = (coords: number[]): number[] => {
  // rater is 256 wide = (700,000m) by 475 (1,300,000)
  // each pixel is 2.73km
  const [x, y] = coords;
  const pixelSize = CELLSIZE;
  const osgbX = x * pixelSize;
  const osgbY = y * pixelSize;
  return [parseInt(osgbX.toFixed(0)), parseInt(osgbY.toFixed(0))];
};

export const convertToCanvas = (coords: number[]): number[] => {
  // convert OSGB coords to canvas coords (Y=0 at top)
  const [x, y] = coords;
  const pixelSize = CELLSIZE;
  const canvasX = x / pixelSize;
  const canvasY = y / pixelSize;
  return [parseInt(canvasX.toFixed(0)), CANVAS_HEIGHT - parseInt(canvasY.toFixed(0))];
};

export const getDistanceBetween = (from: number[], to: number[]): number => {
  // return simple euclidian distance between two OSGB coordinates
  // convert to pixels distance
  const [x1, y1] = from;
  const [x2, y2] = to;
  const distanceInMeters = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  return parseInt((distanceInMeters / CELLSIZE).toFixed(0));
};

export const getOsgbCoordinatesForPlaceName = (name: string) => {
  // find specific named place's OSGB coordinates
  const feature = PLACES.features.find((feat) => feat.properties.NAME1 === name);
  return feature?.geometry.coordinates;
};

export const createGame = (numberOfRounds: number): GameState => {
  // create a new game
  const gameRounds: Round[] = [];
  for (let i = 0; i < numberOfRounds; i++) {
    const index = Math.floor(Math.random() * PLACES.features.length);
    const feat = PLACES.features[index];
    gameRounds.push({
      name: feat.properties.NAME1,
      coordinates: [feat.properties.X, feat.properties.Y],
      score: 0,
    });
  }
  const newGame = {
    round: 0,
    rounds: gameRounds,
  };
  return newGame;
};
