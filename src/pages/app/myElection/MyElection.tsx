import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import apiClient from "../../../api/axios";
import { API_URLS } from "../../../api/urls";
import { ApiResponse, Election } from "../type";
import ElectionBox from "./Box";
import Loading from "../../../component/loading/Loading";
import ErrorPage from "../../../component/error/ErrorPage";

const MyElection: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await apiClient.get<
          ApiResponse<{ items: Election[] }>
        >(API_URLS.ELECTION_LIST);
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

  if (loading)
    return (
      <>
        <Header title={"انتخابات من"} />
        <Navbar />
        <Loading />
      </>
    );
  if (error)
    return (
      <>
        <Header title="انتخابات من" />
        <Navbar />
        <ErrorPage />
      </>
    );

  return (
    <>
      <Header title={"انتخابات من"} />
      <Row className="my-elections">
        {elections.map((election) => (
          <ElectionBox key={election.id} election={election} />
        ))}
      </Row>
      <Navbar />
    </>
  );
};

export default MyElection;
