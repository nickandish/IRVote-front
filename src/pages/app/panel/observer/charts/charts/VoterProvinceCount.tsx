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

  // Prepare data for the chart
  const chartData = data.provinces.map((province) => ({
    name: province.province || "ناشناخته",
    voters: province.voted_voters,
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="voters" fill="#82ca9d" name="رأی‌دهندگان" />
          <ReferenceLine
            y={data.Province_min_limit}
            label={{
              value: `حداقل رأی: ${data.Province_min_limit}`,
              position: "insideTopRight",
              fill: "#000",
              fontWeight: "bold",
            }}
            stroke="red"
            strokeDasharray="3 3"
            strokeWidth={3}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoterProvinceCount;
