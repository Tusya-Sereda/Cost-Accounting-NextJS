import React, {useState, useEffect} from 'react';

export default function useOutsideClick (ref, handlerClickOutside) {
  useEffect( () => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handlerClickOutside(event);
    };
    
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handlerClickOutside]);
}