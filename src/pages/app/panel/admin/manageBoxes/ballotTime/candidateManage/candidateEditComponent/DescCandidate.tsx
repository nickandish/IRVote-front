import React, { useEffect } from "react";
import { Card, Form } from "react-bootstrap";

interface DescCandidateProps {
  formData: {
    Description: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const DescCandidate: React.FC<DescCandidateProps> = ({
  formData,
  onInputChange,
}) => {
  useEffect(() => {
    console.log(formData);
  }, []);

  return (
    <Card className="mt-4 candidate-panel_desc">
      <Card.Body>
        <h5 className="desc-title mb-3">توضیحات کاندید درباره خود:</h5>
        <Form.Group controlId="Description">
          <Form.Label>توضیحات</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="Description"
            value={formData.Description}
            onChange={onInputChange}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default DescCandidate;
