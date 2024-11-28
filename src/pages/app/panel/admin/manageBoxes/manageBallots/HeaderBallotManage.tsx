import { Col, Row } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface HeaderBallotManageProps {
  onSearch: (query: string) => void;
}

const HeaderBallotManage: React.FC<HeaderBallotManageProps> = ({
  onSearch,
}) => {
  const navigate = useNavigate();

  const handleAddBallotClick = () => {
    navigate("/admin/manage-boxes/add-ballot");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Row className="align-items-center header-voter">
      <Col className="new-voter" onClick={handleAddBallotClick}>
        <p>
          ثبت صندوق جدید <FiPlusCircle className="icon" />
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

export default HeaderBallotManage;
