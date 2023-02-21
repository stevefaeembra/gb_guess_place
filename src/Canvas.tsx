import React, { useRef, useEffect, useState } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELLSIZE, NUMBER_OF_ROUNDS } from "./constants";
import { Round, UserGuess } from "./Types";
import { convertToOsgb, getDistanceBetween, getDistanceBetween2, getOsgbCoordinatesForPlaceName } from "./utils";

type Props = {
  round: Round; // target to hit
  onGuess: Function; // onclick callback
  advanceRound: Function; // advance to next round callback
  roundNumber: number;
  className: string;
  width: number;
  height: number;
  userGuess: UserGuess | undefined; // user guess canvas locations
};

const Canvas = ({ round, onGuess, userGuess, roundNumber, advanceRound, ...props }: Props) => {
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState([0, 0]);
  const [osgbCoords, setOsgbCoords] = useState([0, 0]);
  const [distanceFromTarget, setDistanceFromTarget] = useState(0);
  const [guessDistance, setGuessDistance] = useState(0);

  const target = round.coordinates;
  const targetName = round.name;

  const drawCircle = (context, centre: number[], radius: number, color: string) => {
    context.beginPath();
    context.fillStyle = color;
    context.strokeStyle = "#333333";
    context.arc(centre[0], centre[1], radius, 0, 365);
    context.stroke();
    context.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const ctx = canvas.getContext("2d");
    var imageObj1 = new Image();
    imageObj1.src = "/uk.png";
    imageObj1.onload = function () {
      ctx.drawImage(imageObj1, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
  }, [round]);

  useEffect(() => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const context = canvas.getContext("2d");
    if (userGuess) {
      const clickCo = [userGuess.clickCoords[0], 475 - userGuess.clickCoords[1]];
      const actualCo = [userGuess.targetCoords[0], userGuess.targetCoords[1]];
      context.fillRect(...clickCo, 1, 1);
      context.fillRect(...actualCo, 1, 1);
      const radius = getDistanceBetween2(clickCo, actualCo);

      // draw target rings for gold, silver, bronze and users guess
      drawCircle(context, actualCo, radius, "#ffffff66"); // user guess
      drawCircle(context, actualCo, 5, "#ff000066");
      drawCircle(context, actualCo, 10, "#99000066");
      drawCircle(context, actualCo, 20, "#66000066");
      drawCircle(context, clickCo, 1, "#00000066"); // user guess

      // draw line from target to click location
      context.beginPath();
      context.strokeStyle = "black";
      context.moveTo(actualCo[0], actualCo[1]);
      context.lineTo(clickCo[0], clickCo[1]);
      context.stroke();
    }
  }, [userGuess]);

  const handleMouseOver = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const rect = canvas.getBoundingClientRect();
    const offset = [event.clientX - rect.left, CANVAS_HEIGHT - (event.clientY - rect.top)];
    setCoords(offset);
    const osgbCoords = convertToOsgb(offset);
    setOsgbCoords(osgbCoords);
    setDistanceFromTarget(getDistanceBetween(osgbCoords, target));
  };

  const convertClickToCanvasCoords = (clickX: number, clickY: number) => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const rect = canvas?.getBoundingClientRect();
    const offset = [clickX - rect.left, CANVAS_HEIGHT - (clickY - rect.top)];
    return offset;
  };

  return (
    <div className="cursor-crosshair">
      <p className="text-xl">
        {userGuess ? (
          <>
            <button onClick={() => advanceRound(userGuess.distance)} className="btn btn-sm mb-3">
              NEXT
            </button>
          </>
        ) : (
          <span className="btn btn-ghost btn-disabled btn-sm mb-3">Guess</span>
        )}
      </p>
      <p className="text-xl">
        Round{" "}
        <b>
          {roundNumber + 1} / {NUMBER_OF_ROUNDS}
        </b>
      </p>
      <p className="text-xl">
        Target is <b>{targetName}</b>
      </p>

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
