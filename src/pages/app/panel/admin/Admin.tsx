import MenuPanel from "../menu/MenuPanel";
import { IoHome } from "react-icons/io5";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { MdManageHistory } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import { GoPerson } from "react-icons/go";
import "./admin.scss";

const Admin = () => {
  const menuItems = [
    {
      title: "برگشت به خانه",
      icon: <IoHome />,
      path: "/profile",
    },
    {
      title: "مدیریت دوره",
      icon: <MdManageHistory />,
      path: "/manage-course",
    },
    {
      title: "مدیریت صندوق‌ها",
      icon: <HiOutlineArchiveBox />,
      path: "/manage-boxes",
    },
    {
      title: "مدیریت رای دهندگان",
      icon: <GoPerson />,
      path: "/manage-voters",
    },
    {
      title: "مدیریت گروه رای دهندگان",
      icon: <TiGroupOutline />,
      path: "/manage-groups",
    },
  ];

  return (
    <>
      <MenuPanel menuItems={menuItems} header="پنل مدیریتی" />
      <div>Admin</div>
    </>
  );
};

export default Admin;
