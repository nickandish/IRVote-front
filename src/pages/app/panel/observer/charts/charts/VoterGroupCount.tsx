import { useEffect, useState } from "react";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { BarChart } from "@mui/x-charts";

interface VoterGroupData {
  group: string;
  voter_count: number;
  VoterGroup_min_limit: number;
}

interface VoterGroupResponse {
  voter_groups: VoterGroupData[] | null;
}

const VoterGroupCount: React.FC = () => {
  const {
    durationId,
    isLoading: durationLoading,
    error: durationError,
  } = useDuration();
  const [data, setData] = useState<VoterGroupResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoterGroupData = async () => {
      if (!durationId) return;
      setLoading(true);
      try {
        const response = await apiClient.get(
          API_URLS.VOTER_GROUP_COUNT.replace(":id", String(durationId))
        );
        if (response.data) {
          setData(response.data);
        } else {
          setError("Failed to fetch voter group data");
        }
      } catch (err) {
        setError("An error occurred while fetching voter group data");
      } finally {
        setLoading(false);
      }
    };

    fetchVoterGroupData();
  }, [durationId]);

  if (durationLoading || loading) return <p>Loading...</p>;
  if (durationError || error) return <p>Error: {durationError || error}</p>;

  if (!data || !data.voter_groups) return <p>No data available</p>;

  const xAxisLabels = data.voter_groups.map((group) => group.group);
  const voterCounts = data.voter_groups.map((group) => group.voter_count);
  const capacity = data.voter_groups.map((group) => group.VoterGroup_min_limit);

  return (
    <BarChart
      series={[
        { data: capacity, label: "Min Limit", color: "#d3d3d3" },
        { data: voterCounts, label: "Voter Count", color: "#3f51b5" },
      ]}
      height={290}
      xAxis={[{ data: xAxisLabels, scaleType: "band" }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export default VoterGroupCount;
