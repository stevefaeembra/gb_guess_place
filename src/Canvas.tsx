import React, { useRef, useEffect, useState } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import { Round, UserGuess } from "./Types";
import { convertToOsgb, getDistanceBetween, getOsgbCoordinatesForPlaceName } from "./utils";

type Props = {
  round: Round; // target to hit
  onGuess: Function; // onclick callback
  className: string;
  width: number;
  height: number;
  userGuess: UserGuess | undefined; // user guess canvas locations
};

const Canvas = ({ round, onGuess, userGuess, ...props }: Props) => {
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState([0, 0]);
  const [osgbCoords, setOsgbCoords] = useState([0, 0]);
  const [distanceFromTarget, setDistanceFromTarget] = useState(0);

  const target = round.coordinates;
  const targetName = round.name;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    var imageObj1 = new Image();
    imageObj1.src = "/uk.png";
    imageObj1.onload = function () {
      ctx.drawImage(imageObj1, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
  }, [round]);

  useEffect(() => {
    console.log("user guessed!");
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    console.log("userGuess", userGuess);
    if (userGuess) {
      context.fillRect(userGuess.clickCoords[0] - 2, 475 - userGuess.clickCoords[1] - 2, 4, 4);
      context.fillRect(userGuess.targetCoords[0] - 2, userGuess.targetCoords[1] - 2, 4, 4);
    }
  }, [userGuess]);

  const handleMouseOver = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offset = [event.clientX - rect.left, CANVAS_HEIGHT - (event.clientY - rect.top)];
    setCoords(offset);
    const osgbCoords = convertToOsgb(offset);
    setOsgbCoords(osgbCoords);
    setDistanceFromTarget(getDistanceBetween(osgbCoords, target));
  };

  const convertClickToCanvasCoords = (clickX: number, clickY: number) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offset = [clickX - rect.left, CANVAS_HEIGHT - (clickY - rect.top)];
    return offset;
  };

  return (
    <div className="cursor-crosshair">
      {/* <p>
        Coords : {coords[0]},{coords[1]}
      </p>
      <p>
        OSGB Coords : {osgbCoords[0]},{osgbCoords[1]}
      </p> */}
      <p className="text-xl">
        Target is <b>{targetName}</b>
      </p>
      {/* <p>Distance to target : {distanceFromTarget}</p> */}
      <canvas
        onClick={(e) => onGuess(convertClickToCanvasCoords(e.clientX, e.clientY))}
        onMouseMove={(e) => handleMouseOver(e)}
        ref={canvasRef}
        {...props}
      />
    </div>
  );
};

export default Canvas;
