import { useState } from "react";
function withMouseMove(Com) {
  return function NewCom() {
    const [points, setPoints] = useState({
      x: 0,
      y: 0,
    });

    function mouseMoveHandle(e) {
      setPoints({
        x: e.clientX,
        y: e.clientY,
      });
    }

    const mousemove = { points, mouseMoveHandle };

    return <Com {...mousemove} />;
  };
}

export default withMouseMove;
