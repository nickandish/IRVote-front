import { useEffect, useState } from "react";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import { useLocation } from "react-router-dom";
import Loading from "../../../component/loading/Loading";
import { API_URLS } from "../../../api/urls";
import apiClient from "../../../api/axios";
import img from "../../../assets/femaileAvatar.svg";
import "../candidate/voteList/VoteList.scss";
import "./result.scss";

interface Candidate {
  candidate_id: number;
  candidate_name: string;
  weighted_votes: number;
  percentage: number;
  candidate_image?: string;
}

interface ResultData {
  Main_count: number;
  Reserve_count: number;
  total_voters: number;
  results: Candidate[];
}

const Result = () => {
  const location = useLocation();
  const ballotId = location.state?.ballotId;
  const ballotTitle = location.state?.ballotTitle as string;

  const [resultData, setResultData] = useState<ResultData | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.RESULT.replace(":id", ballotId.toString())
        );
        if (response.data.success) {
          setResultData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    if (ballotId) {
      fetchResults();
    }
  }, [ballotId]);

  return (
    <>
      <Header title={ballotTitle} />
      <Navbar />

      <div className="result">
        {resultData ? (
          <table className="text-center mt-4 tbl dang">
            <thead className="text-light">
              <tr>
                <th>عکس</th>
                <th>نام کاندید</th>
                <th>تعداد رای</th>
                <th>درصد رای</th>
              </tr>
            </thead>
            <tbody>
              {resultData.results.map((candidate, index) => {
                let rowClass = "";
                if (index < resultData.Main_count) {
                  rowClass = "accept";
                } else if (
                  index <
                  resultData.Main_count + resultData.Reserve_count
                ) {
                  rowClass = "blue";
                }

                return (
                  <tr key={candidate.candidate_id} className={rowClass}>
                    <td>
                      <div className="candidate-img">
                        <img
                          src={candidate.candidate_image || img}
                          alt={candidate.candidate_name}
                          className="candidate-profile-img"
                        />
                      </div>
                    </td>
                    <td>{candidate.candidate_name}</td>
                    <td>{candidate.weighted_votes}</td>
                    <td>{candidate.percentage.toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Result;
