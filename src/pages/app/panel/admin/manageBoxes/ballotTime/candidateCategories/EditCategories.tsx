import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { API_URLS } from "../../../../../../../api/urls";
import apiClient from "../../../../../../../api/axios";
import "../../../manageVoters/manageVoters.scss";

const EditCategories = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const { category } = state;
  const [formData, setFormData] = useState({
    Ballot_CandidateCategory_Title:
      category.Ballot_CandidateCategory_Title || "",
    Min_Allowed_Selection: category.Min_Allowed_Selection || 1,
    Max_Allowed_Selection: category.Max_Allowed_Selection || 3,
    idCat: category.id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedCategory = {
      Ballot_CandidateCategory_Title: formData.Ballot_CandidateCategory_Title,
      Min_Allowed_Selection: formData.Min_Allowed_Selection,
      Max_Allowed_Selection: formData.Max_Allowed_Selection,
    };

    try {
      const response = await apiClient.put(
        API_URLS.EDIT_CATEGORIES.replace(":idB", String(id)).replace(
          ":idCat",
          String(formData.idCat)
        ),
        updatedCategory
      );
      console.log(response);
      setSuccess("با موفقیت آپدیت شد!");
    } catch (err) {
      setError("مشکلی پیش آمده لطفا دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="addGroup add-voter add-category">
      <Row className="manageCourse_header voterGroupHeader mb-5">
        <Col className="col-2 icon">
          <AiOutlineUsergroupAdd />
        </Col>
        <Col className="col-9">ویرایش دسته‌بندی</Col>
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
              {isSubmitting ? "در حال ثبت..." : "ثبت تغییرات"}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default EditCategories;
