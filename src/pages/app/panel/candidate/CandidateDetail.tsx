import { Card, Col, Row } from "react-bootstrap";
import img from "../../../../assets/femaileAvatar.svg";
import { LuImagePlus } from "react-icons/lu";
import { FaPen, FaRegCircleCheck } from "react-icons/fa6";
import "./candidatePanel.scss";

const CandidateDetail = () => {
  return (
    <Card className="candidate-detail-panel p-4 ">
      <Row className="align-items-center">
        <Col xs={3} className="text-center">
          <div className="profile-pic">
            <img src={img} className="rounded-circle" alt="Candidate Avatar" />
            <div className="image-overlay">
              <LuImagePlus className="icon" />
            </div>
          </div>
        </Col>

        <Col xs={7}>
          <Row className="mb-2">
            <Col xs={6} className="label">
              وضعیت:
            </Col>
            <Col xs={6} className="value">
              تایید شده
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="label">
              نام:
            </Col>
            <Col xs={6} className="value">
              سارا سادات
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="label">
              نام خانوادگی:
            </Col>
            <Col xs={6} className="value">
              کریمی
            </Col>
          </Row>
          <Row>
            <Col xs={6} className="label">
              گروه کاندید:
            </Col>
            <Col xs={6} className="value">
              اساتید
            </Col>
          </Row>
        </Col>

        <Col xs={2} className="text-center">
          <Row className="mb-3">
            <FaRegCircleCheck className="action-icon" />
          </Row>
          <Row className="mb-3">
            <FaPen className="action-icon" />
          </Row>
          <Row className="mb-3">
            <FaPen className="action-icon" />
          </Row>
          <Row>
            <FaPen className="action-icon" />
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default CandidateDetail;
