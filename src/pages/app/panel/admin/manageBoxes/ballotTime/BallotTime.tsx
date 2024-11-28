import { Container } from "react-bootstrap";
import EndOfBallot from "./components/EndOfBallot";
import SetBallot from "./components/setBallot/SetBallot";
import ExtendOfBallot from "./components/ExtendOfBallot";
import MenuPanel from "../../../menu/MenuPanel";
import { ballotMenuItem } from "../ManageBoxes";
import { useNavigate } from "react-router-dom";
import "./ballotTime.scss";

const BallotTime = () => {
  const navigate = useNavigate();

  return (
    <>
      <MenuPanel
        menuItems={ballotMenuItem}
        header="پنل  مدیرتی صندوق‌ها"
        onMenuItemClick={(path) => navigate(path)}
      />
      <Container className="ballot-time">
        <SetBallot />
        <EndOfBallot />
        <ExtendOfBallot />
      </Container>
    </>
  );
};

export default BallotTime;
