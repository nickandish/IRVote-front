import { Container } from "react-bootstrap";
import CandidateCategoriesHeader from "./candidateCategories/CandidateCategoriesHeader";
import CandidateCategoriesTable from "./candidateCategories/CandidateCategoriesTable";

const BallotRules = () => {
  return (
    <Container>
      <CandidateCategoriesHeader />
      <CandidateCategoriesTable />
    </Container>
  );
};

export default BallotRules;
