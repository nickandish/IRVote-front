import { useEffect, useState } from "react";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import Loading from "../../../../../../component/loading/Loading";

interface VoterStatusChange {
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

type VoterStatusResponse = VoterStatusChange[];

const VoterStatusChanges: React.FC = () => {
  const [statusChanges, setStatusChanges] = useState<VoterStatusChange[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatusChanges = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<VoterStatusResponse>(
          API_URLS.VOTER_STATUS_CHANGES
        );
        setStatusChanges(response.data);
      } catch (err: any) {
        setError(err.message || "خطا در ارتباط با سرور");
      } finally {
        setLoading(false);
      }
    };

    fetchStatusChanges();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>خطا: {error}</p>;

  return (
    <div className="mt-4">
      <h3>تغییرات وضعیت رأی‌دهندگان</h3>
      <table className="tbl text-center mt-2">
        <thead>
          <tr>
            <th>نام رأی‌دهنده</th>
            <th>شماره موبایل</th>
            <th>وضعیت قبلی</th>
            <th>وضعیت جدید</th>
            <th>مدیر</th>
            <th>آی‌پی مدیر</th>
            <th>زمان تغییر</th>
          </tr>
        </thead>
        <tbody>
          {statusChanges.map((change: VoterStatusChange, index) => (
            <tr key={index}>
              <td>
                {change.voter_first_name} {change.voter_last_name}
              </td>
              <td>{change.voter_mobile}</td>
              <td>{getStatusName(change.old_status)}</td>
              <td>{getStatusName(change.new_status)}</td>
              <td>{change.manager}</td>
              <td>{change.manager_ip || "نا مشخص"}</td>
              <td>{formatTimestamp(change.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getStatusName = (status: number): string => {
  switch (status) {
    case 0:
      return "رای داده";
    case 1:
      return "رای نداده";
    case 2:
      return "مسدود";
    default:
      return "نامشخص";
  }
};

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default VoterStatusChanges;
