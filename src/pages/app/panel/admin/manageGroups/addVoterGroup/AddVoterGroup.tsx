import { Col, Container, Row, Form, Alert } from "react-bootstrap";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useState } from "react";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import "./addVoterGroup.scss";

const AddVoterGroup = () => {
  const { durationId } = useDuration();
  const [formData, setFormData] = useState({
    groupName: "",
    groupCode: "",
    desc: "",
    times: 1,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleIncrement = () => {
    setFormData({ ...formData, times: formData.times + 1 });
  };

  const handleDecrement = () => {
    if (formData.times > 1) {
      setFormData({ ...formData, times: formData.times - 1 });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const payload = {
      Coefficient: formData.times,
      VoterGroup_Code: formData.groupCode,
      VoterGroup_Title: formData.groupName,
      VoterGroup_Description: formData.desc,
    };

    try {
      const url = API_URLS.NEW_VOTER_GROUP.replace(":id", String(durationId));
      const response = await apiClient.post(url, payload);
      setSuccess("گروه رای دهنده با موفقیت ثبت شد.");
      console.log("Response:", response.data);
    } catch (err) {
      setError("خطایی در ثبت گروه رای دهنده رخ داد.");
      console.error(err);
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
        <Col className="col-9">افزودن گروه رای دهنده جدید</Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit} className="form-layout">
        <Form.Group as={Row} className="mb-3" controlId="groupName">
          <Form.Label column sm="3" className="text-end">
            نام
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="نام رای دهنده"
              value={formData.groupName}
              onChange={(e) => handleChange("groupName", e.target.value)}
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="groupCode">
          <Form.Label column sm="3" className="text-end">
            کد گروه
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="کد گروه"
              value={formData.groupCode}
              onChange={(e) => handleChange("groupCode", e.target.value)}
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="desc">
          <Form.Label column sm="3" className="text-end">
            توضیحات
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="توضیحات"
              value={formData.desc}
              onChange={(e) => handleChange("desc", e.target.value)}
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="times">
          <Form.Label column sm="3" className="text-end">
            ضریب
          </Form.Label>
          <Col sm="9" className="d-flex addGroup_btn-container">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={formData.times <= 1 || isSubmitting}
              className="me-2"
            >
              کم کردن
            </button>
            <p className="mb-0">{formData.times}x</p>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={isSubmitting}
              className="ms-2"
            >
              اضافه کردن
            </button>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm="12" className="text-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "لطفاً صبر کنید..." : "ثبت گروه جدید"}
            </button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddVoterGroup;
