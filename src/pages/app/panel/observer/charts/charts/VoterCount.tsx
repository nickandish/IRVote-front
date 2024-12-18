import { useEffect, useState } from "react";
import { API_URLS } from "../../../../../../api/urls";
import apiClient from "../../../../../../api/axios";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import Loading from "../../../../../../component/loading/Loading";

interface VoterCountData {
  total_voters: number;
  Participated_voters_count: number;
  vote_min_limit: number;
}

const VoterCount: React.FC = () => {
  const { observerDurationId } = useDuration();
  const [data, setData] = useState<VoterCountData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!observerDurationId) return;

    apiClient
      .get(API_URLS.VOTER_COUNT.replace(":id", observerDurationId.toString()))
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching voter count data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [observerDurationId]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <div>داده‌ای یافت نشد.</div>;
  }

  const chartData = [
    {
      name: "Voters",
      Participated: data.Participated_voters_count,
      Remaining: data.total_voters - data.Participated_voters_count,
    },
  ];

  return (
    <div style={{ width: "50%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Participated"
            stackId="a"
            fill="#82ca9d"
            name="شرکت کرده‌ها"
          />
          <Bar
            dataKey="Remaining"
            stackId="a"
            fill="#8884d8"
            name="باقی‌مانده‌ها"
          />
          {/* Vote Minimum Limit as a Reference Line */}
          <ReferenceLine
            y={data.vote_min_limit}
            label={{
              value: `حداقل رأی: ${data.vote_min_limit}`,
              position: "insideTopRight",
              fill: "#000",
            }}
            stroke="red"
            strokeDasharray="3 3"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoterCount;
