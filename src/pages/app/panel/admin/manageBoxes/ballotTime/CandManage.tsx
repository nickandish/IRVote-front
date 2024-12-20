import { Col, Container, Row } from "react-bootstrap";
import CandTable from "./candidateManage/CandTable";
import CandHeader from "./candidateManage/CandHeader";
import { useState, useEffect } from "react";
import { TiGroupOutline } from "react-icons/ti";
import Loading from "../../../../../../component/loading/Loading";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useParams } from "react-router-dom";
import "./candManage.scss";

const CandManage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [candidates, setCandidates] = useState<any[]>([]); // Define the type for candidates as any or Candidate[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Function to update the candidates list after a deletion
  const updateCandidates = (deletedCandidateId: number) => {
    setCandidates((prevCandidates) =>
      prevCandidates.filter((candidate) => candidate.id !== deletedCandidateId)
    );
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.GET_CANDIDATE.replace(":idB", String(id))
        );
        setCandidates(response.data);
      } catch (err) {
        setError("خطا در بارگیری اطلاعات کاندیداها.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [id]);

  return (
    <Container className="candidate-manage">
      <Row className="manageCourse_header voterGroupHeader  mb-5">
        <Col className="col-2 icon">
          <TiGroupOutline />
        </Col>
        <Col className="col-9">مدیریت کاندیدها</Col>
      </Row>

      <CandHeader onSearch={handleSearch} />
      {loading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CandTable
          candidates={candidates}
          searchQuery={searchQuery}
          updateCandidates={updateCandidates}
        />
      )}
    </Container>
  );
};

export default CandManage;
