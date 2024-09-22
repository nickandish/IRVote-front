import { Card } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./signUp.scss";
import { useState } from "react";

const SignUpCard: React.FC = () => {
  const [type, setType] = useState<string>("password");
  const [icon, setIcon] = useState<JSX.Element>(<FaRegEyeSlash />);

  const seeHandler = () => {
    if (type === "password") {
      setType("text");
      setIcon(<FaRegEye />);
    } else {
      setType("password");
      setIcon(<FaRegEyeSlash />);
    }
  };

  return (
    <div className="login-card text-center row d-flex ltr">
      <h1 className="text-light fw-bold mb-4">LOGO</h1>
      <h1 className="text-light fw-bold mb-4">نیک آرا</h1>
      <Card className="text-center login-card_mew signUp_card">
        <p className="mb-4">اطلاعات خود را تکمیل کنید</p>
        <div className="mb-4">
          <input
            placeholder="نام"
            id="firstName"
            type="text"
            className="input login-card_input"
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="نام خانوادگی"
            id="lastName"
            type="text"
            className="input login-card_input"
          />
        </div>
        <div className="mb-4 test">
          <input
            placeholder="رمز عبور"
            id="password"
            type={type}
            className="input login-card_input"
          />
          <h3 className="text" onClick={seeHandler}>
            {icon}
          </h3>
        </div>
        <div className="mb-4">
          <input
            placeholder="ایمیل"
            id="email"
            type="email"
            className="input login-card_input"
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="شماره تماس"
            id="phone"
            type="text"
            className="input login-card_input"
          />
        </div>

        <button className="m-5 mt-1 mb-1 fw-bold text-light">
          ورود به سامانه
        </button>
      </Card>
    </div>
  );
};

export default SignUpCard;
