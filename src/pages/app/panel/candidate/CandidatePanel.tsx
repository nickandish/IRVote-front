import { Col, Container, Row } from "react-bootstrap";
import BtnSubmit from "./BtnSubmit";
import CandidateDetail from "./CandidateDetail";
import DescCandidate from "./DescCandidate";
import FileVideoBtn from "./FileVideoBtn";
import TicketCandidate from "./TicketCandidate";
import { MdManageHistory } from "react-icons/md";
import "./candidatePanel.scss";

const CandidatePanel = () => {
  return (
    <Container className="candidate-panel">
      <Row className="manageCourse_header">
        <Col className="col-2 icon">
          <MdManageHistory />
        </Col>
        <Col className="col-9">مشاهده اطلاعات</Col>
      </Row>
      <CandidateDetail />
      <FileVideoBtn />
      <DescCandidate />
      <BtnSubmit />

      <Row className="manageCourse_header">
        <Col className="col-2 icon">
          <MdManageHistory />
        </Col>
        <Col className="col-9">درخواست‌ها</Col>
      </Row>
      <TicketCandidate />
    </Container>
  );
};

export default CandidatePanel;
