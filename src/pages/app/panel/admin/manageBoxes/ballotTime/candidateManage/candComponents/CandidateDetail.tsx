import React, { useState, useEffect } from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { LuImagePlus } from "react-icons/lu";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import img from "../../../../../../../../assets/femaileAvatar.svg";

interface CandidateDetailProps {
  formData: {
    first_name: string;
    last_name: string;
    Image: File | null;
    mobile: string;
    email: string;
    CandidateCategory: string;
    Candidate_Confirm_Status: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  categories: {
    id: number;
    Ballot_CandidateCategory_Title: string;
  }[];
}

const CandidateDetail: React.FC<CandidateDetailProps> = ({
  formData,
  onInputChange,
  categories,
}) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<boolean>(
    formData.Candidate_Confirm_Status === "1"
  );

  useEffect(() => {
    if (formData.Candidate_Confirm_Status === undefined) {
      const event = {
        target: { name: "Candidate_Confirm_Status", value: "0" },
      } as React.ChangeEvent<HTMLInputElement>;

      onInputChange(event);
    }
  }, [formData.Candidate_Confirm_Status, onInputChange]);

  const handleUploadFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setImageSrc(URL.createObjectURL(file));

        const customEvent = {
          target: {
            name: "Image",
            files: [file],
          },
        };

        onInputChange(customEvent as any);
      }
    };

    input.click();
  };

  const handleConfirmToggle = () => {
    const newStatus = status ? "0" : "1";
    setStatus(!status);

    const event = {
      target: { name: "Candidate_Confirm_Status", value: newStatus },
    } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

    onInputChange(event);
  };

  return (
    <Card className="candidate-detail-panel p-4">
      <Row className="align-items-center">
        <Col xs={3} className="text-center">
          <div className="profile-pic">
            <img
              src={
                imageSrc ||
                (formData.Image ? URL.createObjectURL(formData.Image) : img)
              }
              className="rounded-circle"
              alt="Candidate Avatar"
            />
            <div className="image-overlay">
              <LuImagePlus className="icon" onClick={handleUploadFile} />
            </div>
          </div>
        </Col>

        <Col xs={7}>
          <Row className="mb-2">
            <Col xs={6} className="label">
              وضعیت:
            </Col>
            <Col xs={6} className="value">
              {formData.Candidate_Confirm_Status === "1" ? (
                <p> تایید شده</p>
              ) : (
                <p> تایید نشده</p>
              )}
              <button onClick={handleConfirmToggle}>
                {status ? "تایید شده" : "تایید کردن کاندید"}
              </button>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="label">
              نام:
            </Col>
            <Col xs={6} className="value">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={onInputChange}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="label">
              نام خانوادگی:
            </Col>
            <Col xs={6} className="value">
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={onInputChange}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="label">
              شماره موبایل:
            </Col>
            <Col xs={6} className="value">
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={onInputChange}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="label">
              ایمیل:
            </Col>
            <Col xs={6} className="value">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className="label">
              گروه کاندید:
            </Col>
            <Col xs={6} className="value">
              <Dropdown
                onSelect={(id: string | null) => {
                  if (id) {
                    onInputChange({
                      target: { name: "CandidateCategory", value: id },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }
                }}
              >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {formData.CandidateCategory || "انتخاب گروه"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((category) => (
                    <Dropdown.Item
                      key={category.id}
                      eventKey={category.id.toString()}
                    >
                      {category.Ballot_CandidateCategory_Title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Col>

        <Col xs={2} className="text-center">
          <Row className="mb-3">
            {formData.Candidate_Confirm_Status === "1" ? (
              <FaRegCircleCheck className="action-icon" />
            ) : (
              <FaRegCircleXmark className="action-icon" />
            )}
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default CandidateDetail;
