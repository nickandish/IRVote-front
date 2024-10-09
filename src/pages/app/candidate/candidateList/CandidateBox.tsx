import { Col } from "react-bootstrap";
import img from "../../../../assets/download.jpg";
import { useState } from "react";
import CandidateDetail from "./candidateDetail/CandidateDetail";
import { Modal } from "react-bootstrap";
import "./candidateBox.scss";
import { Candidate } from "../../type";

interface CandidateBoxProps {
  candidate: Candidate;
}

const CandidateBox: React.FC<CandidateBoxProps> = ({ candidate }) => {
  const [modal, setModal] = useState(false);
  const [vote, setVote] = useState(false);

  return (
    <>
      <Col
        className={`candidateBox col-6 col-md-4 col-lg-3 d-flex flex-column`}
      >
        <Col className="ballot candidateBox_box">
          <div className="rounded-circle img bg-primary">
            <img
              className="rounded-circle"
              src={candidate.ImagePath || img} // Use candidate's ImagePath if available
              onClick={() => {
                setModal(true);
              }}
              alt={candidate.name}
            />
          </div>

          <div className="text-center">
            <p className="p">{candidate.name}</p>
          </div>

          <div className="ballot_button text-center">
            <button
              className="text-light fw-bold"
              onClick={() => {
                setVote(!vote);
              }}
            >
              {!vote ? <> رای دادن به نامزد </> : <>رای داده شد</>}
            </button>
          </div>
        </Col>
      </Col>
      <Modal
        show={modal}
        onHide={() => setModal(false)}
        dialogClassName="custom-modal"
      >
        <CandidateDetail setModal={setModal} />
      </Modal>
    </>
  );
};

export default CandidateBox;
