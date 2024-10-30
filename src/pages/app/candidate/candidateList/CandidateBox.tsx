import { useState } from "react";
import { Col, Modal } from "react-bootstrap";
import img from "../../../../assets/femaileAvatar.svg";
import CandidateDetail from "./candidateDetail/CandidateDetail";
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
  const [modalVisible, setModalVisible] = useState(false);
  const isSelected = selectedCandidates.includes(candidate.id);

  const toggleSelection = () => {
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
              src={candidate.Image || img}
              onClick={() => setModalVisible(true)}
              alt={candidate.user.first_name}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = img;
              }}
            />
          </div>
          <div className="text-center">
            <p className="p">
              {candidate.user.first_name}
              <span> {candidate.user.last_name}</span>
            </p>
          </div>
          <div className="ballot_button text-center">
            <button className="text-light fw-bold" onClick={toggleSelection}>
              {isSelected ? <>حذف کاندید</> : <>انتخاب کاندید</>}
            </button>
          </div>
        </Col>
      </Col>
      <Modal
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        dialogClassName="custom-modal"
      >
        <CandidateDetail candidate={candidate} setModal={setModalVisible} />
      </Modal>
    </>
  );
};

export default CandidateBox;
