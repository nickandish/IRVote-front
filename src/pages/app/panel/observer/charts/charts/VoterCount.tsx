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
  LabelList,
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
      name: "رای دهندگان",
      Participated: data.Participated_voters_count,
      Remaining: data.total_voters - data.Participated_voters_count,
    },
  ];

  // Calculate participation percentage
  const participationPercentage =
    (data.Participated_voters_count / data.vote_min_limit) * 100;

  // Determine the gradient based on the participation percentage
  const getParticipationGradient = () => {
    if (participationPercentage <= 2) return "#b40000, #ff0034"; // 0-2%
    if (participationPercentage <= 25) return "#ff0034, #f38906"; // 2-25%
    if (participationPercentage <= 50) return "#f38906, #d5dd23"; // 25-50%
    if (participationPercentage <= 75) return "#d5dd23, #a6dd23"; // 50-75%
    if (participationPercentage < 100) return "#a6dd23, #00a693"; // 75-100%
    return "#00a693, #04b610"; // 100%
  };

  return (
    <div
      className="voterCount"
      style={{ width: "100%", height: 400, maxWidth: "20rem" }}
    >
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
          <defs>
            <linearGradient
              id="participationGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={getParticipationGradient().split(", ")[0]}
              />
              <stop
                offset="100%"
                stopColor={getParticipationGradient().split(", ")[1]}
              />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="Participated"
            stackId="a"
            fill="url(#participationGradient)"
            name="شرکت کرده‌ها"
          >
            <LabelList dataKey="Participated" position="top" />
          </Bar>

          <Bar
            dataKey="Remaining"
            stackId="a"
            fill="#c2c2c2"
            name="باقی‌مانده‌ها"
          />

          <ReferenceLine
            y={data.vote_min_limit}
            label={{
              value: `حداقل رأی: ${data.vote_min_limit}`,
              position: "top",
              fill: "#000",
            }}
            strokeDasharray="10 10"
            strokeWidth={3}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoterCount;
