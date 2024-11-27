import { Container, Form, Row, Col, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import Dropdown from "../../manageCourse/components/DropDown";
import { IoPersonAdd } from "react-icons/io5";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import "./addVoter.scss";

interface DropdownOption {
  value: number;
  label: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  province: DropdownOption;
  city: DropdownOption;
  role: DropdownOption | null;
}

const AddVoter = () => {
  const { durationId } = useDuration();

  const provinceOptions: DropdownOption[] = [
    { value: 0, label: "استان" },
    { value: 1, label: "تهران" },
  ];

  const cityOptions: DropdownOption[] = [
    { value: 0, label: "شهر" },
    { value: 1, label: "تهران" },
    { value: 2, label: "دماوند" },
  ];

  const [roleOptions, setRoleOptions] = useState<DropdownOption[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    province: provinceOptions[0],
    city: cityOptions[0],
    role: null,
  });
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  useEffect(() => {
    const fetchRoleOptions = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.GET_VOTER_GROUP.replace(":id", String(durationId))
        );
        const options = response.data.map((group: any) => ({
          value: group.id,
          label: group.VoterGroup_Title,
        }));
        setRoleOptions(options);
        if (options.length > 0) {
          setFormData((prev) => ({ ...prev, role: options[0] }));
        }
      } catch (error) {
        console.error("Error fetching role options:", error);
      }
    };

    fetchRoleOptions();
  }, []);

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      mobile: formData.mobile,
      province: formData.province.value,
      city: formData.city.value,
      Voter_Group: formData.role?.value,
    };

    try {
      const response = await apiClient.post(
        API_URLS.ADD_VOTER.replace(":id", String(durationId)),
        payload
      );
      console.log("Voter added successfully:", response.data);
      setAlert({ type: "success", message: "رای‌دهنده با موفقیت اضافه شد" });
    } catch (error: any) {
      console.error("Error adding voter:", error);
      setAlert({
        type: "danger",
        message: error.response?.data.detail || "خطا در افزودن رای‌دهنده",
      });
    } finally {
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <Container className="add-voter py-4">
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}
      <Row className="manageCourse_header mb-5">
        <Col className="col-2 icon">
          <IoPersonAdd />
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
        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm="3" className="text-end">
            ایمیل
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="email"
              placeholder="ایمیل"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
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
