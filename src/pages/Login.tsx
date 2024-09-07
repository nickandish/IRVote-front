import { useRef, useEffect } from "react";
import "../scss/login/circle.scss";
import "../scss/login/mobileBack.scss";
import LoginCard from "./LoginCard";

const getRandomPosition = (max: number) => Math.floor(Math.random() * max);
const getRandomSpeed = () => Math.random() * 0.5;

const Login: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circles =
      containerRef.current?.querySelectorAll<HTMLDivElement>(".circle");
    circles?.forEach((circle) => {
      const speedX = getRandomSpeed();
      const speedY = getRandomSpeed();
      let posX = getRandomPosition(window.innerWidth - 50);
      let posY = getRandomPosition(window.innerHeight - 50);
      let directionX = 1;
      let directionY = 1;

      const moveCircle = () => {
        if (posX + 50 >= window.innerWidth || posX <= 0) directionX *= -1;
        if (posY + 50 >= window.innerHeight || posY <= 0) directionY *= -1;

        posX += speedX * directionX;
        posY += speedY * directionY;

        circle.style.transform = `translate(${posX}px, ${posY}px)`;
        requestAnimationFrame(moveCircle);
      };

      moveCircle();
    });
  }, []);

  return (
    <div className="login-background">
      <div ref={containerRef} className="container">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        {/* <div className="circle circle3"></div> */}
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        {/* <div className="circle circle3"></div> */}
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        {/* <div className="circle circle3"></div> */}
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>

        <div className="circle small"></div>
      </div>

      <div className="fix" style={{ top: "5rem", left: "5rem" }}></div>
      <div className="fix" style={{ top: "10rem", left: "8rem" }}></div>
      <div className="fix" style={{ top: "1rem", left: "25rem" }}></div>
      <div className="fix" style={{ top: "5rem", left: "5rem" }}></div>
      <div className="fix" style={{ top: "35rem", left: "17rem" }}></div>
      <div className="fix" style={{ top: "6rem", left: "19rem" }}></div>

      <div className="circle-medium"></div>
      <div className="circle-medium2"></div>
      <div className="circle-large"></div>

      <LoginCard />
    </div>
  );
};

export default Login;
