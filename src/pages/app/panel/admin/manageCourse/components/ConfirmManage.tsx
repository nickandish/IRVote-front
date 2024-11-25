import { Card, Col, Row } from "react-bootstrap";
import "../manageCourse.scss";

const ConfirmManage = () => {
  return (
    <>
      <Row className="confirmManage">
        <Card className="col-lg-4 col-12 mt-4 confirmManage_right text-center">
          <p>
            ایا رای دهندگان برای شرکت در انتخابات شما نیاز به تاییدیه دارند؟
          </p>
          <Row>
            <Col>
              <button className="yes">بله</button>
            </Col>
            <Col>
              <button className="no">خیر</button>
            </Col>
          </Row>
        </Card>
        {/* <Col></Col> */}
        <Card className="col-lg-7 col-12 mt-4 confirmManage_left">
          <p>متن تاییدیه خود را بنویسید</p>
          <textarea name="text"></textarea>
          <button className="confirm">تایید متن</button>
        </Card>
      </Row>
    </>
  );
};

export default ConfirmManage;
