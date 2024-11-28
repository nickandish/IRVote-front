import { Routes, Route, useNavigate } from "react-router-dom";
import MenuPanel from "../menu/MenuPanel";
import ManageBoxes from "./manageBoxes/ManageBoxes";
import ManageCourse from "./manageCourse/ManageCourse";
import ManageVoters from "./manageVoters/ManageVoters";
import ManageGroups from "./manageGroups/ManageGroups";
import AddVoter from "./manageVoters/addVoter/AddVoter";
import AddVoterGroup from "./manageGroups/addVoterGroup/AddVoterGroup";
import EditVoterGroup from "./manageGroups/addVoterGroup/EditVoterGroup";
import BallotTime from "./manageBoxes/ballotTime/BallotTime";
import BallotRules from "./manageBoxes/ballotTime/BallotRules";
import DocManage from "./manageBoxes/ballotTime/DocManage";
import CandManage from "./manageBoxes/ballotTime/CandManage";
import EditVoter from "./manageVoters/addVoter/EditVoter";
import { DurationProvider } from "../../../../api/contextApi/DurationContext";
import { IoHome } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { GoPerson } from "react-icons/go";
import { TiGroupOutline } from "react-icons/ti";
import "./admin.scss";

const Admin = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: "برگشت به خانه", icon: <IoHome />, path: "/profile" },
    {
      title: "مدیریت دوره",
      icon: <MdManageHistory />,
      path: "/admin/manage-course",
    },
    {
      title: "مدیریت گروه رای دهندگان",
      icon: <TiGroupOutline />,
      path: "/admin/manage-groups",
    },
    {
      title: "مدیریت رای دهندگان",
      icon: <GoPerson />,
      path: "/admin/manage-voters",
    },

    {
      title: "مدیریت صندوق‌ها",
      icon: <HiOutlineArchiveBox />,
      path: "/admin/manage-boxes",
    },
  ];

  const ballotMenuItem = [
    {
      title: "بازگشت به مدیریت صندوق‌ها",
      icon: <IoHome />,
      path: "/admin/manage-boxes",
    },
    {
      title: "مدیریت زمان‌بندی صندوق",
      icon: <MdManageHistory />,
      path: `/admin/manage-boxes/id/scheduling`,
    },
    {
      title: "مدیریت قواعد صندوق",
      icon: <MdManageHistory />,
      path: `/admin/manage-boxes/id/rules`,
    },
    {
      title: "مدیریت سند",
      icon: <MdManageHistory />,
      path: `/admin/manage-boxes/id/documents`,
    },
    {
      title: "مدیریت کاندیدها",
      icon: <MdManageHistory />,
      path: `/admin/manage-boxes/id/candidates`,
    },
  ];
  return (
    <div className="admin">
      <DurationProvider>
        <MenuPanel
          menuItems={menuItems}
          header="پنل مدیریتی"
          onMenuItemClick={(path) => navigate(path)}
        />
        <div className="admin-content">
          <Routes>
            <Route path="/" element={<ManageCourse />} />
            <Route path="/manage-course" element={<ManageCourse />} />
            <Route path="/manage-voters" element={<ManageVoters />} />
            <Route path="/manage-groups" element={<ManageGroups />} />
            <Route path="/manage-voters/add-voter" element={<AddVoter />} />
            <Route
              path="/manage-voters/edit-voter/:id"
              element={<EditVoter />}
            />
            <Route
              path="/manage-voters/add-voterGroup"
              element={<AddVoterGroup />}
            />
            <Route
              path="/manage-voters/edit-voterGroup/:id"
              element={<EditVoterGroup />}
            />
            <Route path="/manage-boxes" element={<ManageBoxes />} />
            <Route
              path="/manage-boxes/:id/scheduling"
              element={<BallotTime />}
            />
            <Route path="/manage-boxes/:id/rules" element={<BallotRules />} />
            <Route path="/manage-boxes/:id/documents" element={<DocManage />} />
            <Route
              path="/manage-boxes/:id/candidates"
              element={<CandManage />}
            />
            <Route
              path="*"
              element={<h3>لطفاً یک گزینه از منو انتخاب کنید.</h3>}
            />
          </Routes>
        </div>
      </DurationProvider>
    </div>
  );
};

export default Admin;
