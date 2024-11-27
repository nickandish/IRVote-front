import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import img from "../../../../../../assets/femaileAvatar.svg";
import "../../../../candidate/voteList/VoteList.scss";
import { MdBlock } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { TbPencil } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import "../manageVoters.scss";

interface TableVotersProps {
  searchQuery: string;
}

interface VotersProp {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  voter_group: string;
  Voting_status: number;
  img?: string;
}

const TableVoters: React.FC<TableVotersProps> = ({ searchQuery }) => {
  const { durationId } = useDuration();
  const [voters, setVoters] = useState<VotersProp[]>([]);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );
  const navigate = useNavigate();

  const fetchVoters = async () => {
    try {
      const response = await apiClient.get(
        API_URLS.GET_VOTER.replace(":id", durationId)
      );
      setVoters(response.data);
    } catch (error) {
      console.error("Error fetching voters:", error);
    }
  };

  const deleteVoter = async (voterId: number) => {
    try {
      const response = await apiClient.delete(
        API_URLS.DEL_VOTER.replace(":id", String(voterId))
      );
      console.log("Voter deleted successfully:", response.data);
      setAlert({ type: "success", message: "رای‌دهنده با موفقیت حذف شد" });
      fetchVoters();
    } catch (error) {
      console.error("Error deleting voter:", error);
      setAlert({ type: "danger", message: "خطا در حذف رای‌دهنده" });
    } finally {
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const suspendVoter = async (voterId: number) => {
    try {
      const response = await apiClient.post(
        API_URLS.SUSPEND_VOTER.replace(":id", String(durationId)).replace(
          ":idV",
          String(voterId)
        )
      );
      console.log("Voter suspended successfully:", response.data);
      setAlert({ type: "success", message: "رای‌دهنده با موفقیت مسدود شد" });
      fetchVoters();
    } catch (error) {
      console.error("Error suspending voter:", error);
      setAlert({ type: "danger", message: "خطا در مسدود کردن رای‌دهنده" });
    } finally {
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleEditClick = (voterId: number) => {
    navigate(`/admin/manage-voters/edit-voter/${voterId}`);
  };

  useEffect(() => {
    fetchVoters();
  }, [durationId]);

  const filteredVoters = voters.filter(
    (voter) =>
      voter.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voter.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voter.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voter.voter_group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}
      <table className="text-center mt-4 tbl">
        <thead className="text-light">
          <tr>
            <th></th>
            <th>نام و نام خانوادگی</th>
            <th>شماره موبایل</th>
            <th>گروه رای دهنده</th>
            <th>وضعیت</th>
            <th>ویرایش</th>
            <th>انسداد</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {filteredVoters.map((voter) => (
            <tr key={voter.id}>
              <td>
                <img src={voter.img || img} alt="Voter Avatar" />
              </td>
              <td>
                {voter.first_name} {voter.last_name}
              </td>
              <td>{voter.mobile}</td>
              <td>{voter.voter_group}</td>
              <td>{voter.Voting_status === 0 ? "رای داده" : "رای نداده"}</td>
              <td>
                <TbPencil
                  onClick={() => handleEditClick(voter.id)}
                  className="icon1"
                />
              </td>
              <td>
                <MdBlock
                  className="icon1"
                  onClick={() => suspendVoter(voter.id)}
                />
              </td>
              <td>
                <LuTrash2
                  onClick={() => deleteVoter(voter.id)}
                  className="icon1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableVoters;
