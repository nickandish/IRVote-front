import { Col, Container, Row, Form, Alert } from "react-bootstrap";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import "./addVoterGroup.scss";

const EditVoterGroup = () => {
  const { durationId } = useDuration();
  const location = useLocation();
  const idG = location.state?.idG;

  const [formData, setFormData] = useState({
    groupName: "",
    groupCode: "",
    desc: "",
    times: 1,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const url = API_URLS.GET_VOTER_GROUP.replace(":id", String(durationId));
        const response = await apiClient.get(url);
        console.log(response);
        console.log("response");

        const group = response.data.find(
          (item: any) => item.id === Number(idG)
        );

        if (group) {
          setFormData({
            groupName: group.VoterGroup_Title,
            groupCode: group.VoterGroup_Code,
            desc: group.VoterGroup_Description || "",
            times: group.Coefficient,
          });
        } else {
          setError("گروه رای دهنده یافت نشد.");
        }
      } catch (err) {
        setError("خطا در دریافت اطلاعات گروه رای دهنده.");
        console.error(err);
      }
    };

    if (idG) {
      fetchGroupDetails();
    }
  }, [idG, durationId]);

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
      const url = API_URLS.EDIT_VOTER_GROUP.replace(
        ":id",
        String(durationId)
      ).replace(":idG", String(idG));
      await apiClient.put(url, payload);
      setSuccess("گروه رای دهنده با موفقیت ویرایش شد.");
    } catch (err) {
      setError("خطایی در ویرایش گروه رای دهنده رخ داد.");
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
        <Col className="col-9">ویرایش گروه رای دهنده</Col>
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
              {isSubmitting ? "لطفاً صبر کنید..." : "ویرایش گروه"}
            </button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default EditVoterGroup;
