import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import "../manageCourse.scss";

const ConfirmManage = () => {
  const { durationId } = useDuration();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState<string>(""); // State to store textarea input

  const handleConfirmStatus = async (confirm: boolean) => {
    if (!durationId) {
      setMessage("شما متعلق به انتخاباتی نیستید");
      return;
    }

    try {
      setIsLoading(true);
      setMessage(null);
      const response = await apiClient.post(
        API_URLS.CONFIRM_STATUS_CHECK.replace(":id", String(durationId)),
        { confirm }
      );
      setMessage(response.data.message || "با موفقیت آپدیت شد");
      console.log(message);
    } catch (error) {
      setMessage("ناموفق");
      console.log(message);
    } finally {
      setIsLoading(false);
      console.log(message);
    }
  };

  const handleTextSubmit = async () => {
    if (!durationId) {
      setMessage("شما متعلق به انتخاباتی نیستید");
      console.log(message);
      return;
    }

    if (!confirmText.trim()) {
      setMessage("این فیلد نمیتواند خالی باشد");
      console.log(message);
      return;
    }

    try {
      setIsLoading(true);
      setMessage(null);
      const response = await apiClient.post(
        API_URLS.CONFIRM_TEXT_EDIT.replace(":id", String(durationId)),
        { Confirm_text: confirmText }
      );
      setMessage(response.data.message || "با موفقیت آپدیت شد");
    } catch (error) {
      setMessage("ناموفق بود.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="confirmManage">
        <Card className="col-lg-4 col-12 mt-4 confirmManage_right text-center">
          <p>
            ایا رای دهندگان برای شرکت در انتخابات شما نیاز به تاییدیه دارند؟
          </p>
          <Row>
            <Col className="col-6">
              <button
                className="yes"
                onClick={() => handleConfirmStatus(true)}
                disabled={isLoading}
              >
                بله
              </button>
            </Col>
            <Col className="col-6">
              <button
                className="no"
                onClick={() => handleConfirmStatus(false)}
                disabled={isLoading}
              >
                خیر
              </button>
            </Col>
          </Row>
        </Card>

        <Card className="col-lg-7 col-12 mt-4 confirmManage_left">
          <p>متن تاییدیه خود را بنویسید</p>
          <textarea
            name="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          ></textarea>
          <button
            className="confirm"
            onClick={handleTextSubmit}
            disabled={isLoading}
          >
            تایید متن
          </button>
        </Card>
      </Row>
    </>
  );
};

export default ConfirmManage;
