import React, { useState, useEffect } from "react";

const useKeyPress = (...valueKey) => {
  const keyPressed = [...valueKey];

  const [keyPress, setKeyPress] = useState(false);
  const [keys, setKeys] = useState([]);
 
  const onKeyDown = ({ key }) => {
    setKeys( array => [...new Set([...array, key])]);
    // const newArr = [...array, key]
    // const sets = new Set(newArr)
    // const uniqArr = [...sets]
    // return uniqArr;
  };

  useEffect( () => {
    const result = keyPressed.every(elem => keys.includes(elem));
    setKeyPress(result);
  }, [keyPressed, keys]);

  const onKeyUp = ({ key }) => {
    setKeys((prevKeys) => {
      let count = prevKeys.indexOf(key);
      prevKeys.splice(count, 1);
      return prevKeys;
    });
    // setKeys([]);
    setKeyPress(false);
  };

  console.log('keys', keys);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return keyPress;
};

export default useKeyPress;
