import { Col } from "react-bootstrap";
import img from "../../../../assets/download.jpg";
import { useState } from "react";
import CandidateDetail from "./candidateDetail/CandidateDetail";
import { Modal } from "react-bootstrap";
import "./candidateBox.scss";

const CandidateBox = () => {
  const [modal, setModal] = useState(false);
  const [vote, setVote] = useState(false);

  return (
    <>
      <Col
        className={`candidateBox col-6 col-md-4 col-lg-3 d-flex flex-column ${
          vote ? "active" : ""
        }`}
      >
        <Col className="ballot candidateBox_box">
          <div className="rounded-circle img bg-primary">
            <img
              className="rounded-circle"
              src={img}
              onClick={() => {
                setModal(true);
              }}
            />
          </div>

          <div className="text-center">
            <p className="p">سارا سادات کریمی</p>
          </div>

          <div className="ballot_button text-center">
            <button
              className="text-light fw-bold"
              onClick={() => {
                setVote(!vote);
              }}
            >
              {!vote ? <> رای دادن به نامزد </> : <>رای داده شد</>}
            </button>
          </div>
        </Col>
      </Col>
      <Modal
        show={modal}
        onHide={() => setModal(false)}
        dialogClassName="custom-modal"
      >
        <CandidateDetail setModal={setModal} />
      </Modal>
    </>
  );
};

export default CandidateBox;
