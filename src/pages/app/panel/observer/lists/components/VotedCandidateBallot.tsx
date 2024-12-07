import { useEffect, useState } from "react";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import Loading from "../../../../../../component/loading/Loading";

interface CandidateResult {
  candidate_id: number;
  candidate_name: string;
  candidate_image: string | null;
  weighted_votes: number;
  percentage: number;
}

interface BallotData {
  Main_count: number;
  Reserve_count: number;
  total_voters: number;
  results: CandidateResult[];
}

interface BallotResponse {
  success: boolean;
  message: string;
  data: Record<string, BallotData>;
}

const VotedCandidateBallots: React.FC = () => {
  const [ballotData, setBallotData] = useState<Record<string, BallotData>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBallotResults = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<BallotResponse>(
          API_URLS.VOTED_CANDIDATE_BALLOTS
        );
        if (response.data.success) {
          setBallotData(response.data.data);
        } else {
          setError("خطا در دریافت داده‌ها");
        }
      } catch (err: any) {
        setError(err.message || "خطا در ارتباط با سرور");
      } finally {
        setLoading(false);
      }
    };

    fetchBallotResults();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>خطا: {error}</p>;

  return (
    <div className="mt-4">
      {Object.entries(ballotData).map(([ballotName, ballotDetails]) => (
        <div key={ballotName} className="mb-4">
          <h3>صندوق: {ballotName}</h3>
          <p>تعداد رأی‌دهندگان: {ballotDetails.total_voters}</p>
          <p>رأی اصلی: {ballotDetails.Main_count}</p>
          <p>رأی ذخیره: {ballotDetails.Reserve_count}</p>
          <table className="tbl text-center mt-2">
            <thead>
              <tr>
                <th>شناسه کاندید</th>
                <th>نام کاندید</th>
                <th>تصویر</th>
                <th>آرای وزنی</th>
                <th>درصد رأی</th>
              </tr>
            </thead>
            <tbody>
              {ballotDetails.results.map((candidate: CandidateResult) => (
                <tr key={candidate.candidate_id}>
                  <td>{candidate.candidate_id}</td>
                  <td>{candidate.candidate_name}</td>
                  <td>
                    {candidate.candidate_image ? (
                      <img
                        src={candidate.candidate_image}
                        alt={candidate.candidate_name}
                        width={50}
                      />
                    ) : (
                      "تصویری موجود نیست"
                    )}
                  </td>
                  <td>{candidate.weighted_votes}</td>
                  <td>{candidate.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default VotedCandidateBallots;
