import { Card } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useReducer } from "react";
import "./signUp.scss";

type State = {
  email: string;
  firstName: string;
  lastName: string;
  pwd: string;
  confirmPwd: string;
  emailClass: string;
  firstNameClass: string;
  lastNameClass: string;
  pwdClass: string;
  pwdConfirmClass: string;
  pwdType: string;
  confirmPwdType: string;
  pwdIcon: JSX.Element;
  confirmPwdIcon: JSX.Element;
};

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_LAST_NAME"; payload: string }
  | { type: "SET_PWD"; payload: string }
  | { type: "SET_CONFIRM_PWD"; payload: string }
  | { type: "TOGGLE_PWD_VISIBILITY" }
  | { type: "TOGGLE_CONFIRM_PWD_VISIBILITY" };

const initialState: State = {
  email: "",
  firstName: "",
  lastName: "",
  pwd: "",
  confirmPwd: "",
  emailClass: "",
  firstNameClass: "",
  lastNameClass: "",
  pwdClass: "",
  pwdConfirmClass: "",
  pwdType: "password",
  confirmPwdType: "password",
  pwdIcon: <FaRegEyeSlash />,
  confirmPwdIcon: <FaRegEyeSlash />,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EMAIL":
      const emailClass = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.payload)
        ? "is-valid"
        : "is-invalid";
      return { ...state, email: action.payload, emailClass };
    case "SET_FIRST_NAME":
      const firstNameClass =
        action.payload.length > 3 ? "is-valid" : "is-invalid";
      return { ...state, firstName: action.payload, firstNameClass };
    case "SET_LAST_NAME":
      const lastNameClass =
        action.payload.length > 5 ? "is-valid" : "is-invalid";
      return { ...state, lastName: action.payload, lastNameClass };
    case "SET_PWD":
      const pwdClass =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
          action.payload
        )
          ? "is-valid"
          : "is-invalid";
      return { ...state, pwd: action.payload, pwdClass };
    case "SET_CONFIRM_PWD":
      const pwdConfirmClass =
        action.payload === state.pwd && action.payload.length >= 8
          ? "is-valid"
          : "is-invalid";
      return { ...state, confirmPwd: action.payload, pwdConfirmClass };
    case "TOGGLE_PWD_VISIBILITY":
      const newPwdType = state.pwdType === "password" ? "text" : "password";
      const newPwdIcon =
        state.pwdType === "password" ? <FaRegEye /> : <FaRegEyeSlash />;
      return { ...state, pwdType: newPwdType, pwdIcon: newPwdIcon };
    case "TOGGLE_CONFIRM_PWD_VISIBILITY":
      const newConfirmPwdType =
        state.confirmPwdType === "password" ? "text" : "password";
      const newConfirmPwdIcon =
        state.confirmPwdType === "password" ? <FaRegEye /> : <FaRegEyeSlash />;
      return {
        ...state,
        confirmPwdType: newConfirmPwdType,
        confirmPwdIcon: newConfirmPwdIcon,
      };
    default:
      return state;
  }
};

const SignUpCard: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="login-card text-center row d-flex ltr">
      <h1 className="text-light fw-bold ">LOGO</h1>
      <h1 className="text-light fw-bold ">نیک آرا</h1>
      <Card className="text-center login-card_mew signUp_card">
        <p className="">اطلاعات خود را تکمیل کنید</p>
        <div className="">
          <input
            placeholder="نام"
            id="firstName"
            type="text"
            className={`input login-card_input ${state.firstNameClass}`}
            onChange={(e) =>
              dispatch({ type: "SET_FIRST_NAME", payload: e.target.value })
            }
          />
          {state.firstNameClass === "is-invalid" && (
            <p className="text-danger">نام حداقل باید شامل 3 حرف باشد</p>
          )}
        </div>

        <div className="">
          <input
            placeholder="نام خانوادگی"
            id="lastName"
            type="text"
            className={`input login-card_input ${state.lastNameClass}`}
            onChange={(e) =>
              dispatch({ type: "SET_LAST_NAME", payload: e.target.value })
            }
          />
          {state.lastNameClass === "is-invalid" && (
            <p className="text-danger">
              نام خانوادگی حداقل باید شامل 5 حرف باشد
            </p>
          )}
        </div>

        <div className="">
          <input
            placeholder="ایمیل"
            id="email"
            type="email"
            className={`input login-card_input ${state.emailClass}`}
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
          />
          {state.emailClass === "is-invalid" && (
            <p className="text-danger">لطفا یک ایمیل معتبر وارد کنید</p>
          )}
        </div>

        <div className=" pwd">
          <input
            placeholder="رمز عبور"
            id="password"
            type={state.pwdType}
            className={`input login-card_input ${state.pwdClass}`}
            onChange={(e) =>
              dispatch({ type: "SET_PWD", payload: e.target.value })
            }
          />
          <div
            className="icon-1"
            onClick={() => dispatch({ type: "TOGGLE_PWD_VISIBILITY" })}
          >
            {state.pwdIcon}
          </div>
          {state.pwdClass === "is-invalid" && (
            <p className="text-danger">
              رمز عبور باید حداقل 8 کاراکتر و شامل یک حرف بزرگ، یک حرف کوچک، یک
              شماره و یکی از % @ & ! باشد
            </p>
          )}
        </div>

        <div className=" pwd">
          <input
            placeholder="تکرار رمز عبور"
            id="confirmPwd"
            type={state.confirmPwdType}
            className={`input login-card_input ${state.pwdConfirmClass}`}
            onChange={(e) =>
              dispatch({ type: "SET_CONFIRM_PWD", payload: e.target.value })
            }
          />
          <div
            className="icon-2"
            onClick={() => dispatch({ type: "TOGGLE_CONFIRM_PWD_VISIBILITY" })}
          >
            {state.confirmPwdIcon}
          </div>
          {state.pwdConfirmClass === "is-invalid" && (
            <p className="text-danger">لطفا رمز عبور خود را تایید کنید</p>
          )}
        </div>

        <button className="m-5 mt-1 mb-1 fw-bold text-light">
          ورود به سامانه
        </button>
      </Card>
    </div>
  );
};

export default SignUpCard;
