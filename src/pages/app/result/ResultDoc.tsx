import { useEffect, useState } from "react";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import Loading from "../../../component/loading/Loading";
import { API_URLS } from "../../../api/urls";
import apiClient from "../../../api/axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useLocation } from "react-router-dom";
import "./result.scss";
import ErrorPage from "../../../component/error/ErrorPage";

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

interface ResultDocData {
  total_voters: number;
  results: DocumentResult[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultDoc = () => {
  const [resultData, setResultData] = useState<ResultDocData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const ballotId = location.state?.ballotId;
  const ballotTitle = location.state?.ballotTitle as string;

  useEffect(() => {
    const fetchResultDoc = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.RESULT_DOC.replace(":id", ballotId.toString())
        );
        if (response.data.success) {
          setResultData(response.data.data);
        } else {
          setError("Failed to fetch results");
        }
      } catch (err) {
        setError("An error occurred while fetching results");
      } finally {
        setLoading(false);
      }
    };

    fetchResultDoc();
  }, []);

  return (
    <>
      <Header title={ballotTitle} />
      <Navbar />
      <div className="result-doc">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorPage />
        ) : (
          resultData?.results.map((doc) => (
            <div
              key={doc.document_id}
              className="chart-container container row"
            >
              <div className="vote-details col-md-6 col-12">
                <div className="accept fw-bold">
                  تعداد آرای موافق: {doc.agreed} نفر
                </div>
                <div className="dangerr fw-bold">
                  تعداد آرای مخالف: {doc.disagreed} نفر
                </div>
                <div className="blue fw-bold">
                  تعداد آرای ممتنع: {doc.abstain} نفر
                </div>
              </div>
              <div className="col-md-6 col-12">
                <Pie
                  data={{
                    labels: ["موافق", "مخالف", "ممتنع"],
                    datasets: [
                      {
                        label: "Vote Distribution",
                        data: [
                          doc.agreed_percentage,
                          doc.disagreed_percentage,
                          doc.abstain_percentage,
                        ],
                        backgroundColor: ["#35dccc", "#eb8c95", "#4CC9FE"],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          color: "#6a5ae0",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ResultDoc;
