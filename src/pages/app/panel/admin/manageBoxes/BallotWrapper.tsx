import { useNavigate, useParams, Routes, Route } from "react-router-dom";
import { getBallotMenuItems } from "./getBallotMenuItems";
import MenuPanel from "../../menu/MenuPanel";
import BallotTime from "./ballotTime/BallotTime";
import BallotRules from "./ballotTime/BallotRules";
import DocManage from "./ballotTime/DocManage";
import CandManage from "./ballotTime/CandManage";
import AddCategories from "./ballotTime/candidateCategories/AddCategories";
import { DurationProvider } from "../../../../../api/contextApi/DurationContext";

const BallotWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <DurationProvider>
        <MenuPanel
          menuItems={getBallotMenuItems(id!)}
          header={`مدیریت صندوق ${id}`}
          onMenuItemClick={(path) => navigate(path)}
        />
        <div className="manage-boxes">
          <Routes>
            <Route path="scheduling" element={<BallotTime />} />
            <Route path="rules" element={<BallotRules />} />
            <Route path="rules/addRules" element={<AddCategories />} />
            <Route path="documents" element={<DocManage />} />
            <Route path="candidates" element={<CandManage />} />
          </Routes>
        </div>
      </DurationProvider>
    </div>
  );
};

export default BallotWrapper;
