import { useEffect, useState } from "react";
import { sendOtp } from "../../../../api/userServices";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface LoginProp {
  setEmailInput: (value: boolean) => void;
}

const LoginInputs: React.FC<LoginProp> = ({ setEmailInput }) => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const removeToken = () => {
      cookies.remove("token"); // This removes the 'token' cookie
      console.log("Token removed from cookies");
    };

    removeToken(); // Call the function
  }, []);

  const isValidMobileNumber = (number: string): boolean => {
    const regex = /^(0|\+98)?9\d{9}$/; // Match mobile numbers starting with 0 or +98 followed by 9 digits
    return regex.test(number);
  };

  const handleSendOtp = async () => {
    if (!mobileNumber || !isValidMobileNumber(mobileNumber)) {
      setStatusMessage("Enter a valid mobile number");
      console.log(statusMessage);
      return;
    }

    console.log("Sending OTP for mobile number:", mobileNumber);

    try {
      const response = await sendOtp(mobileNumber);
      if (response.success) {
        setStatusMessage("OTP has been sent");
        navigate("/otp", { state: { mobileNumber } });
      } else {
        setStatusMessage(response.message);
      }
    } catch (error) {
      setStatusMessage("Failed to send OTP");
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <>
      <p className="mb-4">جهت ورود به سامانه شماره همراه خود را وارد کنید</p>
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
        ورود به سامانه
      </button>
      <div className="link_email">
        <p className="p_email fw-bold" onClick={() => setEmailInput(true)}>
          ورود با ایمیل
        </p>
      </div>
    </>
  );
};

export default LoginInputs;
