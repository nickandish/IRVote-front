import { useEffect, useState } from "react";
import { API_URLS } from "../../../../../../api/urls";
import apiClient from "../../../../../../api/axios";
import Loading from "../../../../../../component/loading/Loading";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";

interface CandidateActionItem {
  candidate_last_name: string;
  candidate_first_name: string;
  action: string;
  candidate_id: number;
  candidate_mobile: string;
  ballot_farsi_title: string;
  manager: string;
  timestamp: string;
  details: string;
}

const CandidateAction = () => {
  const [data, setData] = useState<CandidateActionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { observerDurationId } = useDuration();

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

  useEffect(() => {
    apiClient
      .get(API_URLS.ACTION_LOG.replace(":id", String(observerDurationId)))
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching candidate action list:", error);
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
              <th>شماره موبایل</th>
              <th>عملیات</th>
              <th>عنوان رای‌گیری</th>
              <th>اسم مدیر</th>
              <th>زمان عملیات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.candidate_first_name}</td>
                <td>{item.candidate_last_name}</td>
                <td>{item.candidate_mobile}</td>
                <td>{getActionText(item.action)}</td>
                <td>{item.ballot_farsi_title}</td>
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

export default CandidateAction;
