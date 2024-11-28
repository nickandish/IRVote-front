import { Routes, Route, useNavigate } from "react-router-dom";
import MenuPanel from "../menu/MenuPanel";
import ManageBoxes from "./manageBoxes/ManageBoxes";
import ManageCourse from "./manageCourse/ManageCourse";
import ManageVoters from "./manageVoters/ManageVoters";
import ManageGroups from "./manageGroups/ManageGroups";
import AddVoter from "./manageVoters/addVoter/AddVoter";
import AddVoterGroup from "./manageGroups/addVoterGroup/AddVoterGroup";
import EditVoterGroup from "./manageGroups/addVoterGroup/EditVoterGroup";
import EditVoter from "./manageVoters/addVoter/EditVoter";
import BallotWrapper from "./manageBoxes/BallotWrapper";
import { DurationProvider } from "../../../../api/contextApi/DurationContext";
import { IoHome } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { GoPerson } from "react-icons/go";
import { TiGroupOutline } from "react-icons/ti";
import "./admin.scss";
import EditBallot from "./manageBoxes/manageBallots/EditBallot";
import AddBallot from "./manageBoxes/manageBallots/AddBallot";

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

            {/* Manage Ballots */}
            <Route path="/manage-boxes" element={<ManageBoxes />} />
            <Route path="/manage-boxes/:id" element={<EditBallot />} />
            <Route path="/manage-boxes/add-ballot" element={<AddBallot />} />
            <Route path="/manage-boxes/:id/*" element={<BallotWrapper />} />

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
