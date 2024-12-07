import React, { useEffect, useState } from "react";
import { Card, Col, Dropdown, Row, Form } from "react-bootstrap";
import { LuImagePlus } from "react-icons/lu";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import img from "../../../../../../../../assets/femaileAvatar.svg";
import "../../../../../candidate/candidatePanel.scss";

interface CandidateDetailProps {
  formData: {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    Candidate_Confirm_Status: string;
    Image: File | null | undefined;
    CV: File | null;
    Video: File | null;
    background: string;
    Ballot_ID: string;
    Description: string;
    CandidateCategory: string;
    Qualified: boolean | (() => boolean);
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
  const [isQualified, setIsQualified] = useState<boolean>(formData.Qualified);

  useEffect(() => {
    console.log(formData);
    setIsQualified(formData.Qualified ? 1 : 0);
  }, [formData]);

  const handleQualifiedToggle = (value: number) => {
    setIsQualified(value);

    const event = {
      target: {
        name: "Qualified",
        value: value === 1 ? "true" : "false",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onInputChange(event);
  };

  const handleUploadFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
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

  const getImageSrc = () => {
    if (formData.Image instanceof File) {
      return URL.createObjectURL(formData.Image);
    }
    return formData.Image || img;
  };
  const getVideoSrc = () => {
    if (formData.Video instanceof File) {
      return URL.createObjectURL(formData.Video);
    }
    return formData.Video || img;
  };
  const getCVSrc = () => {
    if (formData.CV instanceof File) {
      return URL.createObjectURL(formData.CV);
    }
    return formData.CV || img;
  };

  return (
    <>
      <Card className="candidate-detail-panel p-4">
        <Row className="align-items-center">
          <Col xs={3} className="text-center">
            <div className="profile-pic">
              <img
                src={getImageSrc()}
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
                تایید صلاحیت:
              </Col>
              <Col xs={6} className="value">
                <Form.Check
                  type="radio"
                  id="qualifiedYes"
                  label="بله"
                  name="Qualified"
                  value="1"
                  checked={isQualified === 1}
                  onChange={() => handleQualifiedToggle(1)}
                />
                <Form.Check
                  type="radio"
                  id="qualifiedNo"
                  label="خیر"
                  name="Qualified"
                  value="0"
                  checked={isQualified === 0}
                  onChange={() => handleQualifiedToggle(0)}
                />
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
                <label htmlFor="CandidateCategory" style={{ display: "none" }}>
                  {formData.CandidateCategory}
                </label>

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
                    {categories.find(
                      (category) =>
                        category.id.toString() === formData.CandidateCategory
                    )?.Ballot_CandidateCategory_Title || "انتخاب گروه"}
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

      <Card className="mt-4 candidate-panel_desc">
        <Card.Body>
          <h5 className="desc-title mb-3">توضیحات کاندید درباره خود:</h5>
          <Form.Group controlId="Description">
            <Form.Label>توضیحات</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="Description"
              value={formData.Description}
              onChange={onInputChange}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      <Card className="mt-4 candidate-panel_video-file">
        <Card.Body>
          <Row className="align-items-center">
            <Col sm={6} className="text-center file-section">
              <span>فایل پیوست کاندید</span>
              <Form.Group controlId="CV" className="mt-3">
                <Form.Label>آپلود فایل</Form.Label>
                <Form.Control
                  type="file"
                  name="CV"
                  onChange={onInputChange}
                  accept=".pdf, .doc, .docx"
                />
              </Form.Group>
            </Col>

            <Col sm={6} className="text-center video-section">
              <span className="video-label">ویدیو پیوست کاندید</span>
              <Form.Group controlId="Video" className="mt-3">
                <Form.Label>آپلود ویدیو</Form.Label>
                <Form.Control
                  type="file"
                  name="Video"
                  onChange={onInputChange}
                  accept="video/*"
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
        <Card.Body>
          {formData.CV && (
            <div>
              <a href={getCVSrc()} download={formData.CV.name}>
                دانلود CV
              </a>
            </div>
          )}

          {formData.Video && (
            <div className="text-center">
              <video controls>
                <source src={getVideoSrc()} type="video/mp4" />
                مرورگر شما این ویدیو را ساپورت نمیکند
              </video>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CandidateDetail;
