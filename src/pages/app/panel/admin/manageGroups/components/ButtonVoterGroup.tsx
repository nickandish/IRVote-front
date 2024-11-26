import { Col, Row } from "react-bootstrap";
import "../ManageGroup.scss";

const ButtonVoterGroup = () => {
  return (
    <Row className="text-center button-voterGroup">
      <Col>
        <button className="button-voterGroup_right">ثبت موقت تغییرات</button>
      </Col>
      <Col>
        <button className="button-voterGroup_left">ثبت نهایی تغییرات</button>
      </Col>
    </Row>
  );
};

export default ButtonVoterGroup;
