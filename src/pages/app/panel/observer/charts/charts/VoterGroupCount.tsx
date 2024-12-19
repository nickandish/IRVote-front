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
  Rectangle,
} from "recharts";

interface VoterGroupData {
  group: string;
  voter_count: number;
  VoterGroup_min_limit: number;
}

interface VoterGroupResponse {
  voter_groups: VoterGroupData[];
}

const VoterGroupCount: React.FC = () => {
  const {
    observerDurationId,
    isLoading: durationLoading,
    error: durationError,
  } = useDuration();
  const [data, setData] = useState<VoterGroupResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoterGroupData = async () => {
      if (!observerDurationId) return;
      setLoading(true);
      try {
        const response = await apiClient.get(
          API_URLS.VOTER_GROUP_COUNT.replace(":id", String(observerDurationId))
        );
        if (response.data) {
          setData(response.data);
        } else {
          setError("مشکلی در بارگیری رخ داده");
        }
      } catch (err) {
        setError("با مشکلی در بارگیری اطلاعات مواجه هستیم");
      } finally {
        setLoading(false);
      }
    };

    fetchVoterGroupData();
  }, [observerDurationId]);

  if (durationLoading || loading) return <Loading />;
  if (durationError || error) return <p>ارور: {durationError || error}</p>;
  if (!data || !data.voter_groups) return <p>اطلاعاتی موجود نیست</p>;

  const chartData = data.voter_groups.map((group) => ({
    name: group.group,
    voters: group.voter_count,
    minLimit: group.VoterGroup_min_limit,
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
            name="تعداد رأی‌دهندگان"
            shape={(props: any) => {
              const { x, y, width, height, payload } = props;
              const minLimitHeight =
                payload.minLimit * (height / payload.voters);

              const isAboveLimit = payload.voters >= payload.minLimit;

              return (
                <g>
                  <Rectangle
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={
                      isAboveLimit
                        ? "url(#aboveLimitGradient)"
                        : "url(#belowLimitGradient)"
                    }
                  />
                  <line
                    x1={x}
                    y1={y + height - minLimitHeight}
                    x2={x + width}
                    y2={y + height - minLimitHeight}
                    stroke="red"
                    strokeWidth="3"
                  />
                </g>
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoterGroupCount;
