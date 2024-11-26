import { Col, Row } from "react-bootstrap";
import "../../ballotTime.scss";

const SetBallotTime = ({
  editTime,
  incrementTime,
  decrementTime,
}: {
  editTime: number;
  incrementTime: () => void;
  decrementTime: () => void;
}) => {
  return (
    <Row>
      <Row className="col-6">
        <Col>تمدید زمان:</Col>
        <Col>
          <div className="btn">
            {editTime} دقیقه
            <div className="counter col">
              <Col style={{ cursor: "pointer" }} onClick={incrementTime}>
                +
              </Col>
              <Col style={{ cursor: "pointer" }} onClick={decrementTime}>
                -
              </Col>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="col-6">
        <Col>زمان اصلاح متوقف شود:</Col>
        <Col>
          <div className="btn">توقف</div>
        </Col>
      </Row>
    </Row>
  );
};

export default SetBallotTime;
