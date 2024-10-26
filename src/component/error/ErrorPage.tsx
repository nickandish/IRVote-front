import { Col, Container, Row } from "react-bootstrap";
import img from "../../assets/undraw_server_down.svg";
import "./errorPage.scss";

const ErrorPage = () => {
  return (
    <Container className="error-page">
      <Row className=" error align-items-center">
        <Col className="col-12 col-md-6 error-text">
          <Row>
            <Row>
              <p className="error-404">404 ERROR</p>
            </Row>
            <Row>
              <p className="error-title ">متاسفیم...!</p>
            </Row>
            <Row>
              <p className="error-p">
                ارتباط به دلیل نا مشخصی قطع شد! همکاران ما در تلاش برای رفع این
                مشکل هستند.
              </p>
            </Row>
          </Row>
        </Col>

        <Col className="col-12 col-md-6">
          <img src={img} alt="notFound" />
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
