import React from "react";
import { Row, Col } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

interface CandidateCategoriesHeaderProps {
  onSearch: (query: string) => void;
}

const CandidateCategoriesHeader: React.FC<CandidateCategoriesHeaderProps> = ({
  onSearch,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleAddCategoryClick = () => {
    navigate(`/admin/manage-boxes/${id}/rules/addRules`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Row className="align-items-center header-voter">
      <Col className="new-voter" onClick={handleAddCategoryClick}>
        <p>
          ثبت قواعد جدید <FiPlusCircle className="icon" />
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

export default CandidateCategoriesHeader;
