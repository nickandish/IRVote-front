import { useEffect, useState } from "react";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import Ballots from "./Ballots";
import { Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { API_URLS } from "../../../api/urls";
import apiClient from "../../../api/axios";
import { BallotItem } from "../type";
import ErrorPage from "../../../component/error/ErrorPage";
import Loading from "../../../component/loading/Loading";
import "./ballot.scss";

const Ballot = () => {
  const location = useLocation();
  const electionDurationTitle =
    location.state?.electionDurationTitle || "انتخابات";

  const electionDurationId = location.state?.electionDurationId;

  const [ballots, setBallots] = useState<BallotItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!electionDurationId) {
      setError("Election Duration ID is missing.");
      setLoading(false);
      return;
    }

    const fetchBallots = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.BALLOT_LIST.replace(":id", electionDurationId)
        );
        if (response.data.success) {
          setBallots(response.data.data);
        } else {
          setError(response.data.message || "Failed to retrieve ballots.");
        }
      } catch (error) {
        setError("An error occurred while fetching ballots.");
      } finally {
        setLoading(false);
      }
    };

    fetchBallots();
  }, [electionDurationId]);

  if (loading)
    return (
      <>
        <Header title={electionDurationTitle} />
        <Navbar />
        <Loading />
      </>
    );
  if (error)
    return (
      <>
        <Header title={electionDurationTitle} />
        <Navbar />
        <ErrorPage />
      </>
    );

  return (
    <>
      <Header title={electionDurationTitle} />
      <Navbar />

      <div className="ballots row fw-bold">
        <Row className="g-3 wd100">
          {ballots.map((item) => (
            <Ballots key={item.id} ballot={item} />
          ))}
        </Row>
      </div>
    </>
  );
};

export default Ballot;
