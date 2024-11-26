import { Col, Row } from "react-bootstrap";
import { FiPlusCircle } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import "../manageVoters.scss";

const HeaderVoter = () => {
  return (
    <Row>
      <Col>
        <FiPlusCircle />
        <p>ثبت رای دهنده جدید</p>
      </Col>
      <Col>
        <BiSearchAlt />
      </Col>
    </Row>
  );
};

export default HeaderVoter;
