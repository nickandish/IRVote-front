import React, { useState } from "react";
import { Col, Container } from "react-bootstrap";
import Select, { SingleValue } from "react-select";
import axios from "axios";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import "../ticketEdit/ticketEdit.scss";
import "./ticketAdd.scss";

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
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const data = {
      team: selectedTeam,
      serviceType: selectedServiceType,
      serviceName: selectedServiceName,
      comments: (document.getElementById("comments") as HTMLTextAreaElement)
        .value,
    };

    formData.append("data", JSON.stringify(data));

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title="ثبت درخواست" />
      <Navbar />
      <Container>
        <div className="ticket-edit ticketAdd">
          <p className="text-center">02/03/01</p>
          <div className="mb-4">
            <input
              placeholder="موضوع درخواست"
              id="form1"
              type="text"
              className="input login-card_input"
            />
          </div>

          <div className="mb-4">
            <Select
              placeholder="تیم مربوط"
              options={teamOptions}
              value={selectedTeam}
              onChange={(newValue: SingleValue<Option>) =>
                setSelectedTeam(newValue)
              }
              className="select login-card_select"
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
            />
          </div>

          <textarea
            id="comments"
            name="comments"
            placeholder="Enter your comments here..."
          />
          <Col className="btn-container ">
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
