import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import Loading from "../../../../../../component/loading/Loading";

interface CandidateResult {
  candidate_id: number;
  candidate_name: string;
  weighted_votes: number;
  percentage: number;
}

interface BallotData {
  Main_count: number;
  Reserve_count: number;
  results: CandidateResult[];
}

const CandidateVoteResult = () => {
  const [ballotData, setBallotData] = useState<any>(null);
  const { observerDurationId } = useDuration();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.CANDIDATE_RESULT_CHART.replace(
            ":id",
            String(observerDurationId)
          )
        );
        setBallotData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [observerDurationId]);

  if (!ballotData) return <Loading />;

  return (
    <Container className="obs-list candidate-chart">
      <h3 className="mt-5">فعالیت رای دهندگان</h3>
      {Object.keys(ballotData).map((ballotName) => (
        <div key={ballotName}>
          <h4>{ballotName}</h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={600}
              height={400}
              data={transformChartData(ballotData[ballotName])}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="weighted_votes" name="تعداد آراء">
                {transformChartData(ballotData[ballotName]).map(
                  (entry, index) => (
                    <Cell key={`cell-${index}`} className={entry.className} />
                  )
                )}
              </Bar>
              <Bar dataKey="percentage" name="درصد آراء">
                {transformChartData(ballotData[ballotName]).map(
                  (entry, index) => (
                    <Cell key={`cell-${index}`} className={entry.className} />
                  )
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </Container>
  );
};

function transformChartData(ballot: BallotData) {
  const { results, Main_count, Reserve_count } = ballot;

  return results.map((candidate: CandidateResult, index: number) => {
    let className = "red-bar";
    if (index < Main_count) {
      className = "green-bar";
    } else if (index < Main_count + Reserve_count) {
      className = "blue-bar";
    }

    return {
      name: candidate.candidate_name,
      weighted_votes: candidate.weighted_votes,
      percentage: candidate.percentage,
      className,
    };
  });
}

export default CandidateVoteResult;
