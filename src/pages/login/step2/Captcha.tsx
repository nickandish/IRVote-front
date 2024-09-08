import { Card } from "react-bootstrap";
import "../../../scss/login/login.scss";
import Bg from "../Bg";
import CountDownTimer from "./CountDownTimer";
import { Link } from "react-router-dom";
import OTPInput from "./OTPInput";

const Captcha = () => {
  return (
    <>
      <Bg />
      <div className="login-card otp d-flex ">
        <Card className=" text-center login-card_mew">
          <p className="mb-4">
            به شماره تلفن 09359638579 کد 6 رقمی ارسال شد. لطفا آن را در کادر زیر
            وارد کنید
          </p>

          <OTPInput length={6} />
          <button className="fw-bold text-light">ورود به سامانه</button>
          <Link to="/login">
            <p className="p otp_right">تغییر شماره موبایل</p>
          </Link>
          <p className="p otp_left">
            <CountDownTimer />
          </p>
        </Card>
      </div>
    </>
  );
};

export default Captcha;
