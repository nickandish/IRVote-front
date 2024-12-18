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

  const isAboveLimit = data.Participated_voters_count >= data.vote_min_limit;

  return (
    <div style={{ width: "100%", height: 400, maxWidth: "20rem" }}>
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
          {/* Define Gradient */}
          <defs>
            <linearGradient id="dynamicGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isAboveLimit ? "#26ba6d" : "#72d5f6"}
              />
              <stop
                offset="50%"
                stopColor={isAboveLimit ? "#02d880" : "#72d5f6"}
              />

              <stop
                offset="100%"
                stopColor={isAboveLimit ? "#72d5f6" : "#02d880"}
              />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Dynamic Gradient for Participated */}
          <Bar
            dataKey="Participated"
            stackId="a"
            fill="url(#dynamicGradient)" // Use the gradient here
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

          {/* Vote Minimum Limit as a Reference Line */}
          <ReferenceLine
            y={data.vote_min_limit}
            label={{
              value: `حداقل رأی: ${data.vote_min_limit}`,
              position: "top",
              fill: "#000",
            }}
            strokeDasharray="3 3"
            strokeWidth={3}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoterCount;
