import { Col, Row } from "react-bootstrap";
import "./toggle.scss";

interface ToggleProps {
  value: string;
  title: string;
  onChange: (value: string) => void;
}

const Toggle: React.FC<ToggleProps> = ({ value, title, onChange }) => {
  return (
    <Row className="toggle-container m-auto">
      <Col className="col-2 text-left">
        <label>{title}</label>
      </Col>
      <Col className="col-10">
        <input placeholder={value} onChange={(e) => onChange(e.target.value)} />
      </Col>
    </Row>
  );
};

export default Toggle;
