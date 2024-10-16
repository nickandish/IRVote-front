import { Col } from "react-bootstrap";
import img from "../../../../assets/femaileAvatar.svg";
import { useState } from "react";
import CandidateDetail from "./candidateDetail/CandidateDetail";
import { Modal } from "react-bootstrap";
import { Candidate } from "../../type";
import "./candidateBox.scss";

interface CandidateBoxProps {
  candidate: Candidate;
  selectedCandidates: number[];
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>;
}

const CandidateBox: React.FC<CandidateBoxProps> = ({
  candidate,
  selectedCandidates,
  setSelectedCandidates,
}) => {
  const [modal, setModal] = useState(false);
  const isSelected = selectedCandidates.includes(candidate.id);

  const toggleSelect = () => {
    setSelectedCandidates((prev) =>
      isSelected
        ? prev.filter((id) => id !== candidate.id)
        : [...prev, candidate.id]
    );
  };

  return (
    <>
      <Col
        className={`candidateBox col-6 col-md-4 col-lg-3 d-flex flex-column ${
          isSelected ? "selected" : ""
        }`}
      >
        <Col className="ballot candidateBox_box">
          <div className="rounded-circle img">
            <img
              className="rounded-circle"
              src={candidate.ImagePath || img}
              onClick={() => setModal(true)}
              alt={candidate.name}
            />
          </div>
          <div className="text-center">
            <p className="p">{candidate.name}</p>
          </div>
          <div className="ballot_button text-center">
            <button className="text-light fw-bold" onClick={toggleSelect}>
              {isSelected ? <>حذف کاندید</> : <>انتخاب کاندید</>}
            </button>
          </div>
        </Col>
      </Col>
      <Modal
        show={modal}
        onHide={() => setModal(false)}
        dialogClassName="custom-modal"
      >
        <CandidateDetail candidate={candidate} setModal={setModal} />
      </Modal>
    </>
  );
};

export default CandidateBox;
