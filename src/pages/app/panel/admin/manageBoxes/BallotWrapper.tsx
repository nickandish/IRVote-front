import { useNavigate, useParams, Routes, Route } from "react-router-dom";
import { getBallotMenuItems } from "./getBallotMenuItems";
import MenuPanel from "../../menu/MenuPanel";
import BallotTime from "./ballotTime/BallotTime";
import BallotRules from "./ballotTime/BallotRules";
import DocManage from "./ballotTime/DocManage";
import CandManage from "./ballotTime/CandManage";

const BallotWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <MenuPanel
        menuItems={getBallotMenuItems(id!)}
        header={`مدیریت صندوق ${id}`}
        onMenuItemClick={(path) => navigate(path)}
      />
      <div className="manage-boxes">
        <Routes>
          <Route path="scheduling" element={<BallotTime />} />
          <Route path="rules" element={<BallotRules />} />
          <Route path="documents" element={<DocManage />} />
          <Route path="candidates" element={<CandManage />} />
          <Route
            path="*"
            element={<h3>لطفاً یک گزینه معتبر از منوی صندوق انتخاب کنید.</h3>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default BallotWrapper;