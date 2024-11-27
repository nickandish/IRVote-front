import { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import "../manageCourse.scss";

const EndDuration = () => {
  const { durationId } = useDuration();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleEndDuration = async () => {
    if (!durationId) {
      setMessage("شما مرتبط به هیچ انتخاباتی نیستید");
      return;
    }

    try {
      setIsLoading(true);
      setMessage(null);
      await apiClient.post(
        API_URLS.SET_STATUS_TO_NOT_ACTIVE.replace(":id", String(durationId))
      );
      setMessage("انتخابات با موفقیت خاتمه یافت");
      setShowModal(false);
    } catch (error) {
      setMessage("خاتمه انتخابات ناموفق بود");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card
        className="endDuration text-center mt-4"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        <p>پایان دوره انتخاباتی به صورت کامل</p>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>هشدار</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          آیا مطمئن هستید که می‌خواهید دوره انتخاباتی را به پایان برسانید؟
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={isLoading}
          >
            خیر
          </Button>
          <Button
            variant="danger"
            onClick={handleEndDuration}
            disabled={isLoading}
          >
            بله
          </Button>
        </Modal.Footer>
      </Modal>
      {message && <p className="feedback">{message}</p>}
    </>
  );
};

export default EndDuration;
