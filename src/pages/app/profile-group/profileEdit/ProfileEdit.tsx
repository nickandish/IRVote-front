import React, { useState } from "react";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import img from "../../../../assets/download.jpg";
import Toggle from "./Toggle";
import "./profileEdit.scss";
// import PasswordPopUp from "./PasswordPopUp";
import { API_URLS } from "../../../../api/urls";
import apiClient from "../../../../api/axios";

const ProfileEdit: React.FC = () => {
  const [toggle, setToggle] = useState<string | null>(null);
  const [name, setName] = useState<string>("سارا سادات");
  const [lastName, setLastName] = useState<string>("کریمی");
  const [email, setEmail] = useState<string>("email@email.com");
  const [phone, setPhone] = useState<string>("09938023855");
  // const [password, setPassword] = useState<string>("1234");

  const handleToggle = (field: string) => {
    setToggle(toggle === field ? null : field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    const userData = {
      first_name: name,
      last_name: lastName,
      mobile: phone,
      email: email,
    };

    try {
      const token = localStorage.getItem("accessToken");
      const response = await apiClient.put(API_URLS.FILL_PROFILE, userData, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      console.log("User updated successfully:", response.data);
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
              <p>{name}</p>
              <FaChevronLeft className="icon" />
            </button>
            {toggle === "name" && (
              <Toggle title="نام" value={name} onChange={setName} />
            )}
          </Col>
          <Col className="col-12">
            <button
              onClick={() => handleToggle("lastName")}
              className={toggle === "lastName" ? "active" : ""}
            >
              <p>نام خانوادگی:</p>
              <p>{lastName}</p>
              <FaChevronLeft className="icon" />
            </button>
            {toggle === "lastName" && (
              <Toggle
                title="نام خانوادگی"
                value={lastName}
                onChange={setLastName}
              />
            )}
          </Col>
          <Col className="col-12">
            <button
              onClick={() => handleToggle("email")}
              className={toggle === "email" ? "active" : ""}
            >
              <p>ایمیل:</p>
              <p>{email}</p>
              <FaChevronLeft className="icon" />
            </button>
            {toggle === "email" && (
              <Toggle title="ایمیل" value={email} onChange={setEmail} />
            )}
          </Col>
          <Col className="col-12">
            <button
              onClick={() => handleToggle("phone")}
              className={toggle === "phone" ? "active" : ""}
            >
              <p>شماره تماس:</p>
              <p>{phone}</p>
              <FaChevronLeft className="icon" />
            </button>
            {toggle === "phone" && (
              <Toggle title="تماس" value={phone} onChange={setPhone} />
            )}
          </Col>
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
