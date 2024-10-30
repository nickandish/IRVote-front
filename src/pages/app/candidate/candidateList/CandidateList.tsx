import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import CandidateBox from "./CandidateBox";
import { Candidate } from "../../type";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import Loading from "../../../../component/loading/Loading";
import ErrorPage from "../../../../component/error/ErrorPage";
import "./candidateBox.scss";

interface CandidateListProps {
  setVoteListVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCandidateListVisible: React.Dispatch<React.SetStateAction<boolean>>;
  ballotId: number;
  selectedCandidates: number[];
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>;
  minVote: number;
  maxVote: number;
}

const CandidateList: React.FC<CandidateListProps> = ({
  setVoteListVisible,
  setCandidateListVisible,
  ballotId,
  selectedCandidates,
  setSelectedCandidates,
  minVote,
  maxVote,
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.BALLOT_DETAIL.replace(":id", ballotId.toString())
        );
        console.log("Fetched Data:", response.data); // Log response for debugging
        if (response.data.success && Array.isArray(response.data.data)) {
          setCandidates(response.data.data); // Set candidates directly from `data`
        } else {
          setError(response.data.message || "Failed to fetch candidates");
        }
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Error fetching candidates");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, [ballotId]);

  const handleViewVotesClick = () => {
    setCandidateListVisible(false);
    setVoteListVisible(true);
  };

  const isSubmitDisabled =
    selectedCandidates.length < minVote || selectedCandidates.length > maxVote;

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div className="candidate_list text-center">
      <p className="fw-bold pp p-4">
        با کلیک بر روی عکس نامزدها توضیحات بیشتر را مشاهده کنید
      </p>
      <div className="ballots candidate-list fw-bold">
        <Row className="g-3">
          {candidates && candidates.length > 0 ? (
            candidates.map((candidate) => (
              <CandidateBox
                key={candidate.id}
                candidate={candidate}
                selectedCandidates={selectedCandidates}
                setSelectedCandidates={setSelectedCandidates}
              />
            ))
          ) : (
            <p>No candidates available</p>
          )}
        </Row>
      </div>
      {isSubmitDisabled && (
        <p className="fw-bold danger">
          انتخاب باید بین {minVote} و {maxVote} باشد
        </p>
      )}
      <button
        className="candidate-list_btn fw-bold"
        onClick={handleViewVotesClick}
        disabled={isSubmitDisabled}
      >
        مشاهده رای‌های من
      </button>
    </div>
  );
};

export default CandidateList;
