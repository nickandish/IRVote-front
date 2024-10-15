import React, { useState } from "react";
import { Col, Container } from "react-bootstrap";
import Select, { SingleValue } from "react-select";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import { API_URLS } from "../../../../api/urls";
import "../ticketEdit/ticketEdit.scss";
import "./ticketAdd.scss";
import apiClient from "../../../../api/axios";
import { useNavigate } from "react-router-dom";

interface Option {
  value: string;
  label: string;
}

const teamOptions: Option[] = [
  { value: "team1", label: "Team 1" },
  { value: "team2", label: "Team 2" },
];

const serviceOptions: Option[] = [
  { value: "service1", label: "Service 1" },
  { value: "service2", label: "Service 2" },
];

const TicketAdd: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Option | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<Option | null>(
    null
  );
  const [selectedServiceName, setSelectedServiceName] = useState<Option | null>(
    null
  );
  const [file, setFile] = useState<File | null>(null);
  const [header, setHeader] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      console.log("Selected-file:", selectedFile);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("header", header);
    formData.append("desc", desc);

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
      <div className="up">
        <Header title="ثبت درخواست" />
        <Navbar />
      </div>
      <Container>
        <div className="ticket-edit ticketAdd">
          <p className="text-center">02/03/01</p>

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

          <div className="select-container">
            <div className="mb-4">
              <Select
                placeholder="تیم مربوط"
                options={teamOptions}
                value={selectedTeam}
                onChange={(newValue: SingleValue<Option>) =>
                  setSelectedTeam(newValue)
                }
                className="select login-card_select"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            </div>
            <div className="mb-4">
              <Select
                placeholder="نوع سرویس"
                options={serviceOptions}
                value={selectedServiceType}
                onChange={(newValue: SingleValue<Option>) =>
                  setSelectedServiceType(newValue)
                }
                className="select login-card_select"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            </div>
            <div className="mb-4">
              <Select
                placeholder="نام سرویس"
                options={serviceOptions}
                value={selectedServiceName}
                onChange={(newValue: SingleValue<Option>) =>
                  setSelectedServiceName(newValue)
                }
                className="select login-card_select"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            </div>
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
