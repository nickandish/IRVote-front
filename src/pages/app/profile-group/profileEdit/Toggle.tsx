import React from "react";
import "./toggle.scss";
import { Col, Row } from "react-bootstrap";

interface ToggleProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
}

const Toggle: React.FC<ToggleProps> = ({ title, value, onChange }) => {
  return (
    <Row className="toggle-container m-auto">
      <Col className="col-2 text-left">
        <label htmlFor={title}>{title}:</label>
      </Col>
      <Col className="col-10">
        <input
          id={title}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Col>
    </Row>
  );
};

export default Toggle;
