import { useEffect, useState } from "react";
import { API_URLS } from "../../../../../../api/urls";
import apiClient from "../../../../../../api/axios";
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
          setError("دریافت اطلاعات رأی‌دهندگان موفق نبود.");
        }
      } catch (err) {
        setError("خطایی هنگام دریافت اطلاعات رأی‌دهندگان رخ داد.");
      } finally {
        setLoading(false);
      }
    };

    if (durationId) fetchVoterCountData();
  }, [durationId]);

  if (loading) return <Loading />;
  if (error) return <p style={{ color: "red" }}>خطا: {error}</p>;
  if (!data) return <p>اطلاعاتی در دسترس نیست.</p>;

  const totalWidth = 100;
  const votedWidth = (data.voted_voters / data.total_voters) * totalWidth;
  const voteMinLimitWidth =
    (data.vote_min_limit / data.total_voters) * totalWidth;

  const getColor = () => {
    const progress = Math.min(data.voted_voters / data.vote_min_limit, 1);
    const greenIntensity = Math.floor(progress * 255);
    return `rgb(255, ${greenIntensity}, 0)`;
  };

  const containerStyle = {
    width: "100%",
    height: "40px",
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
  };

  const votedStyle = {
    width: `${votedWidth}%`,
    backgroundColor: getColor(),
    height: "100%",
    transition: "width 0.5s ease-in-out, background-color 0.5s ease-in-out",
  };

  const lineStyle = (left: number, color: string) => ({
    position: "absolute",
    top: 0,
    bottom: 0,
    left: `${left}%`,
    width: "2px",
    backgroundColor: color,
  });

  return (
    <div>
      <div style={containerStyle}>
        <div style={votedStyle}></div>
        <div style={lineStyle(voteMinLimitWidth, "red")}></div>
        <div style={lineStyle(100, "green")}></div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "8px",
        }}
      >
        <span>حداقل رأی: {data.vote_min_limit}</span>
        <span>رأی‌های تأییدشده: {data.voted_voters}</span>
        <span>کل رأی‌دهندگان: {data.total_voters}</span>
      </div>
    </div>
  );
};

export default VoterCount;
