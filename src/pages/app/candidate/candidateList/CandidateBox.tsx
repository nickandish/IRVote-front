import { Col } from "react-bootstrap";
import img from "../../../../assets/download.jpg";
import "./candidateBox.scss";

const CandidateBox = () => {
  return (
    <Col className="candidateBox col-6 col-md-4 col-lg-3 d-flex flex-column">
      <Col className="ballot candidateBox_box">
        <div className="rounded-circle img bg-primary">
          <img className="rounded-circle" src={img} />
        </div>

        <div className=" text-center">
          <p className="text-light">سارا سادات کریمی</p>
        </div>

        <div className="ballot_button text-center ">
          <button className="text-light fw-bold ">
            رای دادن به این کاندید
          </button>
        </div>
      </Col>
    </Col>
  );
};

export default CandidateBox;
