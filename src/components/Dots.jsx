import React, { useState, useEffect } from 'react';

export const Dots = () => {
  const [dots, setDots] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d >= 3 ? 1 : d + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  return <span>{".".repeat(dots)}</span>;
};
