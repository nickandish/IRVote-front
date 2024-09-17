import { Row, Col } from "react-bootstrap";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { PiInfoBold } from "react-icons/pi";
import "../../../scss/myElection.tsx/myElection.scss";
import { FaAngleLeft } from "react-icons/fa6";

// interface BoxProps {
//   borderColor: string;
//   titleColor: string;
//   title: string;
//   details: string;
// }

const Box = () =>
  // { borderColor, titleColor, title, details }
  {
    // const boxStyle = {
    //   borderColor: borderColor,
    //   titleColor: titleColor,
    // };

    return (
      <Col className="col-md-6 col-12">
        {/* <div className="box" style={{ borderColor: boxStyle.borderColor }}>
          <h2 style={{ color: boxStyle.titleColor }}>{title}</h2>
          <p>{details}</p>
        </div> */}
        <Row className="fw-bold box d-flex justify-content-center">
          <Row className="top d-flex pt-3">
            <Col className="col-1">
              <LiaBoxOpenSolid className="icon icon-box" />
            </Col>
            <Col className="col-10">
              <h6 className="fw-bold pt-1">
                انتخابات انجمن اسلامی دانشگاه تهران غرب
                <FaAngleLeft className="mt-0 mb-0 m-1 icon-left invisiblee" />
              </h6>
            </Col>
            <Col className="col-1 visiblee">
              <FaAngleLeft className="icon-left" />
            </Col>
          </Row>

          <div className="my-line" />

          <Row className="middle">
            <Col className="col-1"></Col>
            <Col>
              <p>شروع: 12 اردیبهشت</p>
            </Col>
            <Col>
              <p>پایان: 12 اردیبهشت</p>
            </Col>
            <Col className="col-1"></Col>

            <div className="bottom">
              <PiInfoBold className="icon icon-info" />
              <p className="info-p">انتخابات درحال برگزاری</p>
            </div>
          </Row>
        </Row>
      </Col>
    );
  };

export default Box;
