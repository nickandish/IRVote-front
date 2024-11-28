import { useNavigate } from "react-router-dom";
import { ballotMenuItem } from "../ManageBoxes";
import MenuPanel from "../../../menu/MenuPanel";

const DocManage = () => {
  const navigate = useNavigate();

  return (
    <>
      <MenuPanel
        menuItems={ballotMenuItem}
        header="پنل  مدیرتی صندوق‌ها"
        onMenuItemClick={(path) => navigate(path)}
      />
      <div>DocManage</div>
    </>
  );
};

export default DocManage;
