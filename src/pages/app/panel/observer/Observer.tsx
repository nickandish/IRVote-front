import { Route, Routes, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import MenuPanel from "../menu/MenuPanel";
import Chart from "./charts/Chart";
import "./observer.scss";
import VoterLog from "./lists/voterLog/VoterLog";

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
  ];

  return (
    <div className="observer">
      <MenuPanel
        menuItems={menuItems}
        header="پنل نظارتی"
        onMenuItemClick={(path) => navigate(path)}
      />
      <Routes>
        <Route path="/" element={<Chart />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/voter-logs" element={<VoterLog />} />
        <Route path="/candidate-logs" element={<VoterLog />} />
        <Route path="/ballot-logs" element={<VoterLog />} />
      </Routes>
    </div>
  );
};

export default Observer;
