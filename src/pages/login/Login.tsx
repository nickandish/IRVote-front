import Bg from "./Bg";
import LoginCard from "./mobile/step1/LoginCard";
import "./loginScss/login.scss";
// import BgLaptop from "./laptop/BgLaptop";

const Login: React.FC = () => {
  return (
    <>
      <div className="mobile">
        <Bg />
        <LoginCard />
      </div>

      {/* <div className="laptop">
        <BgLaptop />
        <LoginCard />
      </div> */}
    </>
  );
};

export default Login;
