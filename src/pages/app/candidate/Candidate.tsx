import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import VoteList from "./voteList/VoteList";
import CandidateList from "./candidateList/CandidateList";
import apiClient from "../../../api/axios";
import { API_URLS } from "../../../api/urls";
import "./candidate.scss";

const Candidate = () => {
  const { id } = useParams<{ id: string }>();
  const [candidateList, setCandidateList] = useState<boolean>(true);
  const [voteList, setVoteList] = useState<boolean>(false);
  const [userID, setUserID] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get(API_URLS.GET_USER);
        if (response.data.success) {
          setUserID(response.data.data.id);
        } else {
          setError(response.data.message || "Failed to fetch user data");
        }
      } catch (err) {
        setError("Error fetching user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="loader">درحال بارگیری...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

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

        {voteList && userID && <VoteList userID={userID} />}
        {candidateList && userID && (
          <CandidateList
            setVoteList={setVoteList}
            setCandidateList={setCandidateList}
            durationId={id || ""}
            userID={userID}
          />
        )}
      </div>
    </>
  );
};

export default Candidate;
