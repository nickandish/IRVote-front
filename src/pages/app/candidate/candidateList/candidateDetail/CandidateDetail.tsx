import React from "react";
import img from "../../../../../assets/download.jpg";
import { Col, Row } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { RxDownload } from "react-icons/rx";
import { HiOutlinePlayPause } from "react-icons/hi2";
import "./candidateDetail.scss";

interface CandidateProp {
  setModal: (value: boolean) => void;
}

const CandidateDetail: React.FC<CandidateProp> = ({ setModal }) => {
  return (
    <div className="candidate-detail">
      <div className="candidate-detail_container">
        <div className="candidate-detail_container_top">
          <div className="div-1">
            <IoClose
              className="icon text-light"
              onClick={() => {
                setModal(false);
                console.log(false);
              }}
            />
          </div>

          <div className="div-6 text-center pic-container">
            <div className="circle"></div>
            <div className="img-container">
              <img src={img} alt="Candidate" />
            </div>
            <p className="text-light">سارا سادات کریمی</p>
          </div>

          <div className="div-2">
            <button className="button">رای دادن به کاندید</button>
          </div>
        </div>

        <Row className="candidate-detail_container_middle">
          <Row className="pic">
            <Col className="col-6">
              <div className="img-container">
                <img src={img} alt="Candidate" />
              </div>
            </Col>
            <Col className="col-6">
              <div className="img-container">
                <img src={img} alt="Candidate" />
              </div>
            </Col>
          </Row>

          <Row className="buttons g-3">
            <Col className="col-6">
              <button className="w-100 buttons1">
                <HiOutlinePlayPause className="me-2 icon" />
                نمایش فیلم
              </button>
            </Col>

            <Col className="col-6">
              <button className="w-100 buttons2">
                <RxDownload className="me-2 icon" />
                دانلود رزومه
              </button>
            </Col>
          </Row>
        </Row>

        <Row>
          <p className="text-light">
            سخنگوی دولت از انتصاب «آرش زره لهونی» در نشست امروز هیئت دولت به
            عنوان استاندار اهل سنت استان کردستان خبر داد. به گزارش خبرگزاری
            ایمنا از کردستان، «فاطمه مهاجرانی» سخنگوی دولت از انتصاب استانداران
            استان‌های کردستان و کهکیلویه و بویراحمد در جلسه امروز هیئت دولت خبر
            داد. «آرش لهونی» متولد سال ۱۳۵۴ و اهل شهرستان پاوه از استان کرمانشاه
            بوده که دارای دکترای اقتصاد بین‌الملل است‌. لهونی در سوابق خود
            نمایندگی مردم پاوه، جوانرود، ثلاث باباجانی و روانسر در یازدهمین دوره
            مجلس شورای اسلامی، معاونت توسعه مدیریت و منابع انسانی استانداری
            کردستان، مدیرکل بودجه جمعیت هلال احمر کشور، مدیرعامل جمعیت هلال احمر
            استان کردستان، عضو شورای عالی هلال احمر، مشاور اقتصادی استاندار
            کردستان و عضو شورای اسلامی شهر سنندج را دارد.
          </p>
        </Row>
      </div>
    </div>
  );
};

export default CandidateDetail;
