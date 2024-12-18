import { useEffect, useState } from "react";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import Loading from "../../../../../../component/loading/Loading";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";

interface BallotStatusItem {
  ballot_id: number;
  ballot_farsi_title: string;
  old_status: number;
  new_status: number;
  manager: string;
  timestamp: string;
}

const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "در حال بررسی";
    case 1:
      return "در حال انجام";
    case 2:
      return "پایان یافته";
    case 3:
      return "متوقف شده";
    case 4:
      return "لغو شده";
    default:
      return "وضعیت نامشخص";
  }
};

const BallotStatus = () => {
  const [data, setData] = useState<BallotStatusItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { observerDurationId } = useDuration();

  useEffect(() => {
    apiClient
      .get(API_URLS.BALLOT_STATUS.replace(":id", String(observerDurationId)))
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ballot status:", error);
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
              <th>عنوان صندوق</th>
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

export default BallotStatus;
