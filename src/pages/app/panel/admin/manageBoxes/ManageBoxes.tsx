import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./manageBoxes.scss";

const ManageBoxes = () => {
  const navigate = useNavigate();

  const ballotBoxes = [
    { id: 1, title: "صندوق 1", description: "توضیحات صندوق 1" },
    { id: 2, title: "صندوق 2", description: "توضیحات صندوق 2" },
  ];

  return (
    <Container className="manage-boxes">
      <Row>
        {ballotBoxes.map((ballot) => (
          <Col key={ballot.id} lg={3} md={4} className="mb-4 col-6">
            <Card
              className="ballot-box-card"
              onClick={() => navigate(`/admin/manage-boxes/${ballot.id}`)}
            >
              <Card.Body className="text-center">
                <h5>{ballot.title}</h5>
                <p>{ballot.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ManageBoxes;
