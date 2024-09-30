import { Col, Container, Row } from "react-bootstrap";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdHowToVote } from "react-icons/md";
import Bg from "./login/Bg";
import { Link } from "react-router-dom";
import "./main.scss";

const Main = () => {
  return (
    <>
      <Bg />
      <Container className="main-page">
        <Row className="holding">
          <Link to="/my-elections">
            <Col className="col-12 vote">
              <button>میخواهم رای بدهم</button>
              <MdHowToVote className="icon-1 icon" />
            </Col>
          </Link>
          <Link to="/ticketAdd">
            <Col className="col-12  election">
              <button>میخواهم انتخابات برگزار کنم</button>
              <HiOutlineUserGroup className="icon-2 icon" />
            </Col>
          </Link>
        </Row>
      </Container>
    </>
  );
};

export default Main;
