import MenuPanel from "../menu/MenuPanel";
import { IoHome } from "react-icons/io5";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { MdManageHistory } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import { GoPerson } from "react-icons/go";
import "./admin.scss";

const Admin = () => {
  const menuItems = [
    { title: "برگشت به خانه", icon: <IoHome /> },
    { title: "مدیریت دوره", icon: <MdManageHistory /> },
    { title: "مدیریت صندوق‌ها", icon: <HiOutlineArchiveBox /> },
    { title: "مدیریت رای دهندگان", icon: <GoPerson /> },
    { title: "مدیریت گروه رای دهندگان", icon: <TiGroupOutline /> },
  ];

  return (
    <>
      <MenuPanel menuItems={menuItems} header="پنل مدیریتی" />
      <div>Admin</div>
    </>
  );
};

export default Admin;
