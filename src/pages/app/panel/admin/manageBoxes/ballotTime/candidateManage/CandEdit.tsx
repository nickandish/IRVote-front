import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../../../../../../api/axios";
import { API_URLS } from "../../../../../../../api/urls";
import CandidateDetail from "./candidateEditComponent/CandidateDetail";
import BtnSubmit from "./candidateEditComponent/BtnSubmit";
import TicketCandidate from "./candidateEditComponent/TicketCandidate";
import { Category } from "./CandAdd";
import { Col, Container, Row } from "react-bootstrap";
import { MdManageHistory } from "react-icons/md";
import "../../../../candidate/candidatePanel.scss";

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  Candidate_Confirm_Status: string;
  Image: File | null;
  CV: File | null;
  Video: File | null;
  background: string;
  Ballot_ID: string;
  Description: string;
  CandidateCategory: string;
  Qualified: boolean;
  [key: string]: any;
};

const CandEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const idC = location.state?.idC;
  const id = location.state?.id;

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    Candidate_Confirm_Status: "",
    Image: null,
    CV: null,
    Video: null,
    background: "",
    Ballot_ID: "",
    Description: "",
    CandidateCategory: "",
    Qualified: false,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "danger" | null>(null);

  useEffect(() => {
    console.log(id, idC);
    const fetchCandidate = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.GET_CANDIDATE.replace(":idB", String(id))
        );

        const candidateData = response.data.find(
          (candidate: any) => candidate.id === Number(idC)
        );

        if (candidateData) {
          setFormData((prev) => ({
            ...prev,
            first_name: candidateData.first_name,
            last_name: candidateData.last_name,
            email: candidateData.email,
            mobile: candidateData.mobile,
            Image: candidateData.Image,
            Video: candidateData.Video,
            CV: candidateData.CV,
            Description: candidateData.Description,
            Candidate_Confirm_Status: String(
              candidateData.Candidate_Confirm_Status
            ),
            CandidateCategory: candidateData.CandidateCategory,
            Qualified: candidateData.Qualified || false,
          }));
        }
      } catch (error) {
        setAlertMessage("خطا در بارگذاری اطلاعات کاندید.");
        setAlertType("danger");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.GET_CATEGORIES.replace(":idB", String(id))
        );
        setCategories(response.data);
      } catch (error) {
        setAlertMessage("خطا در بارگذاری دسته‌بندی‌ها.");
        setAlertType("danger");
      }
    };

    fetchCandidate();
    fetchCategories();
  }, [id, idC]);

  const onInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files }: any = e.target;

    if (name === "Image" || name === "CV" || name === "Video") {
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof FormData] !== null) {
        if (key === "Image" || key === "CV" || key === "Video") {
          if (formData[key as keyof FormData] instanceof File) {
            formDataToSend.append(key, formData[key as keyof FormData] as File);
          } else {
            formDataToSend.append(
              key,
              formData[key as keyof FormData] as string
            );
          }
        } else {
          formDataToSend.append(key, formData[key as keyof FormData] as string);
        }
      }
    });

    try {
      const response = await apiClient.put(
        API_URLS.EDIT_CANDIDATE.replace(":idB", String(id)).replace(
          ":idC",
          String(idC)
        ),
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      setAlertMessage("کاندید با موفقیت ویرایش شد.");
      setAlertType("success");

      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 3000);

      navigate(`/admin/manage-boxes/${id}/candidates`);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || "خطا در ویرایش کاندید.";
      setAlertMessage(errorMessage);
      setAlertType("danger");

      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 3000);
    }
  };

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <Container className="candidate-panel candidate-manage">
        {alertMessage && (
          <div
            className={`alert ${
              alertType === "success" ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {alertMessage}
          </div>
        )}
        <Row className="manageCourse_header">
          <Col className="col-2 icon">
            <MdManageHistory />
          </Col>
          <Col className="col-9">مشاهده اطلاعات</Col>
        </Row>

        <CandidateDetail
          formData={formData}
          onInputChange={onInputChange}
          categories={categories}
        />

        <BtnSubmit onSubmit={onSubmit} />

        <Row className="manageCourse_header">
          <Col className="col-2 icon">
            <MdManageHistory />
          </Col>
          <Col className="col-9">درخواست‌ها</Col>
        </Row>
        <TicketCandidate />
      </Container>
    </form>
  );
};

export default CandEdit;
