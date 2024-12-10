import { useEffect, useState } from "react";
import { API_URLS } from "../../../../../../api/urls";
import apiClient from "../../../../../../api/axios";
import { BarChart } from "@mui/x-charts";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import Loading from "../../../../../../component/loading/Loading";

interface VoterCountData {
  total_voters: number;
  voted_voters: number;
  vote_min_limit: number;
}

const VoterCount: React.FC = () => {
  const { durationId } = useDuration();

  const [data, setData] = useState<VoterCountData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoterCountData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(
          API_URLS.VOTER_COUNT.replace(":id", String(durationId))
        );
        if (response.data) {
          setData(response.data);
        } else {
          setError("دریافت اطلاعات رای‌دهندگان موفق نبود.");
        }
      } catch (err) {
        setError("خطایی هنگام دریافت اطلاعات رای‌دهندگان رخ داد.");
      } finally {
        setLoading(false);
      }
    };

    if (durationId) fetchVoterCountData();
  }, [durationId]);

  if (loading) return <Loading />;
  if (error) return <p style={{ color: "red" }}>خطا: {error}</p>;
  if (!data) return <p>اطلاعاتی در دسترس نیست.</p>;

  const dataset = [
    { name: "تعداد رای دهندگان", value: data.total_voters },
    { name: "حداقل رای ", value: data.vote_min_limit },
    { name: "رای‌های تایید شده", value: data.voted_voters },
  ];

  return (
    <BarChart
      xAxis={[
        {
          label: "رای دهندگان",
          dataKey: "name",
          scaleType: "band",
        },
      ]}
      yAxis={[
        {
          label: "تعداد رای‌ها",
          scaleType: "linear",
        },
      ]}
      width={350}
      height={250}
      layout="vertical"
      grid={{ horizontal: true }}
      dataset={dataset}
      series={[
        {
          dataKey: "value",
          color: "#8884d8",
        },
      ]}
    />
  );
};

export default VoterCount;
