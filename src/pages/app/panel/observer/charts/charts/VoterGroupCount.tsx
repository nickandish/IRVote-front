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

// تابع برای رسم خط قرمز (سفارشی)
const CustomBarWithLimit = (props: any) => {
  const { x, y, width, height, payload } = props;
  const minLimit = payload.minLimit;

  return (
    <g>
      {/* رسم مستطیل (ستون اصلی) */}
      <Rectangle x={x} y={y} width={width} height={height} fill="#82ca9d" />
      {/* رسم خط قرمز برای لیمیت */}
      <line
        x1={x}
        y1={y + height - minLimit * (height / payload.voters)} // محاسبه دقیق موقعیت لیمیت
        x2={x + width}
        y2={y + height - minLimit * (height / payload.voters)}
        stroke="red"
        strokeWidth="3"
      />
    </g>
  );
};

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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="voters"
            name="تعداد رأی‌دهندگان"
            shape={<CustomBarWithLimit />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoterGroupCount;
