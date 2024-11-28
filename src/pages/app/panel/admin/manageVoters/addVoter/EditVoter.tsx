import { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import Dropdown from "../../manageCourse/components/DropDown";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";

interface VoterGroup {
  value: string;
  label: string;
}

const EditVoter = () => {
  const { durationId } = useDuration();
  const location = useLocation();
  const idV = location.state?.idV;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    voterGroup: "",
  });

  const [voterGroupOptions, setVoterGroupOptions] = useState<VoterGroup[]>([]);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  // Fetch voter data for editing
  useEffect(() => {
    const fetchVoter = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.GET_VOTER.replace(":id", durationId)
        );
        const voter = response.data.find((v: any) => v.id === Number(idV)); // Fix: Use "id"
        if (voter) {
          setFormData({
            firstName: voter.first_name,
            lastName: voter.last_name,
            email: "",
            mobile: voter.mobile,
            voterGroup: voter.voter_group, // Fix: Pre-fill voter group
          });
        } else {
          setAlert({ type: "danger", message: "رای‌دهنده پیدا نشد" });
        }
      } catch (error) {
        console.error("Error fetching voter details:", error);
        setAlert({
          type: "danger",
          message: "خطا در دریافت اطلاعات رای‌دهنده",
        });
      }
    };

    if (idV) {
      fetchVoter();
    }
  }, [idV, durationId]);

  // Fetch voter groups
  useEffect(() => {
    const fetchVoterGroups = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.GET_VOTER_GROUP.replace(":id", durationId)
        );
        const options = response.data.map((group: any) => ({
          value: group.VoterGroup_Title,
          label: group.VoterGroup_Title,
        }));
        setVoterGroupOptions(options);
      } catch (error) {
        console.error("Error fetching voter groups:", error);
      }
    };

    fetchVoterGroups();
  }, [durationId]);

  // Handle form changes
  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        mobile: formData.mobile,
        voter_group: formData.voterGroup,
      };

      const url = API_URLS.EDIT_VOTER.replace(
        ":id",
        String(durationId)
      ).replace(":idV", String(idV));

      await apiClient.put(url, payload);
      setAlert({ type: "success", message: "رای‌دهنده با موفقیت ویرایش شد" });
    } catch (error) {
      console.error("Error updating voter:", error);
      setAlert({ type: "danger", message: "خطا در ویرایش رای‌دهنده" });
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
        <Col className="col-9">ویرایش رای‌دهنده</Col>
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
        <Form.Group as={Row} className="mb-3" controlId="voterGroup">
          <Form.Label column sm="3" className="text-end">
            گروه رای‌دهنده
          </Form.Label>
          <Col sm="9">
            <Dropdown
              options={voterGroupOptions}
              onChange={(option) => handleChange("voterGroup", option.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm="9" className="btn-add">
            <button type="submit">ویرایش رای‌دهنده</button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default EditVoter;
