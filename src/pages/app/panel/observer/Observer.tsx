import { Route, Routes, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import MenuPanel from "../menu/MenuPanel";
import Chart from "./charts/Chart";
import VoterLog from "./lists/voterLog/VoterLog";
import CandidateLog from "./lists/candidateLog/CandidateLog";
import BallotLog from "./lists/ballotLog/BallotLog";
import { DurationProvider } from "../../../../api/contextApi/DurationContext";
import CandidateVoteResult from "./charts/charts/CandidateVoteResult";
import DocVoterResult from "./charts/charts/DocVoterResult";
import "./observer.scss";

const Observer = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: "برگشت به خانه", icon: <IoHome />, path: "/profile" },
    {
      title: "نمایش نموداری",
      icon: <MdManageHistory />,
      path: "/observerPanel/chart",
    },
    {
      title: "لاگ‌های رای دهنده",
      icon: <TiGroupOutline />,
      path: "/observerPanel/voter-logs",
    },
    {
      title: "لاگ‌های کاندیدها",
      icon: <MdManageHistory />,
      path: "/observerPanel/candidate-logs",
    },
    {
      title: "لاگ‌های صندوق‌ها",
      icon: <TiGroupOutline />,
      path: "/observerPanel/ballot-logs",
    },
    {
      title: "نمایش نتایج کاندیدها",
      icon: <TiGroupOutline />,
      path: "/observerPanel/candidate-result",
    },
    {
      title: "نمایش نتایج سندها",
      icon: <TiGroupOutline />,
      path: "/observerPanel/document-result",
    },
  ];

  return (
    <div className="observer">
      <MenuPanel
        menuItems={menuItems}
        header="پنل نظارتی"
        onMenuItemClick={(path) => navigate(path)}
      />
      <DurationProvider>
        <Routes>
          <Route path="/" element={<Chart />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/voter-logs" element={<VoterLog />} />
          <Route path="/candidate-logs" element={<CandidateLog />} />
          <Route path="/ballot-logs" element={<BallotLog />} />
          <Route path="/candidate-result" element={<CandidateVoteResult />} />
          <Route path="/document-result" element={<DocVoterResult />} />
        </Routes>
      </DurationProvider>
    </div>
  );
};

export default Observer;
