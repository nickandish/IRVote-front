import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeaderVoter from "./components/HeaderVoter";
import TableVoters from "./components/TableVoters";
import ButtonVoter from "./components/ButtonVoter";
import { GoPerson } from "react-icons/go";
import "./manageVoters.scss";

const ManageVoters = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Container className="voterManage">
      <Row className="manageCourse_header  mb-5">
        <Col className="col-2 icon">
          <GoPerson />
        </Col>
        <Col className="col-9">مدیریت رای دهندگان</Col>
      </Row>

      <HeaderVoter onSearch={handleSearch} />
      <TableVoters searchQuery={searchQuery} />
      <ButtonVoter />
    </Container>
  );
};

export default ManageVoters;
