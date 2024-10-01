import { Col } from "react-bootstrap";
import "./toggle.scss";

interface ToggleProps {
  value: string;
  title: string;
  onChange: (value: string) => void;
}

const Toggle: React.FC<ToggleProps> = ({ value, title, onChange }) => {
  return (
    <Col className="toggle-container">
      <label>{title}</label>
      <input placeholder={value} onChange={(e) => onChange(e.target.value)} />
    </Col>
  );
};

export default Toggle;
