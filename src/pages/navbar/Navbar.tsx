import { CgAdd, CgFileDocument } from "react-icons/cg";
import { FaListCheck } from "react-icons/fa6";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { IoPersonCircleOutline } from "react-icons/io5";
import "../../scss/header/header.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbarr text-light">
      <Link to="/my-elections" className="icon-container text-center pt-3">
        <FaListCheck className="icon" />
        <p className="pt-1">انتخابات من</p>
      </Link>

      <Link to="/candidate" className="icon-container text-center pt-3">
        <HiOutlineInboxStack className="icon" />
        <p className="pt-1">نتایج انتخابات</p>
      </Link>

      <Link to="/" className="icon-container text-center">
        <IoPersonCircleOutline className="profile" />
      </Link>

      <Link to="/ticketList" className="icon-container text-center pt-3">
        <CgFileDocument className="icon" />
        <p className="pt-1">درخواست‌ها</p>
      </Link>

      <Link to="/ticketAdd" className="icon-container text-center pt-3">
        <CgAdd className="icon add" />
        <p className="pt-1 add">درخواست جدید</p>
      </Link>
    </nav>
  );
};

export default Navbar;
