import { Row, Col } from "react-bootstrap";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import "./ballot.scss";

const Ballots = ({ ballot }: { ballot: any }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/candidate/${ballot.id}`);
  };

  const getStatusInfo = (status: number | null) => {
    if (status === null) {
      return { text: "نامشخص", className: "unknown" };
    }
    switch (status) {
      case 1:
        return { text: "شروع نشده", className: "expired" };
      case 2:
        return { text: "درحال برگزاری", className: "voted" };
      case 3:
        return { text: "خاتمه یافته", className: "status-expired" };
      case 4:
        return { text: "منقضی شده", className: "status-expired" };
      case 5:
        return { text: "متوقف شده", className: "status-expired" };
      default:
        return { text: "نامشخص", className: "unknown" };
    }
  };
  //type navigate document
  const { text: statusText, className: statusClass } = getStatusInfo(
    ballot.status
  );

  return (
    <>
      <Col className="col-6 col-md-4 col-lg-3 d-flex flex-column">
        <Col className={`ballot ${statusClass}`}>
          <div className="ballot_vote text-center">
            <p className="text-light">{statusText}</p>
          </div>

          <div className="ballot_box">
            <div className="text-center">
              <LiaBoxOpenSolid className="ballot_icon" />
              <p className="ballot_title">{ballot.fa_title || "اعضا"}</p>
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
