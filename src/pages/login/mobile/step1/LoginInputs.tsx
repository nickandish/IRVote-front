import { useEffect, useState } from "react";
import { sendOtp } from "../../../../api/userServices";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import apiClient from "../../../../api/axios";

const cookies = new Cookies();

interface LoginProp {
  pText: string;
  btnText: string;
  questionText: string;
  link: string;
  linkText: string;
  isSignup: boolean;
}

const LoginInputs: React.FC<LoginProp> = ({
  pText,
  btnText,
  questionText,
  linkText,
  link,
  isSignup,
}) => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const removeToken = () => {
      cookies.remove("accessToken");
      console.log("Token removed from cookies");

      localStorage.removeItem("accessToken");
      console.log("Token removed from local storage");

      delete apiClient.defaults.headers.common["Authorization"];
      console.log("Authorization header removed");
    };

    removeToken();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSendOtp();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileNumber]);

  const isValidMobileNumber = (number: string): boolean => {
    const regex = /^(0|\+98)?9\d{9}$/;
    return regex.test(number);
  };

  const handleSendOtp = async () => {
    if (!mobileNumber || !isValidMobileNumber(mobileNumber)) {
      setStatusMessage("Enter a valid mobile number");
      console.log(statusMessage);
      return;
    }

    try {
      const response = await sendOtp(mobileNumber);
      if (response.success) {
        setStatusMessage("OTP has been sent");
        console.log(statusMessage);
        navigate("/otp", { state: { mobileNumber, isSignup } });
      } else {
        setStatusMessage(response.message);
      }
    } catch (error) {
      setStatusMessage("Failed to send OTP");
      console.log(statusMessage);
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <>
      <p className="mb-4">{pText}</p>
      <input
        type="text"
        className="m-5 mt-1 mb-3 login-card_input"
        placeholder="شماره موبایل خود را وارد کنید"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <button
        className="m-5 mt-1 mb-1 fw-bold text-light"
        onClick={handleSendOtp}
      >
        {btnText}
      </button>
      <p className="pt-4 mb-2 fw-bold">
        {questionText} <Link to={link}>{linkText}</Link>
      </p>
      {/* <div className="link_email">
        <p className="p_email fw-bold disabled">ورود با ایمیل</p>
      </div> */}
    </>
  );
};

export default LoginInputs;
