import { useState } from "react";
import { Card } from "react-bootstrap";
import Bg from "../login/Bg";
import LoginInputs from "../login/mobile/step1/LoginInputs";
import EmailCard from "../login/mobile/step1/EmailCard";
import "../login/loginScss/login.scss";

const SignUp = () => {
  const [emailInput, setEmailInput] = useState<boolean>(false);

  return (
    <>
      <div className="mobile">
        <Bg />
        <div className="login-card text-center row d-flex">
          <h1 className="text-light fw-bold mb-4">LOGO</h1>
          <h1 className="text-light fw-bold mb-4">نیک آرا</h1>
          <Card className="text-center login-card_mew">
            {!emailInput ? (
              <LoginInputs
                setEmailInput={setEmailInput}
                pText="جهت ثبت نام در سامانه شماره همراه خود را وارد کنید"
                btnText="ثبت نام در سامانه"
                questionText="از قبل اکانت دارید؟"
                linkText="وارد شوید"
                link="/login"
              />
            ) : (
              <EmailCard setEmailInput={setEmailInput} />
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignUp;
