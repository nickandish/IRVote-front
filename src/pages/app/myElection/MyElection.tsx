import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import Box from "./Box";
import apiClient from "../../../api/axios";
import { API_URLS } from "../../../api/urls";

interface Election {
  id: number;
  fa_title: string;
  en_title: string;
  start_at: string;
  end_at: string;
  status: number;
}

const MyElection = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await apiClient.get(API_URLS.ELECTION_LIST);
        if (response.data.success) {
          setElections(response.data.data.items);
        } else {
          setError(response.data.message || "Failed to fetch elections");
        }
      } catch (err) {
        setError("Error fetching elections");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, []);

  if (loading) return <p>درحال بارگیری</p>;
  if (error) return <p>ارور: {error}</p>;

  return (
    <>
      <Header title={"انتخابات من"} />
      <Row className="my-elections">
        {elections.map((election) => (
          <Box key={election.id} election={election} />
        ))}
      </Row>
      <Navbar />
    </>
  );
};

export default MyElection;
