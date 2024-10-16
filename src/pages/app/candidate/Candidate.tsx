import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import VoteList from "./voteList/VoteList";
import CandidateList from "./candidateList/CandidateList";
import "./candidate.scss";

const Candidate = () => {
  const { id } = useParams<{ id: string }>();
  const [candidateList, setCandidateList] = useState<boolean>(true);
  const [voteList, setVoteList] = useState<boolean>(false);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);

  const { state } = useLocation();
  const { minVote = 0, maxVote = 0 } = state || {}; // Default values if state is undefined

  return (
    <>
      <div className="candidate_header">
        <Header title="انتخابات انجمن اسلامی دانشگاه تهران-غرب" />
      </div>
      <Navbar />
      <div className="candidate">
        <div className="candidate_container">
          <div className="div-6 btnn">
            <button
              className={`candidate_btn fw-bold ${
                candidateList ? "active" : ""
              }`}
              onClick={() => {
                setVoteList(false);
                setCandidateList(true);
              }}
            >
              کاندیدها
            </button>
          </div>
          <div className="div-6 btnn">
            <button
              className={`vote_btn fw-bold ${voteList ? "active" : ""}`}
              onClick={() => {
                setVoteList(true);
                setCandidateList(false);
              }}
            >
              رای‌های من
            </button>
          </div>
        </div>
        {voteList && <VoteList selectedCandidates={selectedCandidates} />}
        {candidateList && (
          <CandidateList
            setVoteList={setVoteList}
            setCandidateList={setCandidateList}
            durationId={id || ""}
            selectedCandidates={selectedCandidates}
            setSelectedCandidates={setSelectedCandidates}
            minVote={minVote}
            maxVote={maxVote}
          />
        )}
      </div>
    </>
  );
};

export default Candidate;
