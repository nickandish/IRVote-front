import { useEffect, useState } from "react";

const formatRemainingTime = (seconds: number) => {
  if (seconds === 0) return "رای گیری به پایان رسیده";
  if (seconds === 1) return "در حال حاضر در حال انجام";

  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const second = Math.floor((seconds %= 60));

  return `${days}: ${hours}: ${minutes}: ${second}`;
};

const CountDown: React.FC<{ initialSecond: number }> = ({ initialSecond }) => {
  const [remainingTime, setRemainingTime] = useState(initialSecond);
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const remainingTimeText = formatRemainingTime(remainingTime);

  return <div>{remainingTimeText}</div>;
};

export default CountDown;
