import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import "./app.scss";
import Captcha from "./pages/login/step2/Captcha";
import MyElection from "./pages/app/myElection/MyElection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/OTP" element={<Captcha />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/my-elections" element={<MyElection />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
