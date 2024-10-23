import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Bg from "../Bg";
import "../../main.scss";

function MemberShip() {
  return (
    <>
      <Bg />
      <Container className="main-page">
        <Row className="holding">
          <Link to="/login">
            <Col className="col-12 vote">
              <button> قبلا عضو ساییتون بودم </button>
              <CgProfile className="icon-1 icon" />
            </Col>
          </Link>
          <Link to="/signup">
            <Col className="col-12  election">
              <button>اولین بارمه، می‌خوام ثبت نام کنم</button>
              <MdOutlinePersonAddAlt1 className="icon-2 icon" />
            </Col>
          </Link>
        </Row>
      </Container>
    </>
  );
}

export default MemberShip;
