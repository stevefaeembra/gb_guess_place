// convert canvas coords to EPSG:27700
import { PLACES } from "./places";

export const convertToOsgb = (coords: number[]) => {
  // rater is 256 wide = (700,000m) by 475 (1,300,000)
  // each pixel is 2.73km
  const [x, y] = coords;
  const pixelSize = 2734.375;
  const osgbX = x * pixelSize;
  const osgbY = y * pixelSize;
  return [osgbX.toFixed(0), osgbY.toFixed(0)];
};

export const getDistanceBetween = (from: number[], to: number[]) => {
  // return simple euclidian distance between two OSGB coordinates
  // convert to pixels distance
  const [x1, y1] = from;
  const [x2, y2] = to;
  const distanceInMeters = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  return (distanceInMeters / 2734.375).toFixed(0);
};

export const getOsgbCoordinatesForPlaceName = (name: string) => {
  // find specific named place's OSGB coordinates
  const feature = PLACES.features.find((feat) => feat.properties.NAME1 === name);
  return feature?.geometry.coordinates;
};
