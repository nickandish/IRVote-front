import React, { useState, useEffect } from "react";

const CountDownTimer: React.FC = () => {
  const initialTime = 2 * 60 * 1000; // 2 minutes in milliseconds
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(timer);
          window.location.reload();
          return 0;
        } else {
          return prevTime - 1000;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, []);

  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return <div>{`${seconds < 10 ? `0${seconds}` : seconds} : ${minutes}`}</div>;
};

export default CountDownTimer;
