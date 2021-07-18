import React, { useState, useEffect, useRef } from "react";

const useKeyPress = (...valueKey) => {
  const keyPressed = [...valueKey];
  console.log(keyPressed);

  const [keyPress, setKeyPress] = useState(false);
  const [keys, setKeys] = useState([]);

  const onKeyDown = ({ key }) => {
    // if (keyPressed.includes(key)) {
    //   console.log('yep');
    // }
    const array = [...keys];
    array.push(key);
    setKeys(array);
    console.log(array);
    if (array.includes(keyPressed)) {
      setKeyPress(true);
      console.log('зашли');
    }
    // if (valueKey === key) {
    //   setKeyPress(true);
    // }
  };
  console.log('keys', keys);

  const onKeyUp = ({ key }) => {
    const array = [...keys];
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
