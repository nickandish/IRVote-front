import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import Ballots from "./Ballots";
import "./ballot.scss";
import { Row } from "react-bootstrap";

const Ballot = () => {
  return (
    <>
      <Header title={"انتخابات انجمن اسلامی دانشگاه تهران غرب"} />
      <Navbar />

      <div className="ballots row fw-bold">
        <Row className="g-3">
          <Ballots />
          <Ballots />
          <Ballots />
          <Ballots />
          <Ballots />
          <Ballots />
          <Ballots />
        </Row>
      </div>
    </>
  );
};

export default Ballot;
