import { MdBlock } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { TbPencil } from "react-icons/tb";
import "../ManageGroup.scss";

interface TableVoterGroupProps {
  searchQuery: string;
}

const TableVoterGroup: React.FC<TableVoterGroupProps> = ({ searchQuery }) => {
  const votersGroup = [
    { groupName: "دانشجو", times: 2, groupCode: 3 },
    { groupName: "دانشجو", times: 2, groupCode: 3 },
    { groupName: "دانشجو", times: 2, groupCode: 3 },
    { groupName: "دانشجو", times: 2, groupCode: 3 },
    { groupName: "دانشجو", times: 2, groupCode: 3 },
    { groupName: "دانشجو", times: 2, groupCode: 3 },
    { groupName: "دانشجو", times: 2, groupCode: 3 },
    { groupName: "دانشجو", times: 2, groupCode: 3 },
  ];

  const filteredVotersGroup = votersGroup.filter((voter) =>
    voter.groupName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <table className="text-center mt-4 tbl">
      <thead className="text-light">
        <tr>
          <th>نام گروه</th>
          <th>ضریب</th>
          <th>کد گروه</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredVotersGroup.map((voter) => (
          //   <tr key={voter.id}>
          <tr>
            <td>{voter.groupName}</td>
            <td>{voter.times}</td>
            <td>{voter.groupCode}</td>

            <td>
              <MdBlock />
              <LuTrash2 />
              <TbPencil />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableVoterGroup;
