import { Row, Col } from "react-bootstrap";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import "./ballot.scss";

interface BallotProps {
  ballot: {
    id: number;
    Ballot_Farsi_Title: string;
    Ballot_Type: number;
    Start_at: string;
    End_at: string;
    Status: number;
    remaining_time?: string;
  };
}

const Ballots: React.FC<BallotProps> = ({ ballot }) => {
  const navigate = useNavigate();

  const getStatusInfo = (status: number | null) => {
    if (status === null) return { text: "pending", className: "unknown" };
    switch (status) {
      case 0:
        return {
          text: "درحال برگزاری",
          className: "status-in-progress",
        };
      case 1:
        return { text: "خاتمه یافته", className: "status-not-started" };
      case 2:
      case 3:
      case 4:
        return { text: "لفو شده", className: "status-expired" };
      default:
        return { text: "نامشخص", className: "status-unknown" };
    }
  };

  const { text: statusText, className: statusClass } = getStatusInfo(
    ballot.Status
  );

  const handleClick = () => {
    if (ballot.Ballot_Type === 0) {
      navigate(`/document/${ballot.id}`, {
        state: {
          ballotId: ballot.id,
          ballotTitle: ballot.Ballot_Farsi_Title,
        },
      });
    } else if (ballot.Ballot_Type === 1) {
      navigate(`/candidate/${ballot.id}`, {
        state: {
          ballotId: ballot.id,
          ballotTitle: ballot.Ballot_Farsi_Title,
        },
      });
    }
  };

  return (
    <Col className="col-6 col-md-4 col-lg-3 d-flex flex-column">
      <Col className={`ballot ${statusClass}`}>
        <div className="ballot_vote text-center">
          <p className="text-light">{statusText}</p>
        </div>

        <div className="ballot_box">
          <div className="text-center">
            <LiaBoxOpenSolid className="ballot_icon" />
            <p className="ballot_title">
              {ballot.Ballot_Farsi_Title || "اعضا"}
            </p>
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
              <Col className="text-start detail_p">
                {ballot.remaining_time || "نامشخص"}
              </Col>
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
  );
};

export default Ballots;
