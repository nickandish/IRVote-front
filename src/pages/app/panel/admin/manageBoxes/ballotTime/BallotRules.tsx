import { useState } from "react";
import { Container } from "react-bootstrap";
import CandidateCategoriesHeader from "./candidateCategories/CandidateCategoriesHeader";
import CandidateCategoriesTable from "./candidateCategories/CandidateCategoriesTable";
import "./ballotRules.scss";

const BallotRules = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Container className="ballot-rules">
      <CandidateCategoriesHeader onSearch={setSearchQuery} />
      <CandidateCategoriesTable searchQuery={searchQuery} />
    </Container>
  );
};

export default BallotRules;
