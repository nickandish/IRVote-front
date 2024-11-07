import React, { useState, useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import { API_URLS } from "../../../../api/urls";
import apiClient from "../../../../api/axios";
import { useNavigate } from "react-router-dom";
import "../ticketEdit/ticketEdit.scss";
import "./ticketAdd.scss";

const TicketAdd: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [header, setHeader] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [dateFormat, setDateFormat] = useState<string>("");
  const [displayDate, setDisplayDate] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();
    const iranDate = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Tehran",
    }).format(date);
    setDateFormat(date.toISOString().replace(/\.\d{3}Z$/, "Z"));
    setDisplayDate(iranDate);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log("Selected-file:", e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("header", header);
    formData.append("desc", desc);
    formData.append("start_at", dateFormat);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await apiClient.post(API_URLS.TICKET_CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      navigate("/ticketList");
    } catch (error) {
      console.error("Error submitting the ticket:", error);
    }
  };

  return (
    <>
      <Header title="ثبت درخواست" />
      <Navbar />
      <Container>
        <div className="ticket-edit ticketAdd">
          <p className="text-center">{displayDate}</p>

          <div className="mb-4">
            <input
              placeholder="موضوع درخواست"
              id="form1"
              type="text"
              className="input login-card_input"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            />
          </div>

          <textarea
            id="comments"
            name="comments"
            placeholder="درخواست خود را وارد کنید"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Col className="btn-container">
            <button className="submit" onClick={handleSubmit}>
              ارسال درخواست
            </button>
            <input
              type="file"
              id="fileInput"
              className="upload"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button className="upload" onClick={handleUploadClick}>
              آپلود فایل
            </button>
          </Col>
        </div>
      </Container>
    </>
  );
};

export default TicketAdd;
