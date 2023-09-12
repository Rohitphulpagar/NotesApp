import React from "react";
import { useState, useEffect } from "react";
function UseSizeProperty() {
  const [sizeWindows, setSizeWindow] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function ControlSize() {
      setSizeWindow({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", ControlSize);

    ControlSize();

    return () => window.removeEventListener("resize", ControlSize);
  }, []);

  return sizeWindows;
}

export default UseSizeProperty;
