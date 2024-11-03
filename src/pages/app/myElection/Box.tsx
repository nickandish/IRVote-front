import { Row, Col, Modal, Button } from "react-bootstrap";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { PiInfoBold } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URLS } from "../../../api/urls";
import apiClient from "../../../api/axios";
import "../../../scss/myElection.tsx/myElection.scss";

interface ElectionBoxProps {
  election: {
    id: number;
    Election_Duration_farsi_title: string;
    Start_at: string;
    End_at: string;
    Status: number;
    logo: string | null;
    Confirm_status: number;
  };
}

const getStatusClass = (status: number) => {
  switch (status) {
    case 0:
      return "status-not-started";
    case 1:
      return "status-ongoing";
    case 2:
      return "status-completed";
    default:
      return "status-unknown";
  }
};

const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "شروع نشده";
    case 1:
      return "درحال برگزاری";
    case 2:
      return "خاتمه یافته";
    default:
      return "وضعیت نامشخص";
  }
};

const ElectionBox: React.FC<ElectionBoxProps> = ({ election }) => {
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    if (election.Confirm_status === 1) {
      setShowModal(true);
      try {
        const response = await apiClient.get(
          API_URLS.PARTICIPATE_GET.replace(":id", String(election.id))
        );
        setConfirmText(response.data.Confirm_text); // Set the confirm text from the response
      } catch (error) {
        console.error("Error fetching confirmation text:", error);
      }
    } else {
      try {
        await apiClient.post(
          API_URLS.PARTICIPATE_POST.replace(":id", String(election.id)),
          {}
        );
        navigate(`/ballot/${election.id}`, {
          state: {
            electionDurationId: election.id,
            electionDurationTitle: election.Election_Duration_farsi_title,
          },
        });
      } catch (error) {
        console.error("Error posting participation:", error);
      }
    }
  };

  const handleModalConfirm = async () => {
    try {
      await apiClient.post(
        API_URLS.PARTICIPATE_POST.replace(":id", String(election.id)),
        {}
      );
      navigate(`/ballot/${election.id}`, {
        state: {
          electionDurationId: election.id,
          electionDurationTitle: election.Election_Duration_farsi_title,
        },
      });
    } catch (error) {
      console.error("Error posting participation:", error);
    }
    setShowModal(false);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fa-IR");

  const statusClass = getStatusClass(election.Status);
  const statusText = getStatusText(election.Status);

  return (
    <Col className="col-md-6 col-12 mb-3" onClick={handleClick}>
      <Row
        className={`fw-bold box d-flex justify-content-center ${statusClass}`}
      >
        <Row className="top d-flex pt-3">
          <Col className="col-1">
            {election.logo ? (
              <img
                src={election.logo}
                alt={`${election.Election_Duration_farsi_title} logo`}
                className="election-logo"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/default-image.png";
                }}
              />
            ) : (
              <LiaBoxOpenSolid className="icon icon-box" />
            )}
          </Col>
          <Col className="col-10">
            <h6 className="fw-bold pt-1">
              {election.Election_Duration_farsi_title}
            </h6>
          </Col>
          <Col className="col-1 visiblee">
            <FaAngleLeft className="icon-left" />
          </Col>
        </Row>

        <div className="my-line" />

        <Row className="middle">
          <Col>
            <p>شروع: {formatDate(election.Start_at)}</p>
          </Col>
          <Col>
            <p>پایان: {formatDate(election.End_at)}</p>
          </Col>
        </Row>

        <Row className="bottom align-items-center">
          <PiInfoBold className="icon icon-info col-1" />
          <p className="info-p mb-0 col-10">{statusText}</p>
        </Row>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>تایید مشارکت</Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmText || "...درحال بارگیری"}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            بستن
          </Button>
          <Button variant="primary" onClick={handleModalConfirm}>
            ادامه
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default ElectionBox;
