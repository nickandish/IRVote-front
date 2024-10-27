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
  isSignup?: boolean;
}

interface CaptchaResponse {
  success: boolean;
  message: string;
  dev_message: string;
  data: {
    id: string;
    captcha: string;
  };
}

interface VerifyCaptchaResponse {
  success: boolean;
  token?: {
    access: string;
    refresh: string;
  };
  message: string;
  dev_message: string;
}

const Captcha: React.FC = () => {
  const location = useLocation();
  const { mobileNumber, isSignup } = (location.state as LocationState) || {};
  const [otp, setOtp] = useState<string>("");
  const [captcha, setCaptcha] = useState<number | undefined>(undefined);
  const [captchaId, setCaptchaId] = useState<string>("");
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchCaptcha = async () => {
    try {
      const response = await apiClient.get<CaptchaResponse>(
        API_URLS.CAPTCHA_GET
      );
      if (response.data.success) {
        setCaptchaId(response.data.data.id);
        setCaptchaImage(response.data.data.captcha);
      } else {
        setError("بارگذاری ناموق بود. لطفا دوباره امتحان کنید");
      }
    } catch (error) {
      setError("بارگذاری ناموق بود. لطفا دوباره امتحان کنید");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (captcha === undefined) {
        setError("لطفا کد صحیح را وارد کنید");
        return;
      }

      // Verify Captcha
      const captchaResponse = await apiClient.post<VerifyCaptchaResponse>(
        API_URLS.CAPTCHA_POST,
        {
          captcha_id: captchaId,
          captcha: captcha,
        }
      );

      if (captchaResponse.data.success) {
        const otpVerificationUrl = isSignup
          ? API_URLS.LOGIN_BY_OTP
          : API_URLS.SIGNUP_BY_OTP;

        // Verify OTP
        const otpResponse = await apiClient.post<VerifyCaptchaResponse>(
          otpVerificationUrl,
          {
            mobile: mobileNumber,
            otp: parseInt(otp, 10),
          }
        );

        if (otpResponse.data.success && otpResponse.data.token) {
          const { access } = otpResponse.data.token;

          // Save token
          cookies.set("accessToken", access, { path: "/", secure: true });
          localStorage.setItem("accessToken", access);
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `bearer ${access}`;
          console.log(
            "Authorization header after OTP verification:",
            apiClient.defaults.headers.common["Authorization"]
          );

          if (isSignup) {
            navigate("/profile", { state: { mobileNumber } });
          } else {
            navigate("/fillProfile", { state: { mobileNumber } });
          }
        } else {
          setError(otpResponse.data.message || "OTP verification failed.");
        }
      } else {
        setError("کد نادرست است. لطفا دوباره امتحان کنید.");
        fetchCaptcha();
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "لطفا دوباره امتحان کنید");
    } finally {
      setLoading(false);
    }
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setCaptcha(Number(value));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  return (
    <>
      <Bg />
      <div className="login-card otp d-flex">
        <Card className="text-center login-card_mew">
          <p className="mb-4">کد به شماره موبایل {mobileNumber} ارسال شد</p>
          <form onSubmit={handleFormSubmit}>
            <OTPInput length={5} onChange={setOtp} onSubmit={handleSubmit} />
            <Row className="captcha">
              <input
                type="text"
                value={captcha ?? ""}
                onChange={handleCaptchaChange}
                placeholder="کد را وارد کنید"
                className="col-6"
                required
              />
              {captchaImage && <div className="col-6 btn">{captchaImage}</div>}
            </Row>
            {error && <p className="error-message">{error}</p>}
            <button
              type="submit"
              className="fw-bold text-light cap-btn"
              disabled={loading}
            >
              {loading ? "در حال تایید..." : "ورود به سامانه"}
            </button>
          </form>
          <p className="p otp_left">
            <CountDownTimer />
          </p>
        </Card>
      </div>
    </>
  );
};

export default Captcha;
