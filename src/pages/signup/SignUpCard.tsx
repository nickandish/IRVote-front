import { Card } from "react-bootstrap";
import "./signUp.scss";

const SignUpCard = () => {
  return (
    <div className="login-card text-center row d-flex ltr">
      <h1 className="text-light fw-bold mb-4">LOGO</h1>
      <h1 className="text-light fw-bold mb-4">نیک آرا</h1>
      <Card className=" text-center login-card_mew signUp_card">
        <p className="mb-4">اطلاعات خود را تکمیل کنید</p>
        <div className="mb-4">
          <input
            placeholder="نام"
            id="form1"
            type="text"
            className="input login-card_input"
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="نام خانوادگی"
            id="form1"
            type="text"
            className="input login-card_input"
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="رمز عبور"
            id="form1"
            type="password"
            className="input login-card_input"
          />
        </div>
        <div className="mb-4">
          <input
            placeholder=" ایمیل"
            id="form1"
            type="email"
            className="input login-card_input"
          />
        </div>
        <div className="mb-4">
          <input
            placeholder=" شماره تماس"
            id="form1"
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
