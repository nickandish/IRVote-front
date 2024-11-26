import { useState } from "react";
import { Row, Col, Form, Card } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian_fa from "react-date-object/locales/gregorian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/purple.css";
import Dropdown from "../../../../manageCourse/components/DropDown";
import { DropdownOption } from "../../../../manageCourse/components/ResultManage";
import { HiMiniArchiveBox } from "react-icons/hi2";
import { MdCalendarMonth } from "react-icons/md";
import SetBallotTime from "./SetBallotTime";
import SetCandidateTime from "./SetCandidateTime";
import "../../ballotTime.scss";

const SetBallot = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("12:00");
  const [editTime, setEditTime] = useState(100);

  const options = [
    { value: "ballot1", label: "صندوق1" },
    { value: "ballot2", label: "صندوق2" },
    { value: "ballot3", label: "صندوق3" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (selectedOption: DropdownOption) => {
    setSelectedOption(selectedOption);
  };

  const incrementTime = () => setEditTime((prev) => prev + 1);
  const decrementTime = () => setEditTime((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <Card className="set-ballot mew">
      <Row>
        <Col className="col-8">
          <Row>
            <p>تاریخ شروع صندوق</p>
            <hr />
          </Row>
          <Row>
            <Dropdown options={options} onChange={handleChange} />
          </Row>

          <Row>
            <Col sm={6}>
              تاریخ شروع صندوق:
              <MdCalendarMonth style={{ cursor: "pointer" }} />
              <DatePicker
                value={startDate}
                onChange={(date) => {
                  setStartDate(date ? date.toDate() : null);
                }}
                calendar={persian}
                locale={gregorian_fa}
              />
            </Col>
            <Col sm={6}>
              ساعت شروع صندوق:
              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              تاریخ پایان صندوق:
              <MdCalendarMonth style={{ cursor: "pointer" }} />
              <DatePicker
                value={endDate}
                onChange={(date) => {
                  setEndDate(date ? date.toDate() : null);
                }}
                calendar={persian}
                locale={gregorian_fa}
              />
            </Col>
            <Col sm={6}>
              ساعت پایان صندوق:
              <Form.Control
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <HiMiniArchiveBox />
        </Col>
      </Row>

      <SetCandidateTime />
      <SetBallotTime
        editTime={editTime}
        incrementTime={incrementTime}
        decrementTime={decrementTime}
      />
    </Card>
  );
};

export default SetBallot;
