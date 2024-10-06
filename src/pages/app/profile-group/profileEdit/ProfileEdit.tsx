import React, { useState } from "react";
import { Card, Container, Row, Col, Navbar } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import img from "../../../../assets/download.jpg";
import Toggle from "./Toggle";
import "./profileEdit.scss";
// import PasswordPopUp from "./PasswordPopUp";
import { useUser } from "../../../../api/contextApi/UserContext";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import { useNavigate } from "react-router-dom";
import Header from "../../../navbar/Header";

const ProfileEdit: React.FC = () => {
  const [toggle, setToggle] = useState<string | null>(null);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleToggle = (field: string) => {
    setToggle(toggle === field ? null : field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        first_name: user.firstName,
        last_name: user.lastName,
        mobile: user.mobileNumber,
        email: user.email,
      };

      const response = await apiClient.put(API_URLS.FILL_PROFILE, payload);

      if (response.data.success) {
        console.log("User updated successfully", response.data);

        // Optionally update the global user state if backend returns updated data
        setUser({
          firstName: payload.first_name,
          lastName: payload.last_name,
          email: payload.email,
          mobileNumber: payload.mobile,
        });

        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="profile-edit-page">
      <div className="head">
        <Header title="ویرایش پروفایل" />
        <Navbar />
      </div>

      <Container className="profile-edit">
        <Row className="text-center">
          <div className="rounded-circle profile-edit_img">
            <img src={img} className="rounded-circle" alt="Profile" />
            <LuImagePlus className="icon" />
          </div>
        </Row>
        <Row className="text-center profile-edit_field">
          <Col className="col-12">
            <button
              onClick={() => handleToggle("name")}
              className={toggle === "name" ? "active" : ""}
            >
              <p>نام:</p>
              <p>{user.firstName}</p>
              <FaChevronLeft className="icon" />
            </button>
            {toggle === "name" && (
              <Toggle
                title="نام"
                value={user.firstName}
                onChange={(value) => setUser({ ...user, firstName: value })}
              />
            )}
          </Col>
          <Col className="col-12">
            <button
              onClick={() => handleToggle("lastName")}
              className={toggle === "lastName" ? "active" : ""}
            >
              <p>نام خانوادگی:</p>
              <p>{user.lastName}</p>
              <FaChevronLeft className="icon" />
            </button>
            {toggle === "lastName" && (
              <Toggle
                title="نام خانوادگی"
                value={user.lastName}
                onChange={(value) => setUser({ ...user, lastName: value })}
              />
            )}
          </Col>
          <Col className="col-12">
            <button
              onClick={() => handleToggle("email")}
              className={toggle === "email" ? "active" : ""}
            >
              <p>ایمیل:</p>
              <p>{user.email}</p>
              <FaChevronLeft className="icon" />
            </button>
            {toggle === "email" && (
              <Toggle
                title="ایمیل"
                value={user.email}
                onChange={(value) => setUser({ ...user, email: value })}
              />
            )}
          </Col>
          <Col className="col-12">
            <button
              onClick={() => handleToggle("phone")}
              className={toggle === "phone" ? "active" : ""}
            >
              <p>شماره تماس:</p>
              <p>{user.mobileNumber}</p>
              <FaChevronLeft className="icon" />
            </button>
            {toggle === "phone" && (
              <Toggle
                title="تماس"
                value={user.mobileNumber}
                onChange={(value) => setUser({ ...user, mobileNumber: value })}
              />
            )}
          </Col>
          {/* Uncomment and implement if password change is needed */}
          {/* <Col className="col-12">
            <button
              onClick={() => handleToggle("password")}
              className={toggle === "password" ? "active" : ""}
            >
              <p>تغییر رمز عبور</p>
              <FaChevronLeft className="icon" />
            </button>
            {toggle === "password" && (
              <PasswordPopUp
                title=" رمز عبور فعلی"
                value="*******"
                onChange={setPassword}
              />
            )}
          </Col> */}
        </Row>
        <Row className="profile-edit_btn">
          <button onClick={handleSubmit}>ثبت تغییرات</button>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileEdit;
