import { Container, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Dropdown from "../../manageCourse/components/DropDown";
import "./addVoter.scss";
import { MdManageHistory } from "react-icons/md";

const AddVoter = () => {
  const provinceOptions = [
    { value: "managers_observers", label: "استان" },
    { value: "managers_only", label: "تهران" },
    { value: "all_users", label: "فارس" },
  ];
  const cityOptions = [
    { value: "managers_observers", label: "شهر" },
    { value: "managers_only", label: "تهران" },
    { value: "all_users", label: "شیراز" },
  ];
  const roleOptions = [
    { value: "managers_observers", label: "ورزشکار" },
    { value: "managers_only", label: "استاد" },
    { value: "all_users", label: "دانشجو" },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalCode: "",
    mobile: "",
    province: provinceOptions[0],
    city: cityOptions[0],
    role: roleOptions[0],
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Container className="add-voter py-4">
      <Row className="manageCourse_header  mb-5">
        <Col className="col-2 icon">
          <MdManageHistory />
        </Col>
        <Col className="col-9">افزودن رای دهنده جدید</Col>
      </Row>

      <Form onSubmit={handleSubmit} className="form-layout">
        <Form.Group as={Row} className="mb-3" controlId="firstName">
          <Form.Label column sm="3" className="text-end">
            نام
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="نام رای دهنده"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="lastName">
          <Form.Label column sm="3" className="text-end">
            نام خانوادگی
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="نام خانوادگی رای دهنده"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="nationalCode">
          <Form.Label column sm="3" className="text-end">
            کد ملی
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="کد ملی"
              value={formData.nationalCode}
              onChange={(e) => handleChange("nationalCode", e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="mobile">
          <Form.Label column sm="3" className="text-end">
            شماره موبایل
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="شماره موبایل"
              value={formData.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="province">
          <Form.Label column sm="3" className="text-end">
            استان
          </Form.Label>
          <Col sm="9">
            <Dropdown
              options={provinceOptions}
              onChange={(option) => handleChange("province", option)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="city">
          <Form.Label column sm="3" className="text-end">
            شهر
          </Form.Label>
          <Col sm="9">
            <Dropdown
              options={cityOptions}
              onChange={(option) => handleChange("city", option)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="role">
          <Form.Label column sm="3" className="text-end">
            ورزشکار
          </Form.Label>
          <Col sm="9">
            <Dropdown
              options={roleOptions}
              onChange={(option) => handleChange("role", option)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3" className="text-end"></Form.Label>
          <Col sm="9" className="btn-add">
            <button type="submit">ثبت کاربر جدید</button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddVoter;
