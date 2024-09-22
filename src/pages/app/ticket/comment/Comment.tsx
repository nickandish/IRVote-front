import { Col, Row } from "react-bootstrap";

import "./comment.scss";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";

const Comment = () => {
  return (
    <>
      <Header title={"کامنت"} />
      <div className="container">
        <Row className="box">
          <Col className="col-12">
            <h2>انجام شده</h2>
          </Col>
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

          <Row className="service">
            <Col className="col-6">
              <p>
                نام سرویس : <span> - </span>
              </p>
            </Col>
            <Col className="col-6">
              <p>
                تاریخ سرویس : <span> 03/07/01 </span>{" "}
              </p>
            </Col>
          </Row>
        </Row>

        <div className="comment_box">
          <div className="client">
            <p>
              سلااااااااامممممم سلاااااااممممم سلااااااممممممم سلاااااااممممم
            </p>
          </div>
          <div className="help">
            <div className="postibaani">
              <p>
                سلاااااااممممم سلااااااااامممممممممممم سلااااااامممممم
                سلاااااامممممم سلاااااااممممم
              </p>
            </div>
          </div>

          <div className="client">
            <p>
              سلااااااااامممممم سلاااااااممممم سلااااااممممممم سلاااااااممممم
            </p>
          </div>
          <div className="help">
            <div className="postibaani">
              <p>
                سلاااااااممممم سلااااااامممممم سلاااااامممممم سلاااااااممممم
              </p>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Comment;
