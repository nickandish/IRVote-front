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
      <Col>
        <FiPlusCircle />
        <p>ثبت رای دهنده جدید</p>
      </Col>
      <Col>
        <BiSearchAlt />
        <Form.Control
          type="text"
          placeholder="جستجو..."
          onChange={handleInputChange}
          className="search-input"
        />
      </Col>
    </Row>
  );
};

export default HeaderVoter;
