import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import "../../../scss/login/step2.scss";

interface OTPInputProps {
  length: number;
}

const OTPInput: React.FC<OTPInputProps> = ({ length }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < length - 1) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: ReactKeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "") {
        if (index > 0) {
          inputs.current[index - 1]?.focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <div>
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={data}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
          className="otp-index text-center"
        />
      ))}
    </div>
  );
};

export default OTPInput;
