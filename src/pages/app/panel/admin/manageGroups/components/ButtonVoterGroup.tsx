import { Col, Row, Alert } from "react-bootstrap";
import { useState } from "react";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import "../ManageGroup.scss";

const ButtonVoterGroup = () => {
  const { durationId } = useDuration();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [alert, setAlert] = useState<boolean>(false);

  const handleConfirmChanges = async () => {
    setError(null);
    setSuccess(null);

    try {
      const url = API_URLS.CONFIRM_VOTER_GROUP.replace(
        ":id",
        String(durationId)
      );
      await apiClient.post(url);
      setSuccess("تغییرات با موفقیت ثبت شد.");
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError("خطا در ثبت تغییرات.");
      setTimeout(() => {
        setError(null);
      }, 3000);
      console.error(err);
    }
  };

  const handlleConfirmAlert2 = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {alert && <Alert variant="success">تغییرات با موفقیت ثبت شد</Alert>}

      <Row className="text-center button-voterGroup">
        <Col>
          <button
            className="button-voterGroup_right"
            onClick={handlleConfirmAlert2}
          >
            ثبت موقت تغییرات
          </button>
        </Col>
        <Col>
          <button
            className="button-voterGroup_left"
            onClick={handleConfirmChanges}
          >
            ثبت نهایی تغییرات
          </button>
        </Col>
      </Row>
    </>
  );
};

export default ButtonVoterGroup;
