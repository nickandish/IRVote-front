import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import CandidateBox from "./CandidateBox";
import { Candidate } from "../../type";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import "./candidateBox.scss";

interface CandidateListProps {
  setVoteList: (value: boolean) => void;
  setCandidateList: (value: boolean) => void;
  durationId: string;
  userID: number;
}

const CandidateList: React.FC<CandidateListProps> = ({
  setVoteList,
  setCandidateList,
  durationId,
  userID,
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await apiClient.get(
          `${API_URLS.CANDIDATE_LIST}/${durationId}`
        );
        if (response.data.success) {
          setCandidates(response.data.data.items);
        } else {
          setError(response.data.message || "Failed to fetch candidates");
        }
      } catch (err) {
        setError("Error fetching candidates");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [durationId]);

  const handleClick = () => {
    setCandidateList(false);
    setVoteList(true);
  };

  if (loading) return <div className="loader">درحال بارگیری...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="candidate_list text-center">
      <p className="fw-bold pp p-4">
        با کلیک بر روی عکس نامزدها توضیحات بیشتر را مشاهده کنید
      </p>

      <div className="ballots candidate-list fw-bold">
        <Row className="g-3">
          {candidates.map((candidate) => (
            <CandidateBox
              key={candidate.id}
              candidate={candidate}
              userID={userID}
            />
          ))}
        </Row>
        <button className="candidate-list_btn fw-bold" onClick={handleClick}>
          مشاهده رای‌های من
        </button>
      </div>
    </div>
  );
};

export default CandidateList;
