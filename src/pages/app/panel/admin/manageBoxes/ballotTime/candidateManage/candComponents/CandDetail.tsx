import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdManageHistory } from "react-icons/md";
import CandidateDetail from "./CandidateDetail";
import FileVideoBtn from "./FileVideoBtn";
import DescCandidate from "./DescCandidate";
import BtnSubmit from "./BtnSubmit";
import TicketCandidate from "./TicketCandidate";
import { Category } from "../CandAdd";

interface CandDetailProps {
  formData: {
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
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (event: React.FormEvent) => void;
  categories: Category[];
}

const CandDetail: React.FC<CandDetailProps> = ({
  formData,
  onInputChange,
  onSubmit,
  categories,
}) => {
  return (
    <Container className="candidate-panel candidate-manage">
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
      <FileVideoBtn formData={formData} onInputChange={onInputChange} />
      <DescCandidate formData={formData} onInputChange={onInputChange} />
      <BtnSubmit onSubmit={onSubmit} />

      <Row className="manageCourse_header">
        <Col className="col-2 icon">
          <MdManageHistory />
        </Col>
        <Col className="col-9">درخواست‌ها</Col>
      </Row>
      <TicketCandidate />
    </Container>
  );
};

export default CandDetail;
