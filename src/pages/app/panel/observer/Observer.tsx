import { Route, Routes, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import MenuPanel from "../menu/MenuPanel";
import Chart from "./charts/Chart";
import Lists from "./lists/Lists";
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
      title: "لاگ‌ها",
      icon: <TiGroupOutline />,
      path: "/observerPanel/logs",
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
        <Route path="/logs" element={<Lists />} />
      </Routes>
    </div>
  );
};

export default Observer;
