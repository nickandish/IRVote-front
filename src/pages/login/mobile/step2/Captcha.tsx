import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../../loginScss/login.scss";
import Bg from "../../Bg";
import CountDownTimer from "./CountDownTimer";
import OTPInput from "./OTPInput";
import { sendOtpVerification } from "../../../../api/userServices";

const Captcha = () => {
  const location = useLocation();
  const { mobileNumber } = location.state || {};
  const [otp, setOtp] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await sendOtpVerification(mobileNumber, otp); // Use mobile number from location state
      if (response.success) {
        console.log("OTP verified successfully");
        // Navigate to the next step or handle success
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <>
      <Bg />
      <div className="login-card otp d-flex ">
        <Card className="text-center login-card_mew">
          <p className="mb-4">کد به شماره موبایل {mobileNumber}ارسال شد</p>
          <OTPInput length={5} onChange={setOtp} />
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
