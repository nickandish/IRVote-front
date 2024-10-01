import React, { useState } from "react";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import img from "../../../../assets/download.jpg";
import Toggle from "./Toggle";
import "./profileEdit.scss";
import PasswordPopUp from "./PasswordPopUp";

const ProfileEdit: React.FC = () => {
  const [toggle, setToggle] = useState<string | null>(null);
  const [name, setName] = useState<string>("سارا سادات کریمی");
  const [email, setEmail] = useState<string>("email@email.com");
  const [phone, setPhone] = useState<string>("09938023855");
  const [password, setPassword] = useState<string>("1234");

  const handleToggle = (field: string) => {
    setToggle(toggle === field ? null : field);
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
          <Col className="col-12">
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
          </Col>
        </Row>
        <Row className="profile-edit_btn">
          <button>ثبت تغییرات</button>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileEdit;
