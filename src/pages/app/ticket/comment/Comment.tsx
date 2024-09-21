import { Col, Row } from "react-bootstrap";

import "./comment.scss";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";

const Comment = () => {
  return (
    <>
      <Header title={"کامنت"} />
      <Navbar />

      <div className="container">
        <h2>انجام شده</h2>
        <Row className="box">
          <Col className="col-12">
            <p>
              شماره تیکت : <span> T321QWE </span>
            </p>
          </Col>
          <Col className="col-12">
            <p>
              نوع سرویس : <span> دیتاسنتر ابری </span>
            </p>
          </Col>
          <Col className="col-12">
            <p>
              تیم مربوط : <span> فروش </span>
            </p>
          </Col>
        </Row>
        <Row className="service">
          <Col className="col-6">
            <p>
              نام سرویس : <span> - </span>
            </p>
          </Col>
          <Col className="col-6">
            <p>
              تاریخ سرویس : <span> 03/07/01 </span>
            </p>
          </Col>
        </Row>
        <div className="comment_box">
          <Col className="col-12">
            <p className=" p_1">سلااااامممممم</p>
          </Col>
          <Col className="col-12">
            <p className=" p_2">سلااااامممممم</p>
          </Col>
        </div>
      </div>
    </>
  );
};

export default Comment;
