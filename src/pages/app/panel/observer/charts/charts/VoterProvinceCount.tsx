import React, { useEffect, useState } from "react";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { BarChart } from "@mui/x-charts";
import Loading from "../../../../../../component/loading/Loading";

interface ProvinceData {
  province: string | null;
  voter_count: number;
}

interface VoterResponse {
  provinces: ProvinceData[] | null;
  Province_min_limit: number;
}

const VoterProvinceCount: React.FC = () => {
  const {
    durationId,
    isLoading: durationLoading,
    error: durationError,
  } = useDuration();
  const [data, setData] = useState<VoterResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoterData = async () => {
      if (!durationId) return;
      setLoading(true);
      try {
        const response = await apiClient.get(
          API_URLS.VOTER_PROVINCE_COUNT.replace(":id", String(durationId))
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
  }, [durationId]);

  if (durationLoading || loading) return <Loading />;
  if (durationError || error) return <p>ارور: {durationError || error}</p>;

  if (!data || !data.provinces) return <p>No data available</p>;

  const xAxisLabels = data.provinces.map(
    (province) => province.province || "Unknown"
  );
  const voterCounts = data.provinces.map((province) => province.voter_count);
  const capacity = Array(data.provinces.length).fill(data.Province_min_limit);

  return (
    <BarChart
      series={[
        { data: capacity, label: "Capacity", color: "#d3d3d3" },
        { data: voterCounts, label: "Voter Count", color: "#3f51b5" },
      ]}
      height={290}
      xAxis={[{ data: xAxisLabels, scaleType: "band" }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export default VoterProvinceCount;
