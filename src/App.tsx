import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Main from "./pages/Main";
import Captcha from "./pages/login/mobile/step2/Captcha";
import MyElection from "./pages/app/myElection/MyElection";
import Ballot from "./pages/app/ballot/Ballot";
import Candidate from "./pages/app/candidate/Candidate";
import FillProfile from "./pages/fillProfile/FillProfile";
import TicketList from "./pages/app/ticket/ticketList/TicketList";
import TicketEdit from "./pages/app/ticket/ticketEdit/TicketEdit";
import TicketAdd from "./pages/app/ticket/ticketAdd/TicketAdd";
import Comment from "./pages/app/ticket/comment/Comment";
import Profile from "./pages/app/profile-group/profile/Profile";
import Document from "./pages/app/document/Document";
import ProfileEdit from "./pages/app/profile-group/profileEdit/ProfileEdit";
import Result from "./pages/app/result/Result";
import ResultDoc from "./pages/app/result/ResultDoc";
import SignUp from "./pages/signUp/SignUp";
import Observer from "./pages/app/panel/observer/Observer";
import CandidatePanel from "./pages/app/panel/candidate/CandidatePanel";
import Admin from "./pages/app/panel/admin/Admin";
import "./app.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/fillProfile" element={<FillProfile />} />
        <Route path="/OTP" element={<Captcha />} />

        <Route path="/my-elections" element={<MyElection />} />
        <Route path="/ballot/:id" element={<Ballot />} />
        <Route path="/candidate/:id" element={<Candidate />} />
        <Route path="/document/:id" element={<Document />} />

        <Route path="/result/candidate/:id" element={<Result />} />
        <Route path="/result/document/:id" element={<ResultDoc />} />

        <Route path="/ticketAdd" element={<TicketAdd />} />
        <Route path="/ticketList" element={<TicketList />} />
        <Route path="/ticketEdit" element={<TicketEdit />} />
        <Route path="/ticketComment/:id" element={<Comment />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />

        <Route path="/admin/*" element={<Admin />} />
        <Route path="/observerPanel/*" element={<Observer />} />
        <Route path="/candidatePanel" element={<CandidatePanel />} />

        <Route path="/choose" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
