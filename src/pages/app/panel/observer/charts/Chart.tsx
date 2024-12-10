import { Col, Container, Row } from "react-bootstrap";
import CandidateVoteResult from "./charts/CandidateVoteResult";
import DocVoterResult from "./charts/DocVoterResult";
import VoterBallotList from "./charts/VoterBallotList";
import VoterCount from "./charts/VoterCount";
import VoterGroupCount from "./charts/VoterGroupCount";
import VoterProvinceCount from "./charts/VoterProvinceCount";
import "./chart.scss";

const Chart = () => {
  return (
    <Container className="chart mb-5">
      <Row>
        <Col className="col-12 col-md-6 col-lg-4">
          <VoterCount />
        </Col>
        <Col className="col-12 col-md-6 col-lg-4">
          <VoterProvinceCount />
        </Col>
        <Col className="col-12 col-lg-4">
          <VoterGroupCount />
        </Col>
      </Row>
      <Col className="col-12">
        <VoterBallotList />
      </Col>
      <Row>
        <Col className="col-12 col-md-6">
          <CandidateVoteResult />
        </Col>
        <Col className="col-12 col-md-6">
          <DocVoterResult />
        </Col>
      </Row>

      <Row className="text-center mt-5">
        <Col>
          <button className="col-12 col-md-6 secondary">
            تایید رای‌های نهایی نشده
          </button>
        </Col>
        <Col>
          <button className="col-12 col-md-6 primary">
            تایید نهایی رای ها
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Chart;
