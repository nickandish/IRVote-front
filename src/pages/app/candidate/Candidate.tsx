import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import VoteList from "./voteList/VoteList";
import CandidateList from "./candidateList/CandidateList";
import { API_URLS } from "../../../api/urls";
import apiClient from "../../../api/axios";
import "./candidate.scss";

const Candidate = () => {
  const [candidateListVisible, setCandidateListVisible] = useState(true);
  const [voteListVisible, setVoteListVisible] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);

  const location = useLocation();
  const ballotId = location.state?.ballotId as number;
  const ballotTitle = location.state?.ballotTitle as string;

  useEffect(() => {
    if (ballotId) {
      const fetchBallots = async () => {
        try {
          await apiClient.get(
            API_URLS.BALLOT_DETAIL.replace(":id", ballotId.toString())
          );
        } catch (error) {
          console.error("Failed to fetch ballot details:", error);
        }
      };
      fetchBallots();
    }
  }, [ballotId]);

  return (
    <>
      <div className="candidate_header">
        <Header title={ballotTitle || "Ballot"} />
      </div>
      <Navbar />
      <div className="candidate">
        <div className="candidate_container">
          <div className="div-6 btnn">
            <button
              className={`candidate_btn fw-bold ${
                candidateListVisible ? "active" : ""
              }`}
              onClick={() => {
                setVoteListVisible(false);
                setCandidateListVisible(true);
              }}
            >
              کاندیدها
            </button>
          </div>
          <div className="btnn div-6">
            <button
              className={`vote_btn fw-bold ${voteListVisible ? "active" : ""}`}
              onClick={() => {
                setVoteListVisible(true);
                setCandidateListVisible(false);
              }}
            >
              رای‌های من
            </button>
          </div>
        </div>
        {voteListVisible && <VoteList />}
        {candidateListVisible && (
          <CandidateList
            setVoteListVisible={setVoteListVisible}
            setCandidateListVisible={setCandidateListVisible}
            ballotId={ballotId}
            selectedCandidates={selectedCandidates}
            setSelectedCandidates={setSelectedCandidates}
          />
        )}
      </div>
    </>
  );
};

export default Candidate;
