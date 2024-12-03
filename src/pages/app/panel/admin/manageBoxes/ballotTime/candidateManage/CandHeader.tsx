import { Col, Row } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

interface HeaderCandidateProps {
  onSearch: (query: string) => void;
}

const CandHeader: React.FC<HeaderCandidateProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleAddVoterClick = () => {
    navigate(`/admin/manage-boxes/${id}/candidates/addCandidate`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <Row className="align-items-center header-voter">
      <Col className="new-voter" onClick={handleAddVoterClick}>
        <p>
          ثبت گروه رای دهنده جدید <FiPlusCircle className="icon" />
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

export default CandHeader;
