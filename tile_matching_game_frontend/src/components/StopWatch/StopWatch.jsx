import React, { useState, useEffect } from "react";
import "./StopWatch.css";
const StopWatch = ({ isRunning, time, setTime }) => {
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const formattedTime = formatTimeToString(time);

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">{formattedTime}</p>
    </div>
  );
};

export default StopWatch;

export const formatTimeToString = (time) => {
  const minutes = Math.floor((time % 360000) / 6000);

  const seconds = Math.floor((time % 6000) / 100);

  const milliseconds = time % 100;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
};
