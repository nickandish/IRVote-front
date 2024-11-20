import { useNavigate, useLocation } from "react-router-dom";
import MenuPanel from "../menu/MenuPanel";
import { IoHome } from "react-icons/io5";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { MdManageHistory } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import { GoPerson } from "react-icons/go";
import "./admin.scss";
import ManageBoxes from "./manageBoxes/ManageBoxes";
import ManageCourse from "./manageCourse/ManageCourse";
import ManageGroups from "./manageGroups/ManageGroups";
import ManageVoters from "./manageVoters/ManageVoters";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { title: "برگشت به خانه", icon: <IoHome />, path: "/profile" },
    {
      title: "مدیریت دوره",
      icon: <MdManageHistory />,
      path: "/admin/manage-course",
    },
    {
      title: "مدیریت صندوق‌ها",
      icon: <HiOutlineArchiveBox />,
      path: "/admin/manage-boxes",
    },
    {
      title: "مدیریت رای دهندگان",
      icon: <GoPerson />,
      path: "/admin/manage-voters",
    },
    {
      title: "مدیریت گروه رای دهندگان",
      icon: <TiGroupOutline />,
      path: "/admin/manage-groups",
    },
  ];

  // Determine which component to render based on the current path
  const renderContent = () => {
    if (
      location.pathname === "/admin" ||
      location.pathname === "/admin/manage-course"
    ) {
      return <ManageCourse />;
    } else if (location.pathname === "/admin/manage-boxes") {
      return <ManageBoxes />;
    } else if (location.pathname === "/admin/manage-voters") {
      return <ManageVoters />;
    } else if (location.pathname === "/admin/manage-groups") {
      return <ManageGroups />;
    }
    return <ManageCourse />;
  };

  return (
    <div className="admin">
      <MenuPanel
        menuItems={menuItems}
        header="پنل مدیریتی"
        onMenuItemClick={(path) => navigate(path)}
      />

      <div className="admin-content">{renderContent()}</div>
    </div>
  );
};

export default Admin;
