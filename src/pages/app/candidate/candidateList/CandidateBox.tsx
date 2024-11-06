import { useEffect, useState } from "react";
import { Col, Modal } from "react-bootstrap";
import img from "../../../../assets/femaileAvatar.svg";
import CandidateDetail from "./candidateDetail/CandidateDetail";
import { Candidate } from "../../type";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import { useLocation } from "react-router-dom";
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
  const [isSelected, setIsSelected] = useState(false);

  const location = useLocation();
  const ballotId = location.state?.ballotId as number;

  // Fetch selected candidates to set isSelected initially
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.GET_VOTER_VOTES.replace(":id", ballotId.toString())
        );
        if (response.data.success) {
          const candidateIds = response.data.selected_candidates.map(
            (selected: any) => selected.candidate_id
          );
          setIsSelected(candidateIds.includes(candidate.id));
        }
      } catch (error) {
        console.error("Error fetching selected candidates:", error);
      }
    };
    fetchVotes();
  }, [ballotId, candidate.id]);

  const toggleSelection = async () => {
    const updatedCandidates = isSelected
      ? selectedCandidates.filter((id) => id !== candidate.id)
      : [...selectedCandidates, candidate.id];

    setSelectedCandidates(updatedCandidates);
    setIsSelected(!isSelected);

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
