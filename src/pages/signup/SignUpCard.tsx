import { Card } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./signUp.scss";
import { useReducer } from "react";

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
  type: string;
  icon: JSX.Element;
};

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_LAST_NAME"; payload: string }
  | { type: "SET_PWD"; payload: string }
  | { type: "SET_CONFIRM_PWD"; payload: string }
  | { type: "TOGGLE_PASSWORD_VISIBILITY" };

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
  type: "password",
  icon: <FaRegEyeSlash />,
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
    case "TOGGLE_PASSWORD_VISIBILITY":
      const newType = state.type === "password" ? "text" : "password";
      const newIcon =
        state.type === "password" ? <FaRegEye /> : <FaRegEyeSlash />;
      return { ...state, type: newType, icon: newIcon };
    default:
      return state;
  }
};

const SignUpCard: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="login-card text-center row d-flex ltr">
      <h1 className="text-light fw-bold mb-4">LOGO</h1>
      <h1 className="text-light fw-bold mb-4">نیک آرا</h1>
      <Card className="text-center login-card_mew signUp_card">
        <p className="mb-4">اطلاعات خود را تکمیل کنید</p>
        <div className="mb-4">
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
            <p className="text-danger mx-5 w-100">
              Name must be more than 3 letters
            </p>
          )}
        </div>

        <div className="mb-4">
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
            <p className="text-danger mx-5 w-100">
              Last name must be more than 5 letters
            </p>
          )}
        </div>

        <div className="mb-4">
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
            <p className="text-danger mx-5 w-100">Please enter a valid email</p>
          )}
        </div>

        <div className="mb-4 test">
          <input
            placeholder="رمز عبور"
            id="password"
            type={state.type}
            className={`input login-card_input ${state.pwdClass}`}
            onChange={(e) =>
              dispatch({ type: "SET_PWD", payload: e.target.value })
            }
          />
          <h3
            className="text"
            onClick={() => dispatch({ type: "TOGGLE_PASSWORD_VISIBILITY" })}
          >
            {state.icon}
          </h3>
          {state.pwdClass === "is-invalid" && (
            <p className="text-danger mx-5 w-100">
              Password must be at least 8 characters long and include at least
              one uppercase letter, one lowercase letter, one number, and one
              special character
            </p>
          )}
        </div>

        <div className="mb-4 test">
          <input
            placeholder="تکرار رمز عبور"
            id="confirmPwd"
            type={state.type}
            className={`input login-card_input ${state.pwdConfirmClass}`}
            onChange={(e) =>
              dispatch({ type: "SET_CONFIRM_PWD", payload: e.target.value })
            }
          />
          <h3
            className="text-2"
            onClick={() => dispatch({ type: "TOGGLE_PASSWORD_VISIBILITY" })}
          >
            {state.icon}
          </h3>
          {state.pwdConfirmClass === "is-invalid" && (
            <p className="text-danger mx-5 w-100">
              Please confirm your password by entering it again
            </p>
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
