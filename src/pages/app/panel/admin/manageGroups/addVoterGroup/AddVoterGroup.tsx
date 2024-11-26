import { Col, Container, Row, Form } from "react-bootstrap";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useState } from "react";
import "./addVoterGroup.scss";

const AddVoterGroup = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    groupCode: "",
    desc: "",
    times: 1,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Container className="addGroup add-voter">
      <Row className="manageCourse_header voterGroupHeader mb-5">
        <Col className="col-2 icon">
          <AiOutlineUsergroupAdd />
        </Col>
        <Col className="col-9">افزودن گروه رای دهنده جدید</Col>
      </Row>

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
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="times">
          <Form.Label column sm="3" className="text-end">
            ضریب
          </Form.Label>
          <Col sm="9" className="d-flex addGroup_btn-container">
            <button
              onClick={handleDecrement}
              disabled={formData.times <= 1}
              className="me-2"
            >
              کم کردن
            </button>
            <p className="mb-0">{formData.times}x</p>
            <button onClick={handleIncrement} className="ms-2">
              اضافه کردن
            </button>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="times">
          <Form.Label column sm="3" className="text-end"></Form.Label>
          <Col sm="9">
            <div className="addGroup_submit mt-5">
              <button type="submit">ثبت گروه جدید</button>
            </div>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddVoterGroup;
