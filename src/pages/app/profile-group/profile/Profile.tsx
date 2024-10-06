import { Col, Container, Row } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { RiBodyScanFill } from "react-icons/ri";
import { MdOutlineInsertChartOutlined } from "react-icons/md";
import { PiEyeglasses } from "react-icons/pi";
import { MdOutlineFolderCopy } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { LuFolderPlus } from "react-icons/lu";
import img from "../../../../assets/download.jpg";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import { Link } from "react-router-dom";
import { useUser } from "../../../../api/contextApi/UserContext";
import "./profile.scss";

function Profile() {
  const { user } = useUser();

  return (
    <>
      <Header title="پروفایل" />
      <Navbar />
      <Container className="profile-page fw-bold">
        <Row className="warper">
          <Col className="col-4">
            <img src={img} alt="profile" />
          </Col>
          <Col className="col-4 text-end text-container">
            <Col className="col-12">
              <h2>
                {user.firstName} {user.lastName}
              </h2>
            </Col>
            <Col className="col-12 prfl">
              <div>
                <MdEmail />
              </div>
              <div>
                <p>{user.email}</p>
              </div>
            </Col>
            <Col className="col-12 prfl">
              <div>
                <FaPhone className="phone" />
              </div>
              <div>
                <p>{user.mobileNumber}</p>
              </div>
            </Col>
          </Col>
          <Col className="col-4  m-auto">
            <Link to="/profile-edit">
              <div className=" m-auto icon">
                <FaPen className="i" />
              </div>
            </Link>
          </Col>
        </Row>

        <Row className="profile-page_field ">
          <Col className="col-12 profile-page_field_btn">
            <button>مدیریت پروفایل</button>
            <RiBodyScanFill className="profile-page_field_btn_icon" />
          </Col>
          <Col className="col-12 profile-page_field_btn">
            <button>کاندید منتخب من</button>
            <MdOutlineInsertChartOutlined className="profile-page_field_btn_icon" />
          </Col>
          <Col className="col-12 profile-page_field_btn">
            <button>نشانه گذاری شده</button>
            <PiEyeglasses className="profile-page_field_btn_icon" />
          </Col>
          <Col className="col-12 profile-page_field_btn">
            <button>مدیریت درخواست های من</button>
            <MdOutlineFolderCopy className="profile-page_field_btn_icon" />
          </Col>
          <Col className="col-12 profile-page_field_btn">
            <button>ثبت درخواست جدید</button>
            <LuFolderPlus className="profile-page_field_btn_icon" />
          </Col>
          <Col className="col-12 profile-page_field_btn">
            <button>ارتباط با پشتیبانی</button>
            <IoChatboxEllipsesOutline className="profile-page_field_btn_icon" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
