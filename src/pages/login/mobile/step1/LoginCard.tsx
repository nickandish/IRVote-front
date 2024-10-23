import { useState } from "react";
import "../../loginScss/login.scss";
import { Card } from "react-bootstrap";
import EmailCard from "./EmailCard";
import LoginInputs from "./LoginInputs";

const LoginCard = () => {
  const [emailInput, setEmailInput] = useState<boolean>(false);

  return (
    <div className="login-card text-center row d-flex">
      <h1 className="text-light fw-bold mb-4">LOGO</h1>
      <h1 className="text-light fw-bold mb-4">نیک آرا</h1>
      <Card className="text-center login-card_mew">
        {!emailInput ? (
          <LoginInputs
            setEmailInput={setEmailInput}
            pText="جهت ورود به سامانه شماره همراه خود را وارد کنید"
            btnText="ورود به سامانه"
            questionText="کاربر جدید"
            linkText="(ثبت نام کنید)"
            link="/signup"
          />
        ) : (
          <EmailCard setEmailInput={setEmailInput} />
        )}
      </Card>
    </div>
  );
};

export default LoginCard;
