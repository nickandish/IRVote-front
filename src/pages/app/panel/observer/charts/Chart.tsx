import { Container } from "react-bootstrap";
import CandidateVoteResult from "./charts/CandidateVoteResult";
import DocVoterResult from "./charts/DocVoterResult";
import VoterBallotList from "./charts/VoterBallotList";
import VoterCount from "./charts/VoterCount";
import VoterGroupCount from "./charts/VoterGroupCount";
import VoterProvinceCount from "./charts/VoterProvinceCount";
import "./chart.scss";

const Chart = () => {
  return (
    <Container className="chart">
      <VoterProvinceCount />
      <VoterBallotList />
      <VoterCount />
      <VoterGroupCount />
      <CandidateVoteResult />
      <DocVoterResult />
    </Container>
  );
};

export default Chart;
