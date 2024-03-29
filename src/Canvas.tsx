import { useRef, useEffect, useState } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELLSIZE, NUMBER_OF_ROUNDS } from "./constants";
import { Round, UserGuess } from "./Types";
import { getDistanceBetween2 } from "./utils";

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
  const targetName = round.name;

  const drawCircle = (context: any, centre: number[], radius: number, color: string) => {
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

      drawCircle(context, clickCo, 1, "#00000066"); // user guess
      drawCircle(context, actualCo, 20, "#66000066");
      drawCircle(context, actualCo, 10, "#99000066");
      drawCircle(context, actualCo, 5, "#ff000066");
      drawCircle(context, actualCo, 2, "#00000000"); // user guess

      // draw line from target to click location
      context.beginPath();
      context.strokeStyle = "black";
      context.moveTo(actualCo[0], actualCo[1]);
      context.lineTo(clickCo[0], clickCo[1]);
      context.stroke();
    }
  }, [userGuess]);

  const convertClickToCanvasCoords = (clickX: number, clickY: number) => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const rect = canvas?.getBoundingClientRect();
    // we invert y axis so 0 is at the bottom, so it matches OSGB northings
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
        onClick={(e) => {
          // oops. This prevents cheating :-p
          if (!userGuess) onGuess(convertClickToCanvasCoords(e.clientX, e.clientY));
        }}
        ref={canvasRef}
        {...props}
      />
    </div>
  );
};

export default Canvas;
