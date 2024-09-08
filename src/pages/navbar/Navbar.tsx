import { CgAdd, CgFileDocument } from "react-icons/cg";
import { FaListCheck } from "react-icons/fa6";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { IoPersonCircleOutline } from "react-icons/io5";
import "../../scss/header/header.scss";

const Navbar = () => {
  return (
    <nav className="navbarr text-light">
      <div className="icon-container text-center pt-3">
        <FaListCheck className="icon" />
        <p className="pt-1">انتخابات من</p>
      </div>

      <div className="icon-container text-center pt-3">
        <HiOutlineInboxStack className="icon" />
        <p className="pt-1">نتایج انتخابات</p>
      </div>

      <div className="icon-container text-center">
        <IoPersonCircleOutline className="profile" />
      </div>

      <div className="icon-container text-center pt-3">
        <CgFileDocument className="icon" />
        <p className="pt-1">درخواست‌ها</p>
      </div>

      <div className="icon-container text-center pt-3">
        <CgAdd className="icon add" />
        <p className="pt-1 add">درخواست جدید</p>
      </div>
    </nav>
  );
};

export default Navbar;
