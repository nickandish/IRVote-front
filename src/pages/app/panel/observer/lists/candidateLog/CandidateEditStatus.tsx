import { useEffect, useState } from "react";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import Loading from "../../../../../../component/loading/Loading";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";

interface CandidateEditStatusItem {
  ballot_id: number;
  ballot_farsi_title: string;
  old_status: boolean;
  new_status: boolean;
  manager: string;
  timestamp: string;
}

const CandidateEditStatus = () => {
  const [data, setData] = useState<CandidateEditStatusItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { observerDurationId } = useDuration();

  const getStatusText = (status: boolean) => {
    return status ? "فعال" : "غیرفعال";
  };

  useEffect(() => {
    apiClient
      .get(
        API_URLS.EDIT_STATUS_EXTENSION.replace(
          ":id",
          String(observerDurationId)
        )
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching edit status logs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
              <th>وضعیت قبلی</th>
              <th>وضعیت جدید</th>
              <th>مدیر</th>
              <th>زمان تغییر</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.ballot_farsi_title}</td>
                <td>{getStatusText(item.old_status)}</td>
                <td>{getStatusText(item.new_status)}</td>
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

export default CandidateEditStatus;
