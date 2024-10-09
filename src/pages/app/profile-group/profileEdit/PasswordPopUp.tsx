import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./passwordPopUp.scss";

interface PasswordPopUpProps {
  value: string;
  title: string;
  onChange: (value: string) => void;
}

const PasswordPopUp: React.FC<PasswordPopUpProps> = ({
  title,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Row className="password-popup text-end">
        <Col className="col-12">
          <label>{title}</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={value}
              onChange={(e) => onChange(e.target.value)}
            />
            <span onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FaEye className="text-light" />
              ) : (
                <FaEyeSlash className="text-light" />
              )}
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PasswordPopUp;
