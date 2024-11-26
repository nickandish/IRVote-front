import { Col, Row, Form } from "react-bootstrap";
import { FiPlusCircle } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import "../manageVoters.scss";

interface HeaderVoterProps {
  onSearch: (query: string) => void;
}

const HeaderVoter: React.FC<HeaderVoterProps> = ({ onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Row className="align-items-center header-voter">
      <Col className="new-voter">
        <p>
          ثبت رای دهنده جدید <FiPlusCircle className="icon" />
        </p>
      </Col>
      <Col className="header-voter_search-bar col-7">
        <Row>
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
