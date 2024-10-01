import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import img from "../../../../assets/download.jpg";
import "./profileEdit.scss";

const ProfileEdit = () => {
  return (
    <>
      <Header title="ویرایش پروفایل" />
      <Navbar />

      <Container className="profile-edit">
        <Row className="text-center">
          <div className="rounded-circle profile-edit_img">
            <img src={img} className="rounded-circle" />
            <LuImagePlus className="icon" />
          </div>
        </Row>
        <Row className="text-center profile-edit_field">
          <Col className="col-12">
            <button>
              <p>نام:</p>
              <p>سارا سادات کریمی</p>
              <FaChevronLeft className="icon" />
            </button>
          </Col>
          <Col className="col-12">
            <button>
              <p>ایمیل:</p>
              <p>سارا سادات کریمی</p>
              <FaChevronLeft className="icon" />
            </button>
          </Col>
          <Col className="col-12">
            <button>
              <p>شماره موبایل:</p>
              <p>سارا سادات کریمی</p>
              <FaChevronLeft className="icon" />
            </button>
          </Col>
          <Col className="col-12">
            <button>
              <p>رمز:</p>
              <p>سارا سادات کریمی</p>
              <FaChevronLeft className="icon" />
            </button>
          </Col>
        </Row>
        <Row className="profile-edit_btn">
          <button>ثبت تغییرات</button>
        </Row>
      </Container>
    </>
  );
};

export default ProfileEdit;
