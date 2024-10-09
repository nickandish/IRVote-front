import { useEffect, useState } from "react";
import Header from "../../navbar/Header";
import { Navbar, Row } from "react-bootstrap";
import Box from "./Box";
import apiClient from "../../../api/axios";
import { API_URLS } from "../../../api/urls";
import { DurationItem } from "../../../api/userServices";

const Duration: React.FC = () => {
  const [durations, setDurations] = useState<DurationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDurations = async () => {
      try {
        const response = await apiClient.get(API_URLS.DURATION_LIST);
        if (response.data.success) {
          setDurations(response.data.data.items);
        } else {
          setError(response.data.message || "Failed to fetch durations");
        }
      } catch (err) {
        setError("Error fetching durations");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDurations();
  }, []);

  if (loading) return <div className="loader">Loading durations...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <>
      <Header title={"دوره‌های من"} />
      <Row className="my-elections">
        {durations.map((duration) => (
          <Box key={duration.id} duration={duration} />
        ))}
      </Row>
      <Navbar />
    </>
  );
};

export default Duration;
