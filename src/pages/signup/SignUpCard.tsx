import { Card } from "react-bootstrap";
import { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import { API_URLS } from "../../api/urls";
import "./signUp.scss";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

type State = {
  email: string;
  firstName: string;
  lastName: string;
  emailClass: string;
  firstNameClass: string;
  lastNameClass: string;
};

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_LAST_NAME"; payload: string };

const initialState: State = {
  email: "",
  firstName: "",
  lastName: "",
  emailClass: "",
  firstNameClass: "",
  lastNameClass: "",
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
    default:
      return state;
  }
};

const SignUpCard: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const { mobileNumber } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const access = localStorage.getItem("accessToken");

        const response = await axios.get(API_URLS.GET_USER, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        if (response.data.success) {
          const userData = response.data.data;

          // Populate form inputs with the user data
          dispatch({ type: "SET_FIRST_NAME", payload: userData.first_name });
          dispatch({ type: "SET_LAST_NAME", payload: userData.last_name });
          dispatch({ type: "SET_EMAIL", payload: userData.email });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    try {
      const tokenFromLocalStorage = localStorage.getItem("accessToken");
      const tokenFromCookies = cookies.get("accessToken");
      console.log("LocalStorage Token:", tokenFromLocalStorage);
      console.log("Cookie Token:", tokenFromCookies);

      const payload = {
        first_name: state.firstName,
        last_name: state.lastName,
        mobile: mobileNumber,
        email: state.email,
      };

      const response = await axios.put(API_URLS.FILL_PROFILE, payload, {
        // headers: {
        //   Authorization: `Bearer ${access}`, // Add access to Authorization header
        // },
      });

      if (response.data.success) {
        console.log("User updated successfully", response.data);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

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
            value={state.firstName}
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
            value={state.lastName}
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
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
          />
          {state.emailClass === "is-invalid" && (
            <p className="text-danger">لطفا یک ایمیل معتبر وارد کنید</p>
          )}
        </div>

        <button
          className="m-5 mt-1 mb-1 fw-bold text-light"
          onClick={handleSubmit}
        >
          ورود به سامانه
        </button>
      </Card>
    </div>
  );
};

export default SignUpCard;
