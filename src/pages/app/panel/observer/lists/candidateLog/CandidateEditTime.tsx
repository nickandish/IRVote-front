import apiClient from "../../../../../../api/axios";
import { useEffect, useState } from "react";
import { API_URLS } from "../../../../../../api/urls";
import Loading from "../../../../../../component/loading/Loading";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";

interface CandidateEditTimeItem {
  ballot_id: number;
  ballot_farsi_title: string;
  old_end_time: string;
  new_end_time: string;
  manager: string;
  timestamp: string;
}

const CandidateEditTime = () => {
  const [data, setData] = useState<CandidateEditTimeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { observerDurationId } = useDuration();

  useEffect(() => {
    apiClient
      .get(
        API_URLS.EDIT_TIME_EXTENSION.replace(":id", String(observerDurationId))
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching edit time logs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [observerDurationId]);

  return (
    <div
      className="table-container"
      style={{ overflow: "auto", maxWidth: "100%", maxHeight: "400px" }}
    >
      {loading ? (
        <div className="text-center">
          <Loading />
        </div>
      ) : (
        <table className="text-center mt-4 tbl">
          <thead className="text-light">
            <tr>
              <th>عنوان رای‌گیری</th>
              <th>زمان قبلی پایان</th>
              <th>زمان جدید پایان</th>
              <th>اسم مدیر</th>
              <th>زمان تغییر</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.ballot_farsi_title}</td>
                <td>{new Date(item.old_end_time).toLocaleString("fa-IR")}</td>
                <td>{new Date(item.new_end_time).toLocaleString("fa-IR")}</td>
                <td>{item.manager}</td>
                <td>{new Date(item.timestamp).toLocaleString("fa-IR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CandidateEditTime;
