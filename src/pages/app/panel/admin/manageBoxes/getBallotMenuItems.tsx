import { IoHome } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";

export const getBallotMenuItems = (id: string) => [
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
