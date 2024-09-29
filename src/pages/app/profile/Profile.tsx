import { Col, Container, Row } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { RiBodyScanFill } from "react-icons/ri";
import { MdOutlineInsertChartOutlined } from "react-icons/md";
import { PiEyeglasses } from "react-icons/pi";
import { CiFileOn } from "react-icons/ci";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import img from "../../../assets/download.jpg";
import "./profile.scss";

function Profile() {
  return (
    <>
      <Container className="container profile">
        <Row className="warper">
          <Col className="col-4 m-auto">
            <img src={img} alt="profile" />
          </Col>
          <Col className="col-4 m-auto">
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
                <FaPhone />
              </div>
              <div>
                <p>0993535353</p>
              </div>
            </Col>
          </Col>
          <Col className="col-4 m-auto">
            <BiSolidMessageSquareEdit className="icon" />
          </Col>
        </Row>

        <Row className="profile_field">
          <Col className="col-12 profile_field_btn">
            <button>مدیریت پروفایل</button>
            <RiBodyScanFill className="profile_field_btn_icon" />
          </Col>
          <Col className="col-12 profile_field_btn">
            <button>کاندید منتخب من</button>
            <MdOutlineInsertChartOutlined className="profile_field_btn_icon" />
          </Col>
          <Col className="col-12 profile_field_btn">
            <button>نشانه گذاری شده</button>
            <PiEyeglasses className="profile_field_btn_icon" />
          </Col>
          <Col className="col-12 profile_field_btn">
            <button>مدیریت درخواست های من</button>
            <CiFileOn className="profile_field_btn_icon" />
          </Col>
          <Col className="col-12 profile_field_btn">
            <button>ثبت درخواست جدید</button>
            <CiFileOn className="profile_field_btn_icon" />
          </Col>
          <Col className="col-12 profile_field_btn">
            <button>ارتباط با پشتیبانی</button>
            <IoChatboxEllipsesOutline className="profile_field_btn_icon" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
