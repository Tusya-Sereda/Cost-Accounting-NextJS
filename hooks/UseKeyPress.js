import React, { useState, useEffect } from "react";

const useKeyPress = (...valueKey) => {
  const keyPressed = [...valueKey];

  const [keyPress, setKeyPress] = useState(false);
  const [keys, setKeys] = useState([]);

  const onKeyDown = ({ key }) => {
    setKeys((array) => [...new Set([...array, key])]);
  };

  useEffect(() => {
    const result = keyPressed.every((elem) =>
      keys ? keys.includes(elem) : ""
    );
    setKeyPress(result);
  }, [keyPressed, keys]);

  const onKeyUp = ({ key }) => {
    setKeys((prevKeys) => {
      let count = prevKeys.indexOf(key);
      prevKeys.splice(count, 1);
      return prevKeys;
    });
    setKeyPress(false);
  };

  useEffect(() => {
    document.body.addEventListener("keydown", onKeyDown);
    document.body.addEventListener("keyup", onKeyUp);
    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
      document.body.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return keyPress;
};

export default useKeyPress;
