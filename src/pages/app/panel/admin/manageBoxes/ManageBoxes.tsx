import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import apiClient from "../../../../../api/axios";
import { API_URLS } from "../../../../../api/urls";
import "./manageBoxes.scss";
import HeaderBallotManage from "./manageBallots/HeaderBallotManage";

interface Ballot {
  id: number;
  Ballot_Farsi_Title: string;
  Ballot_Type: number;
  Start_at: string | null;
  End_at: string | null;
  Status: string | null;
  remaining_time: number;
  Main_count: number;
  Reserve_count: number;
}

const ManageBoxes = () => {
  const navigate = useNavigate();
  const [ballots, setBallots] = useState<Ballot[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch ballot data
  useEffect(() => {
    const fetchBallots = async () => {
      try {
        const response = await apiClient.get(API_URLS.GET_BALLOT);
        setBallots(response.data);
      } catch (err) {
        console.error("Error fetching ballots:", err);
        setError("خطا در بارگیری صندوق‌ها. لطفاً دوباره تلاش کنید.");
      } finally {
        setLoading(false);
      }
    };

    fetchBallots();
  }, []);

  const filteredBallots = ballots.filter((ballot) =>
    ballot.Ballot_Farsi_Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" />
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container className="manage-boxes">
      <HeaderBallotManage onSearch={(query) => setSearchQuery(query)} />
      <Row>
        {filteredBallots.map((ballot) => (
          <Col key={ballot.id} lg={3} md={4} className="mb-4 col-6">
            <Card
              className="ballot-box-card"
              onClick={() => navigate(`/admin/manage-boxes/${ballot.id}`)}
            >
              <Card.Body className="text-center">
                <h5>{ballot.Ballot_Farsi_Title}</h5>
                <p>
                  نوع: {ballot.Ballot_Type === 0 ? "سند" : "کاندید"} | تعداد
                  اصلی: {ballot.Main_count} | رزرو: {ballot.Reserve_count}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ManageBoxes;
