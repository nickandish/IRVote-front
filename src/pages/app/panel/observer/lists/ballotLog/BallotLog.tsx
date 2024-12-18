import { Container } from "react-bootstrap";
import BallotAction from "./BallotAction";
import BallotStatus from "./BallotStatus";

const BallotLog = () => {
  return (
    <Container className="obs-list">
      <h3 className="mt-5">فعالیت رای دهندگان</h3>
      <BallotAction />
      <h3 className="mt-5">وضعیت رای دهندگان</h3>
      <BallotStatus />
    </Container>
  );
};

export default BallotLog;
