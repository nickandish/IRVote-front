// Admin.tsx
import { useNavigate, useLocation, useParams } from "react-router-dom";
import MenuPanel from "../menu/MenuPanel";
import ManageBoxes from "./manageBoxes/ManageBoxes";
import "./admin.scss";
import { IoHome } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { GoPerson } from "react-icons/go";
import { TiGroupOutline } from "react-icons/ti";
import ManageCourse from "./manageCourse/ManageCourse";
import ManageVoters from "./manageVoters/ManageVoters";
import ManageGroups from "./manageGroups/ManageGroups";
import AddVoter from "./manageVoters/addVoter/AddVoter";
import AddVoterGroup from "./manageGroups/addVoterGroup/AddVoterGroup";
import BallotTime from "./manageBoxes/ballotTime/BallotTime";
import BallotRules from "./manageBoxes/ballotTime/BallotRules";
import DocManage from "./manageBoxes/ballotTime/DocManage";
import CandManage from "./manageBoxes/ballotTime/CandManage";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const getMenuItems = () => {
    if (location.pathname.startsWith("/admin/manage-boxes/")) {
      const id = location.pathname.split("/")[3];
      return [
        {
          title: "بازگشت به مدیریت صندوق‌ها",
          icon: <IoHome />,
          path: "/admin/manage-boxes",
        },
        {
          title: "مدیریت زمان‌بندی صندوق",
          icon: <MdManageHistory />,
          path: `/admin/manage-boxes/${id}/scheduling`,
        },
        {
          title: "مدیریت قواعد صندوق",
          icon: <MdManageHistory />,
          path: `/admin/manage-boxes/${id}/rules`,
        },
        {
          title: "مدیریت سند",
          icon: <MdManageHistory />,
          path: `/admin/manage-boxes/${id}/documents`,
        },
        {
          title: "مدیریت کاندیدها",
          icon: <MdManageHistory />,
          path: `/admin/manage-boxes/${id}/candidates`,
        },
      ];
    }

    return [
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
  };

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
    } else if (location.pathname === "/admin/manage-voters/add-voter") {
      return <AddVoter />;
    } else if (location.pathname === "/admin/manage-voters/add-voterGroup") {
      return <AddVoterGroup />;
    } else if (location.pathname === `/admin/manage-boxes/1/scheduling`) {
      return <BallotTime />;
    } else if (location.pathname === `/admin/manage-boxes/1/rules`) {
      return <BallotRules />;
    } else if (location.pathname === `/admin/manage-boxes/1/documents`) {
      return <DocManage />;
    } else if (location.pathname === `/admin/manage-boxes/1/candidates`) {
      return <CandManage />;
    }

    return <h3>لطفاً یک گزینه از منو انتخاب کنید.</h3>;
  };

  return (
    <div className="admin">
      <MenuPanel
        menuItems={getMenuItems()}
        header="پنل مدیریتی"
        onMenuItemClick={(path) => navigate(path)}
      />

      <div className="admin-content">{renderContent()}</div>
    </div>
  );
};

export default Admin;
