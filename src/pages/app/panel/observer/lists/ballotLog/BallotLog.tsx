import { Container } from "react-bootstrap";
import BallotAction from "./BallotAction";
import BallotStatus from "./BallotStatus";

const BallotLog = () => {
  return (
    <Container className="obs-list">
      <hr className="mt-5" />
      <h3>عملیات روی صندوق</h3>
      <BallotAction />
      <hr className="mt-5" />
      <h3>وضعیت صندوق</h3>
      <BallotStatus />
    </Container>
  );
};

export default BallotLog;
