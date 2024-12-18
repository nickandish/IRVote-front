import VoterAction from "./VoterAction";
import VoterSuspendList from "./VoterSuspendList";
import VoterVoteList from "./VoterVoteList";
import "../list.scss";
import { Container } from "react-bootstrap";

const VoterLog = () => {
  return (
    <Container className="obs-list">
      <hr className="mt-5" />
      <h3 className="mt-5">فعالیت رای دهندگان</h3>
      <VoterVoteList />
      <hr className="mt-5" />
      <h3>وضعیت رای دهندگان</h3>
      <VoterSuspendList />
      <hr className="mt-5" />
      <h3>مدیریت اطلاعات رای دهندگان</h3>
      <VoterAction />
    </Container>
  );
};

export default VoterLog;
