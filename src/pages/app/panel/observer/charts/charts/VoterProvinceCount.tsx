import React, { useEffect, useState } from "react";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import Loading from "../../../../../../component/loading/Loading";
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

interface ProvinceData {
  province: string | null;
  voted_voters: number;
}

interface VoterResponse {
  provinces: ProvinceData[];
  Province_min_limit: number;
}

const VoterProvinceCount: React.FC = () => {
  const {
    observerDurationId,
    isLoading: durationLoading,
    error: durationError,
  } = useDuration();
  const [data, setData] = useState<VoterResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoterData = async () => {
      if (!observerDurationId) return;
      setLoading(true);
      try {
        const response = await apiClient.get(
          API_URLS.VOTER_PROVINCE_COUNT.replace(
            ":id",
            String(observerDurationId)
          )
        );
        if (response.data) {
          setData(response.data);
          console.log(response.data);
        } else {
          setError("Failed to fetch voter data");
        }
      } catch (err) {
        setError("An error occurred while fetching voter data");
      } finally {
        setLoading(false);
      }
    };

    fetchVoterData();
  }, [observerDurationId]);

  if (durationLoading || loading) return <Loading />;
  if (durationError || error) return <p>ارور: {durationError || error}</p>;
  if (!data || !data.provinces) return <p>اطلاعاتی موجود نیست</p>;

  const chartData = data.provinces.map((province) => ({
    name: province.province || "ناشناخته",
    voters: province.voted_voters,
    isAboveLimit: province.voted_voters > data.Province_min_limit,
  }));

  return (
    <div style={{ width: "100%", height: 400 }}>
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
            <linearGradient id="aboveLimitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#26ba6d" />
              <stop offset="50%" stopColor="#02d880" />
              <stop offset="100%" stopColor="#72d5f6" />
            </linearGradient>
            <linearGradient id="belowLimitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86f0ff" />
              <stop offset="50%" stopColor="#72d5f6" />
              <stop offset="100%" stopColor="#72d5f6" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="voters"
            name="رأی‌دهندگان"
            shape={(props: any) => {
              const { x, y, width, height, payload } = props;
              const gradientId = payload.isAboveLimit
                ? "aboveLimitGradient"
                : "belowLimitGradient";
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={`url(#${gradientId})`}
                />
              );
            }}
          />

          <ReferenceLine
            y={data.Province_min_limit}
            label={{
              value: `حداقل رأی: ${data.Province_min_limit}`,
              position: "top",
              fill: "#000",
              fontWeight: "bold",
            }}
            stroke="red"
            strokeDasharray="10 10"
            strokeWidth={3}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoterProvinceCount;
