import { useEffect, useState } from "react";
import { API_URLS } from "../../../../../../api/urls";
import apiClient from "../../../../../../api/axios";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";

interface VoterSuspend {
  voter: number;
  voter_first_name: string;
  voter_last_name: string;
  voter_mobile: string;
  old_status: number;
  new_status: number;
  manager: string;
  manager_ip: string | null;
  timestamp: string;
}

const VoterSuspendList = () => {
  const [data, setData] = useState<VoterSuspend[]>([]);
  const { observerDurationId } = useDuration();

  useEffect(() => {
    apiClient
      .get(
        API_URLS.VOTER_STATUS_LIST.replace(":id", String(observerDurationId))
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suspend list:", error);
      });
  }, [observerDurationId]);

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "رای داده";
      case 1:
        return "رای نداده";
      case 2:
        return "بلاک شده";
      default:
        return "نامشخص";
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
            <th>وضعیت قبلی</th>
            <th>وضعیت فعلی</th>
            <th>زمان تغییر وضعیت</th>
            <th>اسم مدیر</th>
            <th>IP مدیر</th>
          </tr>
        </thead>
        <tbody>
          {data.map((voter) => (
            <tr key={voter.voter}>
              <td>{voter.voter_first_name}</td>
              <td>{voter.voter_last_name}</td>
              <td>{voter.voter_mobile}</td>
              <td>{getStatusText(voter.old_status)}</td>
              <td>{getStatusText(voter.new_status)}</td>
              <td>{new Date(voter.timestamp).toLocaleString("fa-IR")}</td>
              <td>{voter.manager}</td>
              <td>{voter.manager_ip || "ندارد"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoterSuspendList;
