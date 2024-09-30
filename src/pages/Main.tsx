import { Col, Container, Row } from "react-bootstrap";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdHowToVote } from "react-icons/md";
import Bg from "./login/Bg";
import "./main.scss";

const Main = () => {
  return (
    <>
      <Bg />
      <Container className="main-page">
        <Row className="holding">
          <Col className="col-12 vote">
            <button>میخواهم رای بدهم</button>
            <MdHowToVote className="icon-1 icon" />
          </Col>
          <Col className="col-12  election">
            <button>میخواهم انتخابات برگزار کنم</button>
            <HiOutlineUserGroup className="icon-2 icon" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Main;
