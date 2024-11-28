import { useState } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";

const AddBallot = () => {
  const [formData, setFormData] = useState({
    Ballot_Farsi_Title: "",
    Ballot_Type: 0,
    Main_count: 1,
    Reserve_count: 0,
  });
  const { durationId } = useDuration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await apiClient.post(
        API_URLS.ADD_BALLOT.replace(":id", durationId),
        formData
      );
      setSuccess("صندوق جدید با موفقیت اضافه شد.");
      setFormData({
        Ballot_Farsi_Title: "",
        Ballot_Type: 0,
        Main_count: 1,
        Reserve_count: 0,
      });
    } catch (err) {
      console.error("Error adding ballot:", err);
      setError("خطا در اضافه کردن صندوق.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="addGroup add-voter">
      <Row className="manageCourse_header voterGroupHeader mb-5">
        <Col className="col-2 icon">
          <AiOutlineUsergroupAdd />
        </Col>
        <Col className="col-9">افزودن صندوق جدید</Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit} className="form-layout">
        <Form.Group as={Row} className="mb-3" controlId="Ballot_Farsi_Title">
          <Form.Label column sm="3" className="text-end">
            نام صندوق
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="نام صندوق"
              value={formData.Ballot_Farsi_Title}
              onChange={(e) =>
                handleChange("Ballot_Farsi_Title", e.target.value)
              }
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="Ballot_Type">
          <Form.Label column sm="3" className="text-end">
            نوع صندوق
          </Form.Label>
          <Col sm="9">
            <Form.Select
              value={formData.Ballot_Type}
              onChange={(e) =>
                handleChange("Ballot_Type", parseInt(e.target.value))
              }
              disabled={isSubmitting}
            >
              <option value={0}>سند</option>
              <option value={1}>کاندید</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="Main_count">
          <Form.Label column sm="3" className="text-end">
            تعداد اصلی
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="number"
              value={formData.Main_count}
              onChange={(e) =>
                handleChange("Main_count", parseInt(e.target.value))
              }
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="Reserve_count">
          <Form.Label column sm="3" className="text-end">
            تعداد رزرو
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="number"
              value={formData.Reserve_count}
              onChange={(e) =>
                handleChange("Reserve_count", parseInt(e.target.value))
              }
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm="12" className="text-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "لطفاً صبر کنید..." : "ثبت صندوق جدید"}
            </button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddBallot;
