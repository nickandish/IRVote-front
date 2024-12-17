import VoterAction from "./VoterAction";
import VoterSuspendList from "./VoterSuspendList";
import VoterVoteList from "./VoterVoteList";
import "../list.scss";
import { Container } from "react-bootstrap";

const VoterLog = () => {
  return (
    <Container className="obs-list">
      <h3>فعالیت رای دهندگان</h3>
      <VoterVoteList />
      <h3>وضعیت رای دهندگان</h3>
      <VoterSuspendList />
      <h3>مدیریت اطلاعات رای دهندگان</h3>
      <VoterAction />
    </Container>
  );
};

export default VoterLog;
