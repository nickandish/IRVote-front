import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BtnSubmit from "./BtnSubmit";
import CandidateDetail from "./CandidateDetail";
import DescCandidate from "./DescCandidate";
import FileVideoBtn from "./FileVideoBtn";
import TicketCandidate from "./TicketCandidate";
import { MdManageHistory } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import { IoHome } from "react-icons/io5";
import MenuPanel from "../menu/MenuPanel";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import "./candidatePanel.scss";

interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  imageUrl: string | null;
  imageFile: File | null;
  cvUrl: string | null;
  videoUrl: string | null;
  description: string;
}

const CandidatePanel = () => {
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState<Candidate>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    imageUrl: null,
    imageFile: null,
    cvUrl: null,
    videoUrl: null,
    description: "",
  });

  // Fetch candidate data on mount
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await apiClient.get(API_URLS.GET_CANDIDATE_PANEL);
        const data = response.data;
        setCandidate({
          id: data.id,
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          imageUrl: data.Image || null,
          imageFile: null,
          cvUrl: data.CV || null,
          videoUrl: data.Video || null,
          description: data.Description || "",
        });
      } catch (error) {
        console.error("Failed to fetch candidate data", error);
      }
    };

    fetchCandidate();
  }, []);

  // Save changes to the server
  const saveCandidate = async () => {
    const formData = new FormData();
    formData.append("first_name", candidate.firstName);
    formData.append("last_name", candidate.lastName);
    formData.append("email", candidate.email);
    formData.append("mobile", candidate.mobile);
    if (candidate.imageFile) formData.append("Image", candidate.imageFile);
    if (candidate.cvUrl) formData.append("CV", candidate.cvUrl);
    if (candidate.videoUrl) formData.append("Video", candidate.videoUrl);
    formData.append("Description", candidate.description);

    try {
      await apiClient.put(API_URLS.PUT_CANDIDATE_PANEL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Candidate details updated successfully!");
    } catch (error) {
      console.error("Failed to update candidate details", error);
      alert("Failed to update candidate details.");
    }
  };

  const handleDescriptionSave = (newDescription: string) => {
    setCandidate((prev) => ({ ...prev, description: newDescription }));
  };

  const menuItems = [
    { title: "برگشت به خانه", icon: <IoHome />, path: "/profile" },
    {
      title: "نمایش نموداری",
      icon: <MdManageHistory />,
      path: "/observerPanel/chart",
    },
    {
      title: "لاگ‌های رای دهنده",
      icon: <TiGroupOutline />,
      path: "/observerPanel/voter-logs",
    },
    {
      title: "لاگ‌های کاندیدها",
      icon: <MdManageHistory />,
      path: "/observerPanel/candidate-logs",
    },
    {
      title: "لاگ‌های صندوق‌ها",
      icon: <TiGroupOutline />,
      path: "/observerPanel/ballot-logs",
    },
  ];

  return (
    <div>
      <MenuPanel
        menuItems={menuItems}
        header="پنل نظارتی"
        onMenuItemClick={(path) => navigate(path)}
      />
      <Container className="candidate-panel">
        <Row className="manageCourse_header">
          <Col className="col-2 icon">
            <MdManageHistory />
          </Col>
          <Col className="col-9">مشاهده اطلاعات</Col>
        </Row>
        <CandidateDetail candidate={candidate} setCandidate={setCandidate} />
        <FileVideoBtn cvUrl={candidate.cvUrl} videoUrl={candidate.videoUrl} />
        <DescCandidate
          description={candidate.description}
          onSave={handleDescriptionSave}
        />
        <BtnSubmit onSubmit={saveCandidate} />

        <Row className="manageCourse_header">
          <Col className="col-2 icon">
            <MdManageHistory />
          </Col>
          <Col className="col-9">درخواست‌ها</Col>
        </Row>
        <TicketCandidate />
      </Container>
    </div>
  );
};

export default CandidatePanel;
