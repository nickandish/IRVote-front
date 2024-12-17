import { Container } from "react-bootstrap";
import CandidateAction from "./CandidateAction";
import CandidateEditStatus from "./CandidateEditStatus";
import CandidateEditTime from "./CandidateEditTime";
import CandidateQualified from "./CandidateQualified";

const CandidateLog = () => {
  return (
    <Container className="obs-list">
      <CandidateAction />
      <CandidateQualified />
      <CandidateEditTime />
      <CandidateEditStatus />
    </Container>
  );
};

export default CandidateLog;
