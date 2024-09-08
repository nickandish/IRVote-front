import "../../../scss/login/login.scss";
import { Card } from "react-bootstrap";

const LoginCard = () => {
  return (
    <div className="login-card text-center align-item-center row justify-content-center d-flex ">
      <h1 className="text-light fw-bold mb-4">LOGO</h1>
      <h1 className="text-light fw-bold mb-4">نیک آرا</h1>
      <Card className=" text-center login-card_mew">
        <p className="mb-4">جهت ورود به سامانه شماره همراه خود را وارد کنید</p>
        <input
          type="text"
          className="m-5 mt-1 mb-3 login-card_input"
          placeholder="شماره موبایل خود را وارد کنید"
        />
        <button className="m-5 mt-1 mb-1 fw-bold text-light">
          ورود به سامانه
        </button>
      </Card>
    </div>
  );
};

export default LoginCard;
