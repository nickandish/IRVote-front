import { useState } from "react";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import VoteList from "./voteList/VoteList";
import CandidateList from "./candidateList/CandidateList";
import "./candidate.scss";

const Candidate = () => {
  const [candidateList, setCondidateList] = useState<boolean>(true);
  const [voteList, setVoteList] = useState<boolean>(false);
  return (
    <>
      <Header title="انتخابات انجمن اسلامی دانشگاه تهران-غرب" />
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
                setCondidateList(true);
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
                setCondidateList(false);
              }}
            >
              رای‌های من
            </button>
          </div>
        </div>

        {voteList && <VoteList />}
        {candidateList && <CandidateList />}
      </div>
    </>
  );
};

export default Candidate;
