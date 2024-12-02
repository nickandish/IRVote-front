import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import apiClient from "../../../../../../../api/axios";
import { API_URLS } from "../../../../../../../api/urls";
import { useParams } from "react-router-dom";

const AddCategories = () => {
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    Ballot_CandidateCategory_Title: "",
    Min_Allowed_Selection: 1,
    Max_Allowed_Selection: 3,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await apiClient.post(
        API_URLS.ADD_CATEGORIES.replace(":idB", id!),
        formData
      );
      setSuccess(response.data.detail || "دسته‌بندی با موفقیت اضافه شد.");
      setFormData({
        Ballot_CandidateCategory_Title: "",
        Min_Allowed_Selection: 1,
        Max_Allowed_Selection: 3,
      });
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "خطایی در ثبت دسته‌بندی رخ داده است."
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
    }
  };

  return (
    <Container className="addGroup add-voter add-category">
      <Row className="manageCourse_header voterGroupHeader mb-5">
        <Col className="col-2 icon">
          <AiOutlineUsergroupAdd />
        </Col>
        <Col className="col-9">افزودن دسته‌بندی جدید</Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit} className="form-layout">
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="Ballot_CandidateCategory_Title"
        >
          <Form.Label column sm="3" className="text-end">
            نام دسته‌بندی
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="نام دسته‌بندی"
              value={formData.Ballot_CandidateCategory_Title}
              onChange={(e) =>
                handleChange("Ballot_CandidateCategory_Title", e.target.value)
              }
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="Min_Allowed_Selection">
          <Form.Label column sm="3" className="text-end">
            حداقل انتخاب
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="number"
              min="1"
              value={formData.Min_Allowed_Selection}
              onChange={(e) =>
                handleChange("Min_Allowed_Selection", Number(e.target.value))
              }
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="Max_Allowed_Selection">
          <Form.Label column sm="3" className="text-end">
            حداکثر انتخاب
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="number"
              min={formData.Min_Allowed_Selection}
              value={formData.Max_Allowed_Selection}
              onChange={(e) =>
                handleChange("Max_Allowed_Selection", Number(e.target.value))
              }
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm="12" className="text-end">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="btn-add-category"
            >
              {isSubmitting ? "در حال ثبت..." : "ثبت دسته‌بندی"}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddCategories;
