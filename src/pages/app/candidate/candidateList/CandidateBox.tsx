import { useState } from "react";
import { Col, Modal } from "react-bootstrap";
import img from "../../../../assets/femaileAvatar.svg";
import CandidateDetail from "./candidateDetail/CandidateDetail";
import { Candidate } from "../../type";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import "./candidateBox.scss";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  const ballotId = location.state?.ballotId as number;

  const toggleSelection = async () => {
    const updatedCandidates = isSelected
      ? selectedCandidates.filter((id) => id !== candidate.id)
      : [...selectedCandidates, candidate.id];

    setSelectedCandidates(updatedCandidates);

    try {
      await apiClient.put(
        API_URLS.CANDIDATE_VOTE.replace(":id", ballotId.toString()),
        {
          selected_candidates: updatedCandidates,
        }
      );
      console.log("Candidates updated successfully:", updatedCandidates);
    } catch (error) {
      console.error("Error updating candidates:", error);
    }
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
