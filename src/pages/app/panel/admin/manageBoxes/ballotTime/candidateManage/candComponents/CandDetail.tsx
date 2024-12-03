import { Col, Container, Row } from "react-bootstrap";
import { MdManageHistory } from "react-icons/md";
import CandidateDetail from "./CandidateDetail";
import FileVideoBtn from "./FileVideoBtn";
import DescCandidate from "./DescCandidate";
import BtnSubmit from "./BtnSubmit";
import TicketCandidate from "./TicketCandidate";

const CandDetail = () => {
  return (
    <Container className="candidate-panel candidate-manage">
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

export default CandDetail;
