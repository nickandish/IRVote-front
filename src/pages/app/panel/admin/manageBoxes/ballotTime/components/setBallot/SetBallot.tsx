import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/purple.css";
import { useState } from "react";
import { Row, Col, Form, Card, Button, Alert } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian_fa from "react-date-object/locales/gregorian_fa";
import { MdCalendarMonth } from "react-icons/md";
import apiClient from "../../../../../../../../api/axios";
import { API_URLS } from "../../../../../../../../api/urls";
import { useDuration } from "../../../../../../../../api/contextApi/DurationContext";
import { useParams } from "react-router-dom";
import "../../ballotTime.scss";

const SetBallot = () => {
  const { durationId } = useDuration();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [candidateEditStart, setCandidateEditStart] = useState<Date | null>(
    null
  );
  const [candidateEditEnd, setCandidateEditEnd] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("12:00");
  const [editTime, setEditTime] = useState(100);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const incrementTime = () => setEditTime((prev) => prev + 1);
  const decrementTime = () => setEditTime((prev) => (prev > 0 ? prev - 1 : 0));

  const postTimeBallot = async () => {
    try {
      const payload = {
        Start_at: `${startDate?.toISOString().split("T")[0]}T${startTime}:00`,
        End_at: `${endDate?.toISOString().split("T")[0]}T${endTime}:00`,
      };
      await apiClient.post(
        API_URLS.SET_TIME_BALLOT.replace(":id", durationId),
        payload
      );
      setSuccessMessage("زمان صندوق با موفقیت تنظیم شد.");
    } catch (err) {
      console.error(err);
      setErrorMessage("خطا در تنظیم زمان صندوق.");
    }
  };

  const postCandidateEditTime = async () => {
    try {
      const payload = {
        Candidate_Edit_Start_at: candidateEditStart?.toISOString(),
        Candidate_Edit_End_at: candidateEditEnd?.toISOString(),
      };
      await apiClient.post(
        API_URLS.SET_CANDIDATE_EDIT_TIME.replace(":id", durationId),
        payload
      );
      setSuccessMessage("زمان ویرایش کاندیدها تنظیم شد.");
    } catch (err) {
      console.error(err);
      setErrorMessage("خطا در تنظیم زمان ویرایش کاندیدها.");
    }
  };

  const extendCandidateEditTime = async () => {
    try {
      const payload = {
        Candidate_Edit_Start_at: candidateEditStart?.toISOString(),
        Candidate_Edit_End_at: candidateEditEnd?.toISOString(),
      };
      await apiClient.post(
        API_URLS.EXTEND_CANDIDATE_EDIT_TIME.replace(":id", durationId),
        payload
      );
      setSuccessMessage("زمان ویرایش کاندیدها تمدید شد.");
    } catch (err) {
      console.error(err);
      setErrorMessage("خطا در تمدید زمان ویرایش کاندیدها.");
    }
  };

  const stopCandidateEdit = async () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
      setErrorMessage("خطا: شناسه صندوق موجود نیست.");
      return;
    }

    try {
      await apiClient.post(
        API_URLS.SET_CANDIDATE_EDIT_STATUS.replace(":idB", id)
      );
      setSuccessMessage("ویرایش زمان کاندیدها متوقف شد.");
    } catch (err) {
      console.error(err);
      setErrorMessage("خطا در توقف ویرایش زمان کاندیدها.");
    }
  };

  return (
    <Card className="set-ballot mew">
      <Row>
        <Col className="col-8">
          <Row>
            <p>تاریخ شروع صندوق</p>
            <hr />
          </Row>

          <Row>
            <Col sm={6}>
              تاریخ شروع صندوق:
              <MdCalendarMonth style={{ cursor: "pointer" }} />
              <DatePicker
                value={startDate}
                onChange={(date) => setStartDate(date ? date.toDate() : null)}
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
                onChange={(date) => setEndDate(date ? date.toDate() : null)}
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
      </Row>

      <hr />
      <Row>
        <p>زمان ویرایش کاندیدها</p>
        <Col sm={6}>
          شروع ویرایش:
          <DatePicker
            value={candidateEditStart}
            onChange={(date) =>
              setCandidateEditStart(date ? date.toDate() : null)
            }
            calendar={persian}
            locale={gregorian_fa}
          />
        </Col>
        <Col sm={6}>
          پایان ویرایش:
          <DatePicker
            value={candidateEditEnd}
            onChange={(date) =>
              setCandidateEditEnd(date ? date.toDate() : null)
            }
            calendar={persian}
            locale={gregorian_fa}
          />
        </Col>
      </Row>

      <hr />
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Button onClick={postTimeBallot}>تنظیم زمان صندوق</Button>
      <Button onClick={postCandidateEditTime} className="mx-2">
        تنظیم زمان ویرایش کاندیدها
      </Button>
      <Button onClick={extendCandidateEditTime} className="mx-2">
        تمدید زمان ویرایش کاندیدها
      </Button>
      <Button onClick={stopCandidateEdit} variant="danger" className="mx-2">
        توقف ویرایش کاندیدها
      </Button>
    </Card>
  );
};

export default SetBallot;
