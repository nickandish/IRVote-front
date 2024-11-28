import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useParams } from "react-router-dom";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";

const DocManage = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    Document_Farsi_Title: "",
    Document_File_Url: "",
    Description: "",
    Document_image: null,
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [docId, setDocId] = useState("");

  const translateError = (errorMessage: string) => {
    const translations: Record<string, string> = {
      "این صندوق رای قبلاً یک مستند دارد و نمی‌توانید مستند دیگری اضافه کنید.":
        "این صندوق رای قبلاً یک مستند دارد و نمی‌توانید مستند دیگری اضافه کنید.",
      "مستند مورد نظر یافت نشد.": "مستند مورد نظر یافت نشد.",
    };

    return translations[errorMessage] || "خطای ناشناخته‌ای رخ داده است.";
  };

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.GET_DOC.replace(":id", String(id))
        );
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setIsEditMode(true);
          setDocId(data[0]?.id);
          console.log(data);
          console.log(docId);
          setFormData(data[0]);
        } else {
          setIsEditMode(false);
        }
      } catch (err) {
        setError("خطا در دریافت اطلاعات سند.");
        console.error(err);
      }
    };

    if (id) fetchDocument();
  }, [id]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const url = isEditMode
        ? API_URLS.EDIT_DOC.replace(":idB", String(id)).replace(":idD", docId)
        : API_URLS.ADD_DOC.replace(":idB", String(id));
      const method = isEditMode ? "put" : "post";

      await apiClient[method](url, formData);
      setSuccess(
        isEditMode ? "سند با موفقیت ویرایش شد." : "سند با موفقیت اضافه شد."
      );

      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      const errorResponse = err.response?.data;
      if (Array.isArray(errorResponse)) {
        setError(translateError(errorResponse[0]));
      } else if (typeof errorResponse === "object" && errorResponse.detail) {
        setError(translateError(errorResponse.detail));
      } else {
        setError("خطای ناشناخته‌ای رخ داده است.");
      }

      setTimeout(() => setError(null), 3000);
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
        <Col className="col-9">{isEditMode ? "ویرایش سند" : "افزودن سند"}</Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit} className="form-layout">
        <Form.Group as={Row} className="mb-3" controlId="Document_Farsi_Title">
          <Form.Label column sm="3" className="text-end">
            عنوان فارسی سند
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="عنوان فارسی سند"
              value={formData.Document_Farsi_Title}
              onChange={(e) =>
                handleChange("Document_Farsi_Title", e.target.value)
              }
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="Document_File_Url">
          <Form.Label column sm="3" className="text-end">
            آدرس فایل سند
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="url"
              placeholder="آدرس فایل سند"
              value={formData.Document_File_Url}
              onChange={(e) =>
                handleChange("Document_File_Url", e.target.value)
              }
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="Description">
          <Form.Label column sm="3" className="text-end">
            توضیحات
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="توضیحات"
              value={formData.Description}
              onChange={(e) => handleChange("Description", e.target.value)}
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="Document_image">
          <Form.Label column sm="3" className="text-end">
            تصویر سند
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="file"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                handleChange("Document_image", target.files?.[0] || null);
              }}
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="file">
          <Form.Label column sm="3" className="text-end">
            فایل سند
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="file"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                handleChange("file", target.files?.[0] || null);
              }}
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
              {isSubmitting
                ? "لطفاً صبر کنید..."
                : isEditMode
                ? "ویرایش سند"
                : "افزودن سند"}
            </button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default DocManage;
