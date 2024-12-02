import { Container } from "react-bootstrap";
import SetBallot from "./components/setBallot/SetBallot";
import "./ballotTime.scss";

const BallotTime = () => {
  return (
    <Container className="ballot-time">
      <SetBallot />
    </Container>
  );
};

export default BallotTime;
