import { Card, Col, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import img from "../../../../assets/femaileAvatar.svg";
import { FaPen } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import "./candidatePanel.scss";
import { FaSave } from "react-icons/fa";

interface Candidate {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  image: File | null;
  cv: File | null;
  video: File | null;
  description: string;
}

const CandidateDetail: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [candidate, setCandidate] = useState<Candidate>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    image: null,
    cv: null,
    video: null,
    description: "",
  });

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleChange = (field: keyof Candidate, value: string) => {
    setCandidate((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof Candidate, file: File | null) => {
    setCandidate((prev) => ({ ...prev, [field]: file }));
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await apiClient.get(API_URLS.GET_CANDIDATE_PANEL);
        const data = response.data;
        setCandidate({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          image: null, // Images aren't directly retrievable via GET, usually a URL is returned
          cv: null,
          video: null,
          description: data.description || "",
        });
      } catch (error) {
        console.error("Failed to fetch candidate data", error);
      }
    };

    fetchCandidate();
  }, []);

  // Save candidate data on form submit
  const saveCandidate = async () => {
    const formData = new FormData();
    formData.append("first_name", candidate.firstName);
    formData.append("last_name", candidate.lastName);
    formData.append("email", candidate.email);
    formData.append("mobile", candidate.mobile);
    if (candidate.image) formData.append("Image", candidate.image);
    if (candidate.cv) formData.append("CV", candidate.cv);
    if (candidate.video) formData.append("Video", candidate.video);
    formData.append("Description", candidate.description);

    try {
      await apiClient.put(API_URLS.PUT_CANDIDATE_PANEL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Candidate details updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update candidate details", error);
      alert("Failed to update candidate details.");
    }
  };

  return (
    <Card className="candidate-detail-panel p-4">
      <Row className="align-items-center">
        <Col xs={3} className="text-center">
          <div className="profile-pic">
            <img src={img} className="rounded-circle" alt="Candidate Avatar" />
            <div className="image-overlay">
              <LuImagePlus className="icon" />
            </div>
          </div>
        </Col>

        <Col xs={7}>
          <Row className="mb-2">
            <Col xs={6} className="label">
              نام:
            </Col>
            <Col xs={6} className="value">
              {isEditing ? (
                <Form.Control
                  type="text"
                  value={candidate.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              ) : (
                candidate.firstName
              )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="label">
              نام خانوادگی:
            </Col>
            <Col xs={6} className="value">
              {isEditing ? (
                <Form.Control
                  type="text"
                  value={candidate.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              ) : (
                candidate.lastName
              )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="label">
              ایمیل:
            </Col>
            <Col xs={6} className="value">
              {isEditing ? (
                <Form.Control
                  type="email"
                  value={candidate.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              ) : (
                candidate.email
              )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="label">
              موبایل:
            </Col>
            <Col xs={6} className="value">
              {isEditing ? (
                <Form.Control
                  type="text"
                  value={candidate.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                />
              ) : (
                candidate.mobile
              )}
            </Col>
          </Row>
        </Col>

        <Col xs={2} className="text-center">
          {isEditing ? (
            <FaSave className="action-icon" onClick={saveCandidate} />
          ) : (
            <FaPen className="action-icon" onClick={toggleEdit} />
          )}
        </Col>
      </Row>

      {isEditing && (
        <Form.Group controlId="description" className="mt-3">
          <Form.Label>توضیحات:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={candidate.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Form.Group>
      )}

      <Row className="mt-3">
        <Col xs={6}>
          <Form.Group controlId="fileUpload">
            <Form.Label>آپلود تصویر:</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                handleFileChange(
                  "image",
                  target.files ? target.files[0] : null
                );
              }}
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group controlId="cvUpload">
            <Form.Label>آپلود رزومه:</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                handleFileChange("cv", target.files ? target.files[0] : null);
              }}
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group controlId="videoUpload" className="mt-3">
            <Form.Label>آپلود ویدیو:</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                handleFileChange(
                  "video",
                  target.files ? target.files[0] : null
                );
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </Card>
  );
};

export default CandidateDetail;
