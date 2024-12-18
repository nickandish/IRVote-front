import { useEffect, useState } from "react";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import Loading from "../../../../../../component/loading/Loading";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";

interface BallotActionItem {
  action: string;
  ballot_id: number | null;
  ballot_name: string | null;
  manager: string;
  timestamp: string;
}

const getActionText = (action: string) => {
  switch (action) {
    case "0":
      return "افزودن";
    case "1":
      return "ویرایش";
    case "2":
      return "حذف";
    default:
      return "عملیاتی انجام نشده";
  }
};

const BallotAction = () => {
  const [data, setData] = useState<BallotActionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { observerDurationId } = useDuration();

  useEffect(() => {
    apiClient
      .get(API_URLS.BALLOT_ACTION.replace(":id", String(observerDurationId)))
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ballot actions:", error);
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
              <th>نام صندوق</th>
              <th>عملیات</th>
              <th>مدیر</th>
              <th>زمان انجام</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.ballot_name || "ناموجود"}</td>
                <td>{getActionText(item.action)}</td>
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

export default BallotAction;
