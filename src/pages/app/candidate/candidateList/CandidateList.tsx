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
}

const CandidateList: React.FC<CandidateListProps> = ({
  setVoteListVisible,
  setCandidateListVisible,
  ballotId,
  selectedCandidates,
  setSelectedCandidates,
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [minVote, setMinVote] = useState<number>(0);
  const [maxVote, setMaxVote] = useState<number>(0);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.BALLOT_DETAIL.replace(":id", ballotId.toString())
        );
        if (response.data.success && Array.isArray(response.data.data)) {
          setCandidates(response.data.data);
          setMinVote(response.data.data[0]?.min_allowed_selection || 0);
          setMaxVote(response.data.data[0]?.max_allowed_selection || 0);
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

    const fetchSelectedCandidates = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.GET_VOTER_VOTES.replace(":id", ballotId.toString())
        );
        if (response.data.success) {
          const fetchedSelectedCandidates =
            response.data.selected_candidates.map(
              (selected: any) => selected.candidate_id
            );
          setSelectedCandidates(fetchedSelectedCandidates);
        }
      } catch (error) {
        console.error("Error fetching selected candidates:", error);
      }
    };

    const fetchConfirmStatus = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.CONFIRM_STATUS.replace(":id", ballotId.toString())
        );
        if (response.data) {
          setConfirmed(response.data.data.confirmed);
        }
      } catch (err) {
        console.error("Error fetching confirmation status:", err);
      }
    };

    fetchCandidates();
    fetchSelectedCandidates();
    fetchConfirmStatus();
  }, [ballotId, setSelectedCandidates]);

  const handleViewVotesClick = () => {
    setCandidateListVisible(false);
    setVoteListVisible(true);
  };

  const isSubmitDisabled =
    selectedCandidates.length < minVote || selectedCandidates.length > maxVote;

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div className={`text-center ${confirmed ? "disable" : ""}`}>
      <p className="fw-bold pp p-4">
        با کلیک بر روی عکس نامزدها توضیحات بیشتر را مشاهده کنید
      </p>
      <div className="fw-bold container">
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
