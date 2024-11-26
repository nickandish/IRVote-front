import { MdBlock } from "react-icons/md";
import img from "../../../../../../assets/femaileAvatar.svg";
import "../../../../candidate/voteList/VoteList.scss";
import "../manageVoters.scss";
import { LuTrash2 } from "react-icons/lu";
import { TbPencil } from "react-icons/tb";

interface TableVotersProps {
  searchQuery: string;
}

const TableVoters: React.FC<TableVotersProps> = ({ searchQuery }) => {
  const voters = [
    {
      img: img,
      name: "John Doe",
      mobile: "09938023855",
      groupName: "دانشجو",
      status: "رای داده",
    },
    {
      img: img,
      name: "John Doe",
      mobile: "09938023855",
      groupName: "دانشجو",
      status: "رای داده",
    },
    {
      img: img,
      name: "John Doe",
      mobile: "09938023855",
      groupName: "دانشجو",
      status: "رای داده",
    },
    {
      img: img,
      name: "John Doe",
      mobile: "09938023855",
      groupName: "دانشجو",
      status: "رای داده",
    },
    {
      img: img,
      name: "John Doe",
      mobile: "09938023855",
      groupName: "دانشجو",
      status: "رای داده",
    },
    {
      img: img,
      name: "John Doe",
      mobile: "09938023855",
      groupName: "دانشجو",
      status: "رای داده",
    },
  ];

  const filteredVoters = voters.filter((voter) =>
    voter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <table className="text-center mt-4 tbl">
      <thead className="text-light">
        <tr>
          <th></th>
          <th>نام</th>
          <th>شماره موبایل</th>
          <th>گروه رای دهنده</th>
          <th>وضعیت</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredVoters.map((voter) => (
          //   <tr key={voter.id}>
          <tr>
            <td>
              <img src={voter.img} />
            </td>
            <td>{voter.name}</td>
            <td>{voter.mobile}</td>
            <td>{voter.groupName}</td>
            <td>{voter.status}</td>
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

export default TableVoters;
