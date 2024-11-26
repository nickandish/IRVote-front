import React from "react";
import { Col, Row } from "react-bootstrap";
import { FiPlusCircle } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "../manageVoters.scss";

interface HeaderVoterProps {
  onSearch: (query: string) => void;
}

const HeaderVoter: React.FC<HeaderVoterProps> = ({ onSearch }) => {
  const navigate = useNavigate();

  const handleAddVoterClick = () => {
    navigate("/admin/manage-voters/add-voter");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Row className="align-items-center header-voter">
      <Col className="new-voter" onClick={handleAddVoterClick}>
        <p>
          ثبت رای دهنده جدید <FiPlusCircle className="icon" />
        </p>
      </Col>
      <Col className="header-voter_search-bar col-7">
        <Row className="align-items-center">
          <BiSearchAlt className="icon" />
          <input
            type="text"
            placeholder="جستجو..."
            onChange={handleInputChange}
            className="search-input"
          />
        </Row>
      </Col>
    </Row>
  );
};

export default HeaderVoter;
