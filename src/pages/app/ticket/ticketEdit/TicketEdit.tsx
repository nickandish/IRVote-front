import { Col, Container, Row } from "react-bootstrap";
// import "../../../login/loginScss/login.scss";
import "./ticketEdit.scss";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import img from "../../../../assets/download.jpg";

const TicketEdit = () => {
  return (
    <>
      <Header title="ویرایش درخواست" />
      <Navbar />
      <Container className="ticket-edit">
        <p className="text-center">02/03/01</p>
        <div className="mb-4 ">
          <label>موضوع درخواست</label>
          <input
            placeholder="موضوع درخواست"
            id="form1"
            type="text"
            className="input login-card_input"
          />
        </div>
        <div className="mb-4">
          <label> تیم مربوط</label>
          <input
            placeholder="تیم مربوط"
            id="form1"
            type="text"
            className="input login-card_input"
          />
        </div>
        <div className="mb-4">
          <label> نوع سرویس</label>
          <input
            placeholder="نوع سرویس"
            id="form1"
            type="text"
            className="input login-card_input"
          />
        </div>
        <div className="mb-4">
          <label> نام سرویس</label>
          <input
            placeholder="نام سرویس"
            id="form1"
            type="text"
            className="input login-card_input"
          />
        </div>
        <textarea
          id="comments"
          name="comments"
          placeholder="Enter your comments here..."
        />
        <p className="p_text">فایل های آپلود شده</p>
        <Row>
          <Col className="col-6 text-center c-img">
            <img src={img} />
          </Col>
          <Col className="col-6 text-center c-img">
            <img src={img} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TicketEdit;
