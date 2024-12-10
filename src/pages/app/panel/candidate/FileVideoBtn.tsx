import { Card, Col, Row } from "react-bootstrap";
import "./candidatePanel.scss";

interface FileVideoBtnProps {
  cvUrl: string | null;
  videoUrl: string | null;
}

const FileVideoBtn: React.FC<FileVideoBtnProps> = ({ cvUrl, videoUrl }) => {
  return (
    <Card className="mt-4 candidate-panel_video-file">
      <Card.Body>
        <Row className="align-items-center">
          <Col sm={6} className="text-center file-section">
            {cvUrl ? (
              <a href={cvUrl} download>
                دانلود فایل
              </a>
            ) : (
              <span>فایلی موجود نیست</span>
            )}
          </Col>

          <Col sm={6} className="text-center video-section">
            {videoUrl ? (
              <a href={videoUrl} download>
                دانلود ویدیو
              </a>
            ) : (
              <span>ویدیویی موجود نیست</span>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FileVideoBtn;
