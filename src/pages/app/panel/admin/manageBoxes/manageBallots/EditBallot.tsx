import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { API_URLS } from "../../../../../../api/urls";
import apiClient from "../../../../../../api/axios";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import Loading from "../../../../../../component/loading/Loading";
import MenuPanel from "../../../menu/MenuPanel";
import BallotWrapper from "../BallotWrapper";

const EditBallot = () => {
  const { id } = useParams<{ id: string }>();
  const { durationId } = useDuration();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Ballot_Farsi_Title: "",
    Ballot_Type: 0,
    Main_count: 1,
    Reserve_count: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchBallot = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.GET_BALLOT.replace(":id", id!)
        );
        const ballot = response.data.find(
          (b: any) => b.id === parseInt(durationId!)
        );

        if (ballot) {
          setFormData({
            Ballot_Farsi_Title: ballot.Ballot_Farsi_Title,
            Ballot_Type: ballot.Ballot_Type,
            Main_count: ballot.Main_count,
            Reserve_count: ballot.Reserve_count,
          });
        } else {
          setError("صندوق مورد نظر پیدا نشد.");
        }
      } catch (err) {
        console.error("Error fetching ballot:", err);
        setError("خطا در دریافت اطلاعات صندوق.");
      } finally {
        setLoading(false);
      }
    };

    if (id && durationId) {
      fetchBallot();
    }
  }, [id, durationId]);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDelete = async () => {
    if (!window.confirm("آیا از حذف صندوق اطمینان دارید؟")) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const url = API_URLS.DEL_BALLOT.replace(":idB", id!);
      await apiClient.delete(url);
      setSuccess("صندوق با موفقیت حذف شد.");
      navigate(`/admin/manage-boxes`);
    } catch (err) {
      console.error("Error deleting ballot:", err);
      setError("خطا در حذف صندوق.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const url = API_URLS.EDIT_BALLOT.replace(":id", durationId!).replace(
        ":idB",
        id!
      );

      await apiClient.put(url, formData);
      setSuccess("صندوق با موفقیت ویرایش شد.");
      navigate(`/admin/manage-boxes/${id}`);
    } catch (err) {
      console.error("Error editing ballot:", err);
      setError("خطا در ویرایش صندوق.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <BallotWrapper />
      <Container className="editBallot addGroup add-voter">
        <Row className="manageCourse_header voterGroupHeader mb-5">
          <Col className="col-2 icon">
            <AiOutlineUsergroupAdd />
          </Col>
          <Col className="col-9">ویرایش صندوق</Col>
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
            <Col sm="6" className="text-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "لطفاً صبر کنید..." : "ثبت تغییرات"}
              </button>
            </Col>
            <Col sm="6" className="text-start">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "لطفاً صبر کنید..." : "حذف صندوق"}
              </button>
            </Col>
          </Form.Group>
        </Form>
      </Container>{" "}
    </>
  );
};

export default EditBallot;
