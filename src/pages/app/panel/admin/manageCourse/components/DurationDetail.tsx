import { Card, Row } from "react-bootstrap";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import "../manageCourse.scss";

const DurationDetail = () => {
  return (
    <>
      <Card className="mt-5 row durationDetail">
        <Row>
          <Row className="col-5 mt-4 durationDetail_right text-center">
            <div className="icon">
              <HiOutlineArchiveBox />
            </div>
            <p>زمان شروع: 12 آبان ساعت 12:30</p>
            <p>زمان پایان: 12 آبان ساعت 23:30</p>
          </Row>

          <Row className="col-7 durationDetail_left">
            <p></p>
            <p>نام دوره انتخاباتی: نام دوره انتخاباتی</p>
            <p>وضعیت دوره انتخاباتی: وضعیت دوره انتخاباتی</p>
            <p>کد دوره انتخاباتی: کد دوره انتخاباتی</p>
            <p></p>
          </Row>
        </Row>
      </Card>
    </>
  );
};

export default DurationDetail;
