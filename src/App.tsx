import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Main from "./pages/Main";
import "./app.scss";
import Captcha from "./pages/login/mobile/step2/Captcha";
import MyElection from "./pages/app/myElection/MyElection";
import Ballot from "./pages/app/ballot/Ballot";
import Candidate from "./pages/app/candidate/Candidate";
import SignUp from "./pages/signup/SignUp";
import TicketList from "./pages/app/ticket/ticketList/TicketList";
import TicketEdit from "./pages/app/ticket/ticketEdit/TicketEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/OTP" element={<Captcha />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/my-elections" element={<MyElection />} />
        <Route path="/ballots" element={<Ballot />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/ticketList" element={<TicketList />} />
        <Route path="/ticketEdit" element={<TicketEdit />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
