import { Card, Col, Row } from "react-bootstrap";
import "./candidatePanel.scss";

const FileVideoBtn = () => {
  return (
    <Card className="mt-4 candidate-panel_video-file">
      <Card.Body>
        <Row className="align-items-center">
          <Col sm={6} className="text-center file-section">
            <span>فایل پیوست کاندید</span>
            <button>دانلود فایل</button>
          </Col>

          <Col sm={6} className="text-center video-section">
            <span className="video-label">ویدیو پیوست کاندید</span>
            <button>دانلود ویدیو</button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FileVideoBtn;
