import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Row } from "react-bootstrap";
import Bg from "../../Bg";
import OTPInput from "./OTPInput";
import Cookies from "universal-cookie";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import "../../loginScss/login.scss";
import CountDownTimer from "./CountDownTimer";

const cookies = new Cookies();

interface LocationState {
  mobileNumber?: string;
}

interface CaptchaResponse {
  success: boolean;
  message: string;
  dev_message: string;
  data: {
    id: string;
    captcha: string; // Assuming it's a base64 string or URL
  };
}

interface VerifyCaptchaResponse {
  success: boolean;
  message: string;
  data?: {
    token?: {
      access: string;
      refresh: string;
    };
    new_user?: boolean;
    user_info?: {
      id: number;
      username: string;
      first_name: string;
      last_name: string;
      mobile: string;
      email: string;
      coefficient: number;
      avatar: string | null;
    };
    is_first_login?: boolean;
  };
}

const Captcha: React.FC = () => {
  const location = useLocation();
  const { mobileNumber } = (location.state as LocationState) || {};
  const [otp, setOtp] = useState<string>("");
  const [captcha, setCaptcha] = useState<number | undefined>(undefined); // Ensure it's number type
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
        console.error("Error fetching captcha:", response.data.message);
        setError("بارگذاری ناموق بود. لطفا دوباره امتحان کنید");
      }
    } catch (error) {
      console.error("Error fetching captcha:", error);
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

      console.log("Submitting Captcha:", {
        captcha_id: captchaId,
        captcha: captcha,
      });

      // Verify Captcha
      const captchaResponse = await apiClient.post<VerifyCaptchaResponse>(
        API_URLS.CAPTCHA_POST,
        {
          captcha_id: captchaId,
          captcha: captcha,
        }
      );

      console.log("Captcha Response:", captchaResponse.data);

      if (captchaResponse.data.success) {
        // Verify OTP
        const otpResponse = await apiClient.post<VerifyCaptchaResponse>(
          API_URLS.LOGIN_BY_OTP,
          {
            mobile: mobileNumber,
            otp: parseInt(otp, 10),
          }
        );

        console.log("OTP Response:", otpResponse.data);

        if (otpResponse.data.success && otpResponse.data.data?.token) {
          console.log("OTP verified successfully");

          const { access } = otpResponse.data.data.token;
          cookies.set("accessToken", access, { path: "/", secure: true });
          localStorage.setItem("accessToken", access);
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `bearer ${access}`;

          console.log("Tokens saved in cookies and localStorage");

          // Check if the token is set before navigating
          if (
            cookies.get("accessToken") &&
            localStorage.getItem("accessToken")
          ) {
            console.log("Navigating to signup");
            navigate("/signup", { state: { mobileNumber } });
          } else {
            setError("Failed to save token. Please try again.");
          }
        } else {
          console.error(otpResponse.data.message);
          setError(otpResponse.data.message || "OTP verification failed.");
        }
      } else {
        console.error("کد نادرست است:", captchaResponse.data.message);
        setError("کد نادرست است. لطفا دوباره امتحان کنید.");
        fetchCaptcha();
      }
    } catch (error: any) {
      console.error("Error verifying OTP or captcha:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("لطفا دوباره امتحان کنید");
      }
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
