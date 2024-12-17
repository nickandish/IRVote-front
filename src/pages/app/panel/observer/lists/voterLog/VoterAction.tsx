import { useEffect, useState } from "react";
import { API_URLS } from "../../../../../../api/urls";
import apiClient from "../../../../../../api/axios";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";

interface VoterActionItem {
  voter: number;
  voter_first_name: string;
  voter_last_name: string;
  voter_mobile: string;
  action: string;
  manager: string;
  manager_ip: string | null;
  timestamp: string;
}

const VoterAction = () => {
  const [data, setData] = useState<VoterActionItem[]>([]);
  const { observerDurationId } = useDuration();

  useEffect(() => {
    apiClient
      .get(
        API_URLS.VOTER_ACTION_LIST.replace(":id", String(observerDurationId))
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching voter action list:", error);
      });
  }, [observerDurationId]);

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

  return (
    <div
      className="table-container"
      style={{ overflow: "auto", maxWidth: "100%", maxHeight: "400px" }}
    >
      <table className="text-center mt-4 tbl">
        <thead className="text-light">
          <tr>
            <th>نام رای دهنده</th>
            <th>نام خانوادگی رای دهنده</th>
            <th>شماره موبایل</th>
            <th>عملیات انجام شده</th>
            <th>اسم مدیر</th>
            <th>IP مدیر</th>
            <th>زمان عملیات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.voter}>
              <td>{item.voter_first_name}</td>
              <td>{item.voter_last_name}</td>
              <td>{item.voter_mobile}</td>
              <td>{getActionText(item.action)}</td>
              <td>{item.manager}</td>
              <td>{item.manager_ip || "ندارد"}</td>
              <td>{new Date(item.timestamp).toLocaleString("fa-IR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoterAction;
