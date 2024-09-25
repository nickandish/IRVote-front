import { Row, Col } from "react-bootstrap";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import "./ballot.scss";

const Ballots = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/candidate");
  };

  return (
    <>
      <Col className=" col-6 col-md-4 col-lg-3 d-flex flex-column">
        <Col className="ballot">
          <div className="ballot_vote text-center">
            <p className="text-light">هنوز رای ندادید</p>
          </div>

          <div className="ballot_box">
            <div className="text-center">
              <LiaBoxOpenSolid className="ballot_icon" />
              <p className="ballot_title">اعضا</p>
              <div className="my-line" />
            </div>

            <div className="detail p-1">
              <Row>
                <Col className="detail_p">کاندیدها:</Col>
                <Col className="text-start detail_p">123</Col>
              </Row>

              <Row>
                <Col className="detail_p">رای‌ها:</Col>
                <Col className="text-start detail_p">125</Col>
              </Row>

              <Row>
                <Col className="detail_p">باقی‌مانده:</Col>
                <Col className="text-start detail_p">11:23:10</Col>
              </Row>
            </div>
            <p className="ballot_view text-center">مشاهده کاندید</p>
          </div>

          <div className="ballot_button text-center">
            <button
              className="text-light ballot-button fw-bold"
              onClick={handleClick}
            >
              مشاهده صندوق
            </button>
          </div>
        </Col>
      </Col>
    </>
  );
};

export default Ballots;
