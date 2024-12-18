import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import Loading from "../../../../../../component/loading/Loading";
import { Col } from "react-bootstrap";

interface DocumentResult {
  document_id: number;
  document_title: string;
  agreed: number;
  agreed_percentage: number;
  disagreed: number;
  disagreed_percentage: number;
  abstain: number;
  abstain_percentage: number;
}

const COLORS = ["#82ca9d", "#ff4d4f", "#8884d8"];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`رای‌ ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const DocVoterResult = () => {
  const [ballotData, setBallotData] = useState<any>(null);
  const { observerDurationId } = useDuration();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.DOC_RESULT_CHART.replace(":id", String(observerDurationId))
        );
        setBallotData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [observerDurationId]);

  if (!ballotData) return <Loading />;

  return (
    <div className="doc-voter-result obs-list container row">
      {Object.keys(ballotData).map((ballotName) => (
        <Col className="col-12 col-md-4 col-sm-6">
          <h4 className=" text-center ">{ballotName}</h4>
          <div key={ballotName} style={{ marginBottom: "50px" }}>
            {ballotData[ballotName].results.map((doc: DocumentResult) => (
              <div key={doc.document_id} style={{ marginBottom: "40px" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "موافق", value: doc.agreed },
                        { name: "مخالف", value: doc.disagreed },
                        { name: "ممتنع", value: doc.abstain },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      activeIndex={0}
                      activeShape={renderActiveShape}
                    >
                      {[
                        { name: "موافق", value: doc.agreed },
                        { name: "مخالف", value: doc.disagreed },
                        { name: "ممتنع", value: doc.abstain },
                      ].map((entry, index) => {
                        console.log(entry);
                        return (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        );
                      })}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </Col>
      ))}
    </div>
  );
};

export default DocVoterResult;
