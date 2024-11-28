import { useNavigate } from "react-router-dom";
import MenuPanel from "../../../menu/MenuPanel";
import { ballotMenuItem } from "../ManageBoxes";

const CandManage = () => {
  const navigate = useNavigate();

  return (
    <>
      <MenuPanel
        menuItems={ballotMenuItem}
        header="پنل  مدیرتی صندوق‌ها"
        onMenuItemClick={(path) => navigate(path)}
      />
      <div>CandManage</div>
    </>
  );
};

export default CandManage;
