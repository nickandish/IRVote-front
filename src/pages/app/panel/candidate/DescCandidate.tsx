import { Card, Form } from "react-bootstrap";
import { useState } from "react";
import { FaPen, FaSave } from "react-icons/fa";
import "./candidatePanel.scss";

interface DescCandidateProps {
  description: string;
  onSave: (newDescription: string) => void;
}

const DescCandidate: React.FC<DescCandidateProps> = ({
  description,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(description);

  const handleSave = () => {
    onSave(tempDescription);
    setIsEditing(false);
  };

  return (
    <Card className="mt-4 candidate-panel_desc">
      <Card.Body>
        <h5 className="desc-title mb-3">توضیحات کاندید درباره خود:</h5>
        {isEditing ? (
          <>
            <Form.Control
              as="textarea"
              rows={3}
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
            />
            <FaSave onClick={handleSave} />
          </>
        ) : (
          <>
            <p className="desc-text">{description || "توضیحی موجود نیست"}</p>
            <FaPen onClick={() => setIsEditing(true)} />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default DescCandidate;
