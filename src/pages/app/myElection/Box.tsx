import { Row, Col } from "react-bootstrap";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { PiInfoBold } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
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

const ElectionBox: React.FC<ElectionBoxProps> = ({ election }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ballot/${election.id}`);
  };

  const getStatusInfo = (status: number) => {
    switch (status) {
      case 0:
        return { text: "غیر فعال", className: "status-not-started" };
      case 1:
        return { text: "فعال", className: "status-in-progress" };
      default:
        return { text: "نامشخص", className: "status-unknown" };
    }
  };

  const { text: statusText, className: statusClass } = getStatusInfo(
    election.Status
  );

  const imageUrl = election.logo
    ? `${import.meta.env.VITE_API_BASE_URL}${election.logo}`
    : "";

  return (
    <Col className="col-md-6 col-12 mb-3" onClick={handleClick}>
      <Row
        className={`fw-bold box d-flex justify-content-center ${statusClass}`}
      >
        <Row className="top d-flex pt-3">
          <Col className="col-1">
            <LiaBoxOpenSolid className="icon icon-box" />
            {imageUrl ? (
              <img
                src={imageUrl}
                // alt={`${election.Election_Duration_farsi_title} logo`}
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
          <Col className="col-1"></Col>
          <Col>
            <p>
              شروع: {new Date(election.Start_at).toLocaleDateString("fa-IR")}
            </p>
          </Col>
          <Col>
            <p>
              پایان: {new Date(election.End_at).toLocaleDateString("fa-IR")}
            </p>
          </Col>
          <Col className="col-1"></Col>

          <div className="bottom">
            <PiInfoBold className="icon icon-info" />
            <p className="info-p">{statusText}</p>
          </div>
        </Row>
      </Row>
    </Col>
  );
};

export default ElectionBox;
