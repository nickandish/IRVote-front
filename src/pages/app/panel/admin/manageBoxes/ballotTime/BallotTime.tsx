import { Container } from "react-bootstrap";
import EndOfBallot from "./components/EndOfBallot";
import SetBallot from "./components/setBallot/SetBallot";
import ExtendOfBallot from "./components/ExtendOfBallot";
import "./ballotTime.scss";

const BallotTime = () => {
  return (
    <Container>
      <SetBallot />
      <EndOfBallot />
      <ExtendOfBallot />
    </Container>
  );
};

export default BallotTime;
