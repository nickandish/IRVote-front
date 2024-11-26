import { Col, Row } from "react-bootstrap";
import { MdCalendarMonth } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";
import "../../ballotTime.scss";

const SetCandidateTime = () => {
  return (
    <Row>
      <Row>
        <p>زمان اصلاح اطلاعات کاندیدها را تعیین کنید</p>
        <hr />
      </Row>

      <Row>
        <Col sm={6}>
          تاریخ شروع صندوق: <MdCalendarMonth />
        </Col>
        <Col sm={6}>
          ساعت شروع صندوق: <LuAlarmClock />
        </Col>
      </Row>

      <Row>
        <Col sm={6}>
          تاریخ پایان صندوق: <MdCalendarMonth />
        </Col>
        <Col sm={6}>
          ساعت پایان صندوق: <LuAlarmClock />
        </Col>
      </Row>
    </Row>
  );
};

export default SetCandidateTime;
