import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Bg from "../../Bg";
import CountDownTimer from "./CountDownTimer";
import OTPInput from "./OTPInput";
import { sendOtpVerification } from "../../../../api/userServices";
import Cookies from "universal-cookie";
import apiClient from "../../../../api/axios";
import "../../loginScss/login.scss";

const cookies = new Cookies();

interface LocationState {
  mobileNumber?: string;
}

const Captcha: React.FC = () => {
  const location = useLocation();
  const { mobileNumber } = (location.state as LocationState) || {};
  const [otp, setOtp] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await sendOtpVerification(mobileNumber || "", otp);
      if (response.success) {
        console.log("OTP verified successfully");

        const { access } = response.data.token;
        cookies.set("accessToken", access, { path: "/", secure: true });
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        localStorage.setItem("accessToken", access);
        console.log("Tokens saved in cookies");

        navigate("/signup", { state: { mobileNumber } });
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [otp]);

  return (
    <>
      <Bg />
      <div className="login-card otp d-flex">
        <Card className="text-center login-card_mew">
          <p className="mb-4">کد به شماره موبایل {mobileNumber} ارسال شد</p>
          <OTPInput length={5} onChange={setOtp} onSubmit={handleSubmit} />
          <button className="fw-bold text-light" onClick={handleSubmit}>
            تایید کد
          </button>
          <p className="p otp_left">
            <CountDownTimer />
          </p>
        </Card>
      </div>
    </>
  );
};

export default Captcha;
