import { LuTrash2 } from "react-icons/lu";
import { TbPencil } from "react-icons/tb";
import { useState, useEffect } from "react";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import { useNavigate } from "react-router-dom";
import "../ManageGroup.scss";

interface TableVoterGroupProps {
  searchQuery: string;
}

interface VoterGroup {
  VoterGroup_Title: string;
  Coefficient: number;
  VoterGroup_Code: number;
  id: number;
}

const TableVoterGroup: React.FC<TableVoterGroupProps> = ({ searchQuery }) => {
  const { durationId } = useDuration();
  const [votersGroup, setVotersGroup] = useState<VoterGroup[]>([]);
  const navigate = useNavigate();

  const fetchVoterGroups = async () => {
    try {
      const response = await apiClient.get(
        API_URLS.GET_VOTER_GROUP.replace(":id", durationId)
      );
      setVotersGroup(response.data);
    } catch (error) {
      console.error("Error fetching voter groups:", error);
    }
  };

  const deleteVoterGroup = async (groupId: number) => {
    try {
      const response = await apiClient.delete(
        API_URLS.DEL_VOTER_GROUP.replace(":id", String(groupId))
      );
      console.log("Voter group deleted successfully:", response.data);
      fetchVoterGroups();
    } catch (error) {
      console.error("Error deleting voter group:", error);
    }
  };

  const handleEditClick = (id: number) => {
    navigate(`/admin/manage-voters/edit-voterGroup/${id}`, {
      state: { idG: id },
    });
  };

  useEffect(() => {
    fetchVoterGroups();
  }, [durationId]);

  const filteredVotersGroup = votersGroup.filter((voter) =>
    voter.VoterGroup_Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <table className="text-center mt-4 tbl">
      <thead className="text-light">
        <tr>
          <th>نام گروه</th>
          <th>ضریب</th>
          <th>کد گروه</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {filteredVotersGroup.map((voter) => (
          <tr key={voter.id}>
            <td>{voter.VoterGroup_Title}</td>
            <td>{voter.Coefficient}</td>
            <td>{voter.VoterGroup_Code}</td>
            <td>
              <LuTrash2
                onClick={() => deleteVoterGroup(voter.id)}
                className="delete-icon"
              />
              <TbPencil
                onClick={() => handleEditClick(voter.id)}
                className="edit-icon"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableVoterGroup;
