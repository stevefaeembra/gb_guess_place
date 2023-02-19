import React, { useRef, useEffect, useState } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import { Round } from "./Types";
import { convertToOsgb, getDistanceBetween, getOsgbCoordinatesForPlaceName } from "./utils";

type Props = {
  round: Round; // target to hit
  onGuess: Function; // onclick callback
  className: string;
  width: number;
  height: number;
};

const Canvas = ({ round, onGuess, ...props }: Props) => {
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState([0, 0]);
  const [osgbCoords, setOsgbCoords] = useState([0, 0]);
  const [distanceFromTarget, setDistanceFromTarget] = useState(0);

  const target = round.coordinates;
  const targetName = round.name;

  const draw = (ctx) => {
    var imageObj1 = new Image();
    imageObj1.src = "/uk.png";
    imageObj1.onload = function () {
      ctx.drawImage(imageObj1, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context);
  }, [draw]);

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
