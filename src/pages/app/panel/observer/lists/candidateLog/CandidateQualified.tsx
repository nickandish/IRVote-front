import { useEffect, useState } from "react";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import Loading from "../../../../../../component/loading/Loading";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";

interface CandidateQualifiedItem {
  candidate_first_name: string;
  candidate_last_name: string;
  ballot_id: number;
  ballot_name: string;
  manager: string;
  old_status: string;
  new_status: string;
  timestamp: string;
}

const CandidateQualified = () => {
  const [data, setData] = useState<CandidateQualifiedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { observerDurationId } = useDuration();

  useEffect(() => {
    apiClient
      .get(API_URLS.QUALIFIED_LOG.replace(":id", String(observerDurationId)))
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching qualified candidates:", error);
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
              <th>نام کاندید</th>
              <th>نام خانوادگی کاندید</th>
              <th>عنوان رای‌گیری</th>
              <th>اسم مدیر</th>
              <th>وضعیت قبلی</th>
              <th>وضعیت جدید</th>
              <th>زمان تغییر وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.candidate_first_name}</td>
                <td>{item.candidate_last_name}</td>
                <td>{item.ballot_name}</td>
                <td>{item.manager}</td>
                <td>{item.old_status}</td>
                <td>{item.new_status}</td>
                <td>{new Date(item.timestamp).toLocaleString("fa-IR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CandidateQualified;
