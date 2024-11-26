import { useState } from "react";
import { Container } from "react-bootstrap";
import HeaderVoter from "./components/HeaderVoter";
import TableVoters from "./components/TableVoters";
import ButtonVoter from "./components/ButtonVoter";
import "./manageVoters.scss";

const ManageVoters = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Container className="voterManage">
      <HeaderVoter onSearch={handleSearch} />
      <TableVoters searchQuery={searchQuery} />
      <ButtonVoter />
    </Container>
  );
};

export default ManageVoters;
