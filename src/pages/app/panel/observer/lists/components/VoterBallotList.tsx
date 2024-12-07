import { useEffect, useState } from "react";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import Loading from "../../../../../../component/loading/Loading";

interface Vote {
  ballot_id: number;
  ballot_title: string;
  vote_confirmed: boolean;
}

interface Voter {
  voter_id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  province: string;
  voter_group: string;
  votes: Vote[];
}

const VoterBallotList: React.FC = () => {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoterBallotList = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(API_URLS.VOTER_BALLOT_LIST);
        setVoters(response.data);
      } catch (err: any) {
        setError(err.message || "خطا در دریافت داده‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchVoterBallotList();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>خطا: {error}</p>;

  return (
    <table className="text-center mt-4 tbl">
      <thead className="text-light">
        <tr>
          <th>نام</th>
          <th>نام خانوادگی</th>
          <th>موبایل</th>
          <th>استان</th>
          <th>گروه رای‌دهنده</th>
          <th>صندوق‌ها</th>
        </tr>
      </thead>
      <tbody>
        {voters.map((voter) => (
          <tr key={voter.voter_id}>
            <td>{voter.first_name}</td>
            <td>{voter.last_name}</td>
            <td>{voter.mobile}</td>
            <td>{voter.province}</td>
            <td>{voter.voter_group}</td>
            <td>
              {voter.votes.map((vote) => (
                <div key={vote.ballot_id}>
                  {vote.ballot_title} -{" "}
                  {vote.vote_confirmed ? "تایید شده" : "تایید نشده"}
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VoterBallotList;
