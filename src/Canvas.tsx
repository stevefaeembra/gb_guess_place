import React, { useRef, useEffect, useState } from "react";
import { convertToOsgb, getDistanceBetween, getOsgbCoordinatesForPlaceName } from "./utils";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState([0, 0]);
  const [osgbCoords, setOsgbCoords] = useState([0, 0]);
  const [distanceFromTarget, setDistanceFromTarget] = useState(0);

  const target = getOsgbCoordinatesForPlaceName("Portsmouth");

  const draw = (ctx) => {
    var imageObj1 = new Image();
    imageObj1.src = "/uk.png";
    imageObj1.onload = function () {
      ctx.drawImage(imageObj1, 0, 0, 256, 475);
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context);
  }, [draw]);

  const handleMouseOver = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offset = [event.clientX - rect.left, 475 - (event.clientY - rect.top)];
    setCoords(offset);
    const osgbCoords = convertToOsgb(offset);
    setOsgbCoords(osgbCoords);
    setDistanceFromTarget(getDistanceBetween(osgbCoords, target));
  };

  return (
    <div>
      <p>
        Coords : {coords[0]},{coords[1]}
      </p>
      <p>
        OSGB Coords : {osgbCoords[0]},{osgbCoords[1]}
      </p>
      <p>Distance to target : {distanceFromTarget}</p>
      <canvas onMouseMove={(e) => handleMouseOver(e)} ref={canvasRef} {...props} />
    </div>
  );
};

export default Canvas;
