import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Row } from "react-bootstrap";
import Bg from "../../Bg";
import OTPInput from "./OTPInput";
import Cookies from "universal-cookie";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import CountDownTimer from "./CountDownTimer";
import "../../loginScss/login.scss";

const cookies = new Cookies();

interface LocationState {
  mobileNumber?: string;
}

const Captcha: React.FC = () => {
  const location = useLocation();
  const { mobileNumber } = (location.state as LocationState) || {};
  const [otp, setOtp] = useState<string>("");
  const [captcha, setCaptcha] = useState<string>("");
  const [captchaId, setCaptchaId] = useState<string>("");
  const [captchaImage, setCaptchaImage] = useState<number | null>(null);

  const navigate = useNavigate();

  const fetchCaptcha = async () => {
    try {
      const response = await apiClient.get("/users/get_captcha");
      if (response.data.success) {
        setCaptchaId(response.data.data.id);
        setCaptchaImage(response.data.data.captcha);
      } else {
        console.error("Error fetching captcha:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching captcha:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const captchaResponse = await apiClient.post(API_URLS.CAPTCHA_GET, {
        captcha_id: captchaId,
        captcha: captcha,
      });

      if (captchaResponse.data.success) {
        const response = await apiClient.post(API_URLS.CAPTCHA_POST, {
          mobileNumber,
          otp,
        });

        if (response.data.success) {
          console.log("OTP verified successfully");

          const { access } = response.data.token;
          cookies.set("accessToken", access, { path: "/", secure: true });
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `bearer ${access}`;
          localStorage.setItem("accessToken", access);
          console.log("Tokens saved in cookies");

          navigate("/signup", { state: { mobileNumber } });
        } else {
          console.error(response.data.message);
        }
      } else {
        console.error("Invalid captcha:", captchaResponse.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP or captcha:", error);
    }
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaptcha(e.target.value);
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

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
  }, [otp, captcha]);

  return (
    <>
      <Bg />
      <div className="login-card otp d-flex">
        <Card className="text-center login-card_mew">
          <p className="mb-4">کد به شماره موبایل {mobileNumber} ارسال شد</p>
          <OTPInput length={5} onChange={setOtp} onSubmit={handleSubmit} />
          <Row>
            <input
              type="text"
              value={captcha}
              onChange={handleCaptchaChange}
              placeholder="کد را وارد کنید"
              className="col-6"
            />
            <div className="col-6 btn">{captchaImage}</div>
          </Row>
          <button className="fw-bold text-light" onClick={handleSubmit}>
            تایید کد
          </button>
          <p className="p otp_left">
            {" "}
            <CountDownTimer />
          </p>{" "}
        </Card>
      </div>
    </>
  );
};

export default Captcha;
