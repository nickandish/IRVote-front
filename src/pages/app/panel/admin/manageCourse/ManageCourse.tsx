import { Col, Container, Row } from "react-bootstrap";
import { MdManageHistory } from "react-icons/md";
import DurationDetail from "./components/DurationDetail";
import ConfirmManage from "./components/ConfirmManage";
import EndDuration from "./components/EndDuration";
import ResultManage from "./components/ResultManage";
import "./manageCourse.scss";

const ManageCourse = () => {
  return (
    <>
      <Container className="manageCourse  fw-bold">
        <Row className="manageCourse_header">
          <Col className="col-2 icon">
            <MdManageHistory />
          </Col>
          <Col className="col-9">مدیریت دوره</Col>
        </Row>

        <DurationDetail />
        <ConfirmManage />

        <Row className="manageCourse_header mt-4">
          <Col className="col-2 icon">
            <MdManageHistory />
          </Col>
          <Col className="col-9">مدیریت زمان بندی دوره</Col>
        </Row>
        <EndDuration />

        <Row className="manageCourse_header mt-4">
          <Col className="col-2 icon">
            <MdManageHistory />
          </Col>
          <Col className="col-9">مدیریت نمایش نتایج</Col>
        </Row>
        <ResultManage />
      </Container>
    </>
  );
};

export default ManageCourse;
