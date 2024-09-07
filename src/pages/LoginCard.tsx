import "../scss/login/login.scss";
import { Card } from "react-bootstrap";

const LoginCard = () => {
  return (
    <div className="login-card d-flex ">
      <Card className=" text-center login-card_mew">
        <p className="mb-4">جهت ورود به سامانه شماره همراه خود را وارد کنید</p>
        <input
          type="text"
          className="mb-3 login-card_input"
          placeholder="شماره موبایل خود را وارد کنید"
        />
        <button className="fw-bold text-light">ورود به سامانه</button>
      </Card>
    </div>
  );
};

export default LoginCard;
