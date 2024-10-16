import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import img from "../../../../assets/femaileAvatar.svg";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import "./VoteList.scss";

interface Vote {
  candidate: number;
  total: number;
}

interface VoteListProps {
  selectedCandidates: number[];
}

const VoteList: React.FC<VoteListProps> = ({ selectedCandidates }) => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await apiClient.get(`${API_URLS.VOTE_LIST}/${id}`);
        if (response.data.success) {
          setVotes(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVotes();
  }, [id]);

  const getTotalVotes = (): number => {
    return votes.reduce((acc, vote) => acc + vote.total, 0);
  };

  const handleSubmitVotes = async () => {
    try {
      const response = await apiClient.post(API_URLS.ADD_LIST, {
        votes: selectedCandidates,
        ballot_id: 3,
      });
      if (response.data.success) {
        console.log("Votes submitted successfully.");
      } else {
        console.error("Failed to submit votes:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting votes:", error);
    }
  };

  const totalVotes = getTotalVotes();

  return (
    <div className="text-center">
      {loading ? (
        <p>Loading votes...</p>
      ) : (
        <table className="text-center mt-4 tbl">
          <thead className="text-light">
            <tr>
              <th></th>
              <th colSpan={2}>نام کاندید</th>
              <th>تعداد رای‌ها</th>
              <th>درصد رای</th>
              <th>رای شما</th>
            </tr>
          </thead>
          <tbody>
            {votes.map((vote) => (
              <tr key={vote.candidate}>
                <td>
                  <div className="tbl_img">
                    <img src={img} alt="Candidate" />
                  </div>
                </td>
                <td colSpan={2}>کاندید {vote.candidate}</td>
                <td>{vote.total}</td>
                <td>
                  {totalVotes > 0
                    ? ((vote.total / totalVotes) * 100).toFixed(2)
                    : 0}
                  %
                </td>
                <td>
                  <FaCircleCheck />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        className="candidate-list_btn fw-bold mt-5"
        onClick={handleSubmitVotes}
      >
        ثبت نهایی رای
      </button>
    </div>
  );
};

export default VoteList;
