import { useEffect, useState } from "react";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import Ballots from "./Ballots";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_URLS } from "../../../api/urls";
import apiClient from "../../../api/axios";
import { BallotItem } from "../type";
import "./ballot.scss";

const Ballot = () => {
  const [ballots, setBallots] = useState<BallotItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { electionDurationId } = useParams<{ electionDurationId: string }>();

  useEffect(() => {
    const fetchBallots = async () => {
      try {
        const response = await apiClient.get(
          `${API_URLS.BALLOT_LIST}/${electionDurationId}`
        );
        if (response.data.success) {
          setBallots(response.data.data);
          setLoading(false);
        } else {
          setError(response.data.message || "Failed to retrieve ballots.");
        }
      } catch (error) {
        setError("An error occurred while fetching ballots.");
      }
      setLoading(false);
    };

    fetchBallots();
  }, [electionDurationId]);

  if (loading) return <div className="loader">درحال بارگیری...</div>;
  if (error) return <div className="error-message">ارور: {error}</div>;

  return (
    <>
      <Header title="انتخابات انجمن اسلامی دانشگاه تهران غرب" />
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
