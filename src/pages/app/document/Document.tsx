import { Col, Container, Row } from "react-bootstrap";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import { BsCake } from "react-icons/bs";
import { RxDownload } from "react-icons/rx";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import "./document.scss";

const Document = () => {
  return (
    <>
      <Header title="انتخاب سند" />
      <Navbar />

      <Container className="document-page">
        <Row className="document-page_top">
          <Col>
            <Row>
              <Col className="col-2">
                <BsCake className="icon-logo" />
              </Col>
              <Col className="col-10">
                <h2>سند دبیرخانه</h2>
              </Col>
            </Row>
          </Col>

          <Col>
            <button>
              <RxDownload className="download" />
              دانلود سند
            </button>
          </Col>
        </Row>

        <Row className="document-page_mid mt-3 p-4">
          <h6>چکیده</h6>
          <p>
            انتخابات یک فرایند تصمیم‌گیری رسمی است که طی آن مردم یا بخشی از مردم
            برای ادارهٔ امور عمومی خود شخص یا اشخاصی را برای مقامی رسمی به مدت
            معلوم با ریختن رأی به صندوق‌های انتخاباتی برمی‌گزینند.[۱] از سدهٔ ۱۷
            میلادی به این سو، برگزاری انتخابات سازوکار معمول برای تحقق
            مردمسالاری نیابتی بوده است.[۱] از انتخابات ممکن است برای اختصاص
            کرسی‌های موجود در قوهٔ مقننه استفاده شود. همچنین برخی کشورها سمت‌های
            موجود در قوای اجرایی و قضایی و دولت‌های محلی را نیز با انتخابات به
            نامزدهای برگزیده اختصاص می‌دهند. از فرایند انتخابات در بسیاری از
            سازمان‌های خصوصی و تجاری، از باشگاه‌ها گرفته تا انجمن‌های داوطلبانه
            و ابرشرکت‌ها استفاده می‌شود.
          </p>
        </Row>

        <Row className="document-page_bottom mt-5">
          <Col>
            <Row>
              <h4 className="fw-bold">رای شما به این سند</h4>
            </Row>
            <button className="btn-accept">
              <BiLike />
              آری
            </button>
            <button className="btn-danger">
              <BiDislike />
              خیر
            </button>
          </Col>
          <Col className="col-none" />
        </Row>
      </Container>
    </>
  );
};

export default Document;
