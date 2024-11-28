import { useNavigate } from "react-router-dom";
import MenuPanel from "../../../menu/MenuPanel";
import { ballotMenuItem } from "../ManageBoxes";

const BallotRules = () => {
  const navigate = useNavigate();
  return (
    <>
      <MenuPanel
        menuItems={ballotMenuItem}
        header="پنل  مدیرتی صندوق‌ها"
        onMenuItemClick={(path) => navigate(path)}
      />
      BallotRoles
    </>
  );
};

export default BallotRules;
