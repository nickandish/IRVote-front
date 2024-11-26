import { Col, Container, Row } from "react-bootstrap";
import HeaderVoterGroup from "./components/HeaderVoterGroup";
import TableVoterGroup from "./components/TableVoterGroup";
import ButtonVoterGroup from "./components/ButtonVoterGroup";
import { useState } from "react";
import { TiGroupOutline } from "react-icons/ti";
import "./ManageGroup.scss";

const ManageGroups = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Container className="voterGroupManage">
      <Row className="manageCourse_header voterGroupHeader  mb-5">
        <Col className="col-2 icon">
          <TiGroupOutline />
        </Col>
        <Col className="col-9">مدیریت گروه رای دهندگان</Col>
      </Row>

      <HeaderVoterGroup onSearch={handleSearch} />
      <TableVoterGroup searchQuery={searchQuery} />
      <ButtonVoterGroup />
    </Container>
  );
};

export default ManageGroups;
