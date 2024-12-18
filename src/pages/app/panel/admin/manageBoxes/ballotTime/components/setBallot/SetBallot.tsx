import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/purple.css";
import { useState, useEffect } from "react";
import { Row, Col, Form, Card, Alert } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian_fa from "react-date-object/locales/gregorian_fa";
import apiClient from "../../../../../../../../api/axios";
import { API_URLS } from "../../../../../../../../api/urls";
import { useParams } from "react-router-dom";
import "../../ballotTime.scss";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { BsPersonArmsUp } from "react-icons/bs";

const SetBallot = () => {
  const { id } = useParams<{ id: string }>();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [candidateEditStart, setCandidateEditStart] = useState<Date | null>(
    null
  );
  const [candidateEditEnd, setCandidateEditEnd] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("12:00");
  const [startTimeCandidate, setStartTimeCandidate] = useState("12:00");
  const [endTimeCandidate, setEndTimeCandidate] = useState("12:00");
  const [editTimeCandidate, setEditTimeCandidate] = useState(20);
  const [editTimeBallot, setEditTimeBallot] = useState(20);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleApiCall = async (
    url: string,
    method: "post",
    payload: object
  ) => {
    try {
      const { data } = await apiClient[method](url, payload);
      if (data?.detail) {
        setSuccessMessage(data.detail);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("عملیات انجام نشد.");
    }
  };

  const postTimeBallot = () => {
    const payload = {
      Start_at: `${startDate?.toISOString().split("T")[0]}T${startTime}:00`,
      End_at: `${endDate?.toISOString().split("T")[0]}T${endTime}:00`,
    };
    handleApiCall(
      API_URLS.SET_TIME_BALLOT.replace(":id", String(id)),
      "post",
      payload
    );
  };

  const postCandidateEditTime = () => {
    const payload = {
      Candidate_Edit_Start_at: candidateEditStart?.toISOString(),
      Candidate_Edit_End_at: candidateEditEnd?.toISOString(),
    };
    handleApiCall(
      API_URLS.SET_CANDIDATE_EDIT_TIME.replace(":id", String(id)),
      "post",
      payload
    );
  };

  const extendCandidateEditTime = () => {
    const payload = {
      extension_minutes: editTimeCandidate,
    };
    handleApiCall(
      API_URLS.EXTEND_CANDIDATE_EDIT_TIME.replace(":id", String(id)),
      "post",
      payload
    );
  };

  const extendBallotTime = () => {
    const payload = {
      extension_minutes: editTimeBallot,
    };
    handleApiCall(
      API_URLS.EXTEND_BALLOT_TIME.replace(":idB", String(id)),
      "post",
      payload
    );
  };

  const stopCandidateEdit = () => {
    if (!id) {
      setErrorMessage("خطا: شناسه صندوق موجود نیست.");
      return;
    }
    handleApiCall(
      API_URLS.SET_CANDIDATE_EDIT_STATUS.replace(":idB", id),
      "post",
      {}
    );
  };

  const stopBallot = () => {
    if (!id) {
      setErrorMessage("خطا: شناسه صندوق موجود نیست.");
      return;
    }
    handleApiCall(API_URLS.HALT_BALLOT.replace(":idB", id), "post", {});
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
              <DatePicker
                value={endDate}
                onChange={(date) => setEndDate(date ? date.toDate() : null)}
                calendar={persian}
                locale={gregorian_fa}
              />
              <button onClick={postTimeBallot}>تنظیم زمان صندوق</button>
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
        <Col className="col-4">
          <HiOutlineArchiveBox className="big-icon" />
        </Col>
      </Row>
      <Row>
        <Col className="col-8">
          <p>زمان ویرایش کاندیدها</p>
          <hr />

          <Row>
            <Col sm={6}>
              تاریخ شروع ویرایش کاندیدها:
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
              ساعت شروع ویرایش کاندیدها:
              <Form.Control
                type="time"
                value={startTimeCandidate}
                onChange={(e) => setStartTimeCandidate(e.target.value)}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              تاریخ پایان ویرایش کاندید:
              <DatePicker
                value={candidateEditEnd}
                onChange={(date) =>
                  setCandidateEditEnd(date ? date.toDate() : null)
                }
                calendar={persian}
                locale={gregorian_fa}
              />
              <button onClick={postCandidateEditTime}>
                تنظیم زمان ویرایش کاندید
              </button>
            </Col>
            <Col sm={6}>
              ساعت پایان ویرایش کاندید:
              <Form.Control
                type="time"
                value={endTimeCandidate}
                onChange={(e) => setEndTimeCandidate(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col className="col-4">
          <BsPersonArmsUp className="big-icon" />
        </Col>
      </Row>

      <hr />
      <Row className="expend-end">
        <Col className="col-12 col-md-7">
          <Row>
            <Col className="col-3">
              <Form.Control
                type="number"
                value={editTimeCandidate}
                onChange={(e) => setEditTimeCandidate(Number(e.target.value))}
              />
            </Col>
            <Col className="col-9">
              <button onClick={extendCandidateEditTime}>
                افزایش زمان ویرایش کاندید
              </button>
            </Col>
          </Row>
        </Col>
        <Col className="col-12 col-md-5">
          <button onClick={stopCandidateEdit} className="mx-2">
            خاتمه ویرایش کاندید
          </button>
        </Col>
      </Row>
      <hr />
      <Row className="expend-end">
        <Col className="col-12 col-md-7">
          <Row className="align-item-center">
            <Col className="col-3">
              <Form.Control
                type="number"
                value={editTimeBallot}
                onChange={(e) => setEditTimeBallot(Number(e.target.value))}
              />
            </Col>
            <Col className="col-9">
              <button onClick={extendBallotTime}>افزایش زمان صندوق</button>
            </Col>
          </Row>
        </Col>
        <Col className="col-12 col-md-5">
          <button onClick={stopBallot} className="mx-2 danger">
            خاتمه این صندوق
          </button>
        </Col>
      </Row>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Card>
  );
};

export default SetBallot;
