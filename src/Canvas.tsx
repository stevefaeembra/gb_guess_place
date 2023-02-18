import React, { useRef, useEffect, useState } from "react";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState([0, 0]);

  const draw = (ctx) => {
    var imageObj1 = new Image();
    imageObj1.src = "/uk.png";
    imageObj1.onload = function () {
      ctx.drawImage(imageObj1, 0, 0, 256, 512);
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
    const offset = [event.clientX - rect.left, 512 - (event.clientY - rect.top)];
    console.log("offset", offset);
    setCoords(offset);
  };

  return (
    <div>
      <p>
        Coords : {coords[0]},{coords[1]}
      </p>
      <canvas onMouseMove={(e) => handleMouseOver(e)} ref={canvasRef} {...props} />
    </div>
  );
};

export default Canvas;
