import { Col } from "react-bootstrap";
import img from "../../../../assets/download.jpg";
import { useState } from "react";
import CandidateDetail from "./candidateDetail/CandidateDetail";
import { Modal } from "react-bootstrap";
import "./candidateBox.scss";
import { Candidate } from "../../type";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";

interface CandidateBoxProps {
  candidate: Candidate;
  userID: number;
}

const CandidateBox: React.FC<CandidateBoxProps> = ({ candidate, userID }) => {
  const [modal, setModal] = useState(false);
  const [vote, setVote] = useState(false);

  const handleVote = async () => {
    try {
      console.log("Candidate ballot:", candidate.ballot);

      const response = await apiClient.post(
        API_URLS.CONFIRM_VOTE.replace(":id", String(candidate.ballot)),
        {
          votes: [userID, candidate.user],
        }
      );

      if (response.data.success) {
        setVote(true);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during voting:", error);
    }
  };

  return (
    <>
      <Col
        className={`candidateBox col-6 col-md-4 col-lg-3 d-flex flex-column`}
      >
        <Col className="ballot candidateBox_box">
          <div className="rounded-circle img bg-primary">
            <img
              className="rounded-circle"
              src={candidate.ImagePath || img}
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
            <button className="text-light fw-bold" onClick={handleVote}>
              {!vote ? <>رای دادن به نامزد</> : <>رای داده شد</>}
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
