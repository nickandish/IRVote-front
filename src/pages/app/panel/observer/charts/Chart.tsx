import { Container } from "react-bootstrap";
import VoterCount from "./charts/VoterCount";
import VoterGroupCount from "./charts/VoterGroupCount";
import VoterProvinceCount from "./charts/VoterProvinceCount";
import "./chart.scss";

const Chart = () => {
  return (
    <Container className="chart mb-5 text-center">
      <hr className="mt-5" />
      <h3>فعالیت رای دهندگان</h3>
      <div className="chart_chart">
        <VoterCount />
      </div>
      <hr className="mt-5" />
      <h3>فعالیت رای دهندگان</h3>
      <div className="chart_chart">
        <VoterProvinceCount />
      </div>

      <hr className="mt-5" />
      <h3>فعالیت رای دهندگان</h3>
      <div className="chart_chart">
        <VoterGroupCount />
      </div>
    </Container>
  );
};

export default Chart;
