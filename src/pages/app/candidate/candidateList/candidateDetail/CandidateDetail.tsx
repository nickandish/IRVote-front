import React from "react";
import { Col, Row } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { RxDownload } from "react-icons/rx";
import { HiOutlinePlayPause } from "react-icons/hi2";
import img from "../../../../../assets/femaileAvatar.svg";
import "./candidateDetail.scss";

interface CandidateProp {
  setModal: (value: boolean) => void;
  candidate: any;
}

const CandidateDetail: React.FC<CandidateProp> = ({ setModal, candidate }) => {
  return (
    <div className="candidate-detail">
      <div
        className="candidate-detail_container"
        style={{ backgroundColor: candidate.background || "#6a5ae0" }}
      >
        <div className="candidate-detail_container_top">
          <div className="div-1">
            <IoClose
              className="icon text-light"
              onClick={() => {
                setModal(false);
              }}
            />
          </div>
          <div className="div-6 text-center pic-container">
            <div className="circle"></div>
            <div className="img-container">
              <img src={candidate.ImagePath || img} alt="Candidate" />
            </div>
            <p className="text-light">{candidate.name}</p>
          </div>
          <div className="div-2">
            <button className="button">رای دادن به کاندید</button>
          </div>
        </div>

        <Row className="candidate-detail_container_middle">
          <Row className="pic">
            <Col className="col-6">
              <div className="img-container">
                <img src={candidate.ImagePath || img} alt="Candidate" />
              </div>
            </Col>
          </Row>
          <Row className="buttons g-3">
            <Col className="col-6">
              <button className="w-100 buttons1" disabled={!candidate.video}>
                <HiOutlinePlayPause className="me-2 icon" />
                {candidate.video ? "نمایش فیلم" : "فیلم موجود نیست"}
              </button>
            </Col>
            <Col className="col-6">
              <button className="w-100 buttons2" disabled={!candidate.cv}>
                <RxDownload className="me-2 icon" />
                {candidate.cv ? "دانلود رزومه" : "رزومه موجود نیست"}
              </button>
            </Col>
          </Row>
        </Row>

        <Row>
          <p className="text-light">{candidate.data}</p>
        </Row>
      </div>
    </div>
  );
};

export default CandidateDetail;
