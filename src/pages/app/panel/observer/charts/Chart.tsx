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
        <VoterCount />
        <VoterProvinceCount />
        <VoterGroupCount />
      </Row>
      <VoterBallotList />
      <Row>
        <CandidateVoteResult />
        <DocVoterResult />
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
