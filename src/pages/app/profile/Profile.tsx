import { Col, Container, Row } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { RiBodyScanFill } from "react-icons/ri";
import { MdOutlineInsertChartOutlined } from "react-icons/md";
import { PiEyeglasses } from "react-icons/pi";
import { CiFileOn } from "react-icons/ci";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import img from "../../../assets/download.jpg";
import "./profile.scss";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";

function Profile() {
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
              <h2>سارا سادات کریمی</h2>
            </Col>
            <Col className="col-12 prfl">
              <div>
                <MdEmail />
              </div>
              <div>
                <p>info@gmail.com</p>
              </div>
            </Col>
            <Col className="col-12 prfl">
              <div>
                <FaPhone className="phone" />
              </div>
              <div>
                <p>0993535353</p>
              </div>
            </Col>
          </Col>
          <Col className="col-4 m-auto icon">
            <FaPen className="i" />
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
            <CiFileOn className="profile-page_field_btn_icon" />
          </Col>
          <Col className="col-12 profile-page_field_btn">
            <button>ثبت درخواست جدید</button>
            <CiFileOn className="profile-page_field_btn_icon" />
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
