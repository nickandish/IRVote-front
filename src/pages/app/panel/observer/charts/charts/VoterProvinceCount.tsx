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
  Rectangle,
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

  // گرادیانت پویا برای زیر خط حدنصاب
  // const getBelowLimitGradient = (percentage: number) => {
  //   if (percentage <= 20) return "#b40000"; // قرمز تیره
  //   if (percentage <= 40) return "#ff0034"; // قرمز
  //   if (percentage <= 60) return "#f38906"; // نارنجی
  //   if (percentage <= 100) return "#d5dd23"; // زرد
  //   return "#a6dd23"; // سبز کم‌رنگ
  // };

  // // گرادیانت پویا برای بالای خط حدنصاب
  // const getAboveLimitGradient = (percentage: number) => {
  //   if (percentage <= 50) return "#a6dd23"; // سبز کم‌رنگ
  //   if (percentage <= 100) return "#00a693"; // سبز حدنصاب
  //   return "#04b610";
  // };

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
            <linearGradient id="belowLimitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a6dd23" />
              <stop offset="25%" stopColor="#d5dd23" />
              <stop offset="50%" stopColor="#f38906" />
              <stop offset="75%" stopColor="#ff0034" />
              <stop offset="100%" stopColor="#b40000" />
            </linearGradient>
            <linearGradient id="aboveLimitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#04b610" />
              <stop offset="50%" stopColor="#00a693" />
              <stop offset="100%" stopColor="#a6dd23" />
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
              const isAboveLimit = payload.voters > data.Province_min_limit;

              return (
                <Rectangle
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={`url(#${
                    isAboveLimit ? "aboveLimitGradient" : "belowLimitGradient"
                  })`}
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
