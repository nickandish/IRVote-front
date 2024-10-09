import { useState } from "react";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import VoteList from "./voteList/VoteList";
import CandidateList from "./candidateList/CandidateList";
import "./candidate.scss";

const Candidate = () => {
  const [candidateList, setCandidateList] = useState<boolean>(true);
  const [voteList, setVoteList] = useState<boolean>(false);

  const durationId = "5"; // Replace with the actual logic to get election ID

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

        {voteList && <VoteList />}
        {candidateList && (
          <CandidateList
            setVoteList={setVoteList}
            setCandidateList={setCandidateList}
            durationId={durationId}
          />
        )}
      </div>
    </>
  );
};

export default Candidate;
