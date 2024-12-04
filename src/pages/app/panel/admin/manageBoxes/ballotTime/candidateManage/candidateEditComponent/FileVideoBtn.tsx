import React from "react";
import { Card, Col, Row, Form } from "react-bootstrap";

interface FileVideoBtnProps {
  formData: {
    CV: File | null;
    Video: File | null;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileVideoBtn: React.FC<FileVideoBtnProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <Card className="mt-4 candidate-panel_video-file">
      <Card.Body>
        <Row className="align-items-center">
          <Col sm={6} className="text-center file-section">
            <span>فایل پیوست کاندید</span>
            <Form.Group controlId="CV" className="mt-3">
              <Form.Label>آپلود فایل</Form.Label>
              <Form.Control
                type="file"
                name="CV"
                onChange={onInputChange}
                accept=".pdf, .doc, .docx"
              />
            </Form.Group>
          </Col>

          <Col sm={6} className="text-center video-section">
            <span className="video-label">ویدیو پیوست کاندید</span>
            <Form.Group controlId="Video" className="mt-3">
              <Form.Label>آپلود ویدیو</Form.Label>
              <Form.Control
                type="file"
                name="Video"
                onChange={onInputChange}
                accept="video/*"
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FileVideoBtn;
