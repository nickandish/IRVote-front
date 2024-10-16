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
  const { id } = useParams<{ id: string }>();
  const [ballot, setBallot] = useState<BallotItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBallot = async () => {
      try {
        if (!id) {
          setError("No election ID provided");
          setLoading(false);
          return;
        }

        const url = API_URLS.BALLOT_LIST.replace(":id", id);
        const response = await apiClient.get(url);

        if (response.data.success) {
          setBallot(response.data.data.items);
        } else {
          setError(response.data.message || "Failed to fetch Ballot");
        }
      } catch (err) {
        setError("Error fetching Ballot");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBallot();
  }, [id]);

  if (loading) return <div className="loader">درحال بارگیری...</div>;
  if (error) return <div className="error-message">ارور: {error}</div>;

  return (
    <>
      <Header title={"انتخابات انجمن اسلامی دانشگاه تهران غرب"} />
      <Navbar />

      <div className="ballots row fw-bold">
        <Row className="g-3 wd100">
          {ballot.map((item) => (
            <Ballots key={item.id} ballot={item} />
          ))}
        </Row>
      </div>
    </>
  );
};

export default Ballot;
