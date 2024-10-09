import { Row, Col } from "react-bootstrap";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { PiInfoBold } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../../../scss/myElection.tsx/myElection.scss";

interface BoxProps {
  duration: {
    id: number;
    fa_title: string;
    start_at: string;
    end_at: string;
    status: number;
  };
}

const Box: React.FC<BoxProps> = ({ duration }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ballots/${duration.id}`);
  };

  const getStatusInfo = (status: number) => {
    switch (status) {
      case 0:
        return { text: "شروع نشده", className: "status-not-started" };
      case 1:
        return { text: "در حال برگزاری", className: "status-in-progress" };
      case 2:
        return { text: "منقضی شده", className: "status-expired" };
      case 3:
        return { text: "به پایان رسیده", className: "status-ended" };
      default:
        return { text: "نامشخص", className: "status-unknown" };
    }
  };

  const { text: statusText, className: statusClass } = getStatusInfo(
    duration.status
  );

  return (
    <Col className="col-md-6 col-12 mb-3" onClick={handleClick}>
      <Row
        className={`fw-bold box d-flex justify-content-center ${statusClass}`}
      >
        <Row className="top d-flex pt-3">
          <Col className="col-1">
            <LiaBoxOpenSolid className="icon icon-box" />
          </Col>
          <Col className="col-10">
            <h6 className="fw-bold pt-1">{duration.fa_title}</h6>
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
              شروع: {new Date(duration.start_at).toLocaleDateString("fa-IR")}
            </p>
          </Col>
          <Col>
            <p>
              پایان: {new Date(duration.end_at).toLocaleDateString("fa-IR")}
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

export default Box;