import { Container } from "react-bootstrap";
import CandidateAction from "./CandidateAction";
import CandidateEditStatus from "./CandidateEditStatus";
import CandidateEditTime from "./CandidateEditTime";
import CandidateQualified from "./CandidateQualified";

const CandidateLog = () => {
  return (
    <Container className="obs-list">
      <h3>مدیریت اطلاعات کاندید</h3>
      <CandidateAction />
      <hr className="mt-5" />
      <h3>وضعیت صلاحیت کاندید</h3>
      <CandidateQualified />
      <hr className="mt-5" />
      <h3>زمان ویرایش اطلاعات کاندید</h3>
      <CandidateEditTime />
      <hr className="mt-5" />
      <h3>وضعیت زمان ویرایش اطلاعات کاندید</h3>
      <CandidateEditStatus />
    </Container>
  );
};

export default CandidateLog;
