import React, { useState, useEffect } from "react";

const useKeyPress = (...valueKey) => {
  const keyPressed = [...valueKey];
  console.log(keyPressed);

  const [keyPress, setKeyPress] = useState(false);
  const [keys, setKeys] = useState([]);

  const onKeyDown = ({ key }) => {
    const array = [...keys];
    array.push(key);
    setKeys(array);
    if (valueKey === key) {
      setKeyPress(true);
    }
  };

  const onKeyUp = ({ key }) => {

    if (valueKey === key) {
      setKeyPress(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [keyPress]);

  return keyPress;
};

export default useKeyPress;
