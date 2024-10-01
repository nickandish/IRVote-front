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
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
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
                <FaEyeSlash className="text-light" />
              ) : (
                <FaEye className="text-light" />
              )}
            </span>
          </div>
        </Col>
        <Col className="col-12">
          <label>رمز عبور جدید</label>
          <div className="password-input">
            <input type={showNewPassword ? "text" : "password"} />
            <span onClick={toggleNewPasswordVisibility}>
              {showNewPassword ? (
                <FaEyeSlash className="text-light" />
              ) : (
                <FaEye className="text-light" />
              )}
            </span>
          </div>
        </Col>
        <Col className="col-12">
          <label> تکرار رمز عبور جدید</label>
          <div className="password-input">
            <input type={showConfirmPassword ? "text" : "password"} />
            <span onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? (
                <FaEyeSlash className="text-light" />
              ) : (
                <FaEye className="text-light" />
              )}
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PasswordPopUp;
