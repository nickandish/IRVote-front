import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import apiClient from "../../../api/axios";
import { API_URLS } from "../../../api/urls";
import { useParams } from "react-router-dom";
import { ApiResponse, DurationItem } from "../type";
import DurationBox from "./Box";

const Duration: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [durations, setDurations] = useState<DurationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDurations = async () => {
      try {
        if (!id) {
          setError("No election ID provided");
          setLoading(false);
          return;
        }

        // Replace ':id' with the actual election ID
        const url = API_URLS.DURATION_LIST.replace(":id", id);
        const response = await apiClient.get<
          ApiResponse<{ items: DurationItem[] }>
        >(url);

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
  }, [id]);

  if (loading) return <div className="loader">درحال بارگیری...</div>;
  if (error) return <div className="error-message">ارور: {error}</div>;

  return (
    <>
      <Header title={"دوره‌های من"} />
      <Row className="my-elections">
        {durations.map((duration) => (
          <DurationBox key={duration.id} duration={duration} />
        ))}
      </Row>
      <Navbar />
    </>
  );
};

export default Duration;
