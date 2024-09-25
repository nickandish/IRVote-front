import { Row } from "react-bootstrap";
import CandidateBox from "./CandidateBox";
import "./candidateBox.scss";

const CandidateList = () => {
  return (
    <div className="candidate_list text-center">
      <p className="fw-bold pp p-4">
        با کلیک بر روی عکس نامزدها توضیحات بیشتر را مشاهده کنید
      </p>

      <div className="ballots candidate-list fw-bold">
        <Row className="g-3">
          <CandidateBox />
          <CandidateBox />
          <CandidateBox />
          <CandidateBox />
          <CandidateBox />
          <CandidateBox />
          <CandidateBox />
          <CandidateBox />
        </Row>
        <button className="candidate-list_btn fw-bold">ثبت نهایی رای</button>
      </div>
    </div>
  );
};

export default CandidateList;
