import { useMemo } from "react";
import { LuTrash2 } from "react-icons/lu";
import { TbPencil } from "react-icons/tb";

interface Candidate {
  id: number;
  Qualified: boolean;
  first_name: string;
  last_name: string;
  Ballot_name: string;
  CandidateCategory: string;
  Candidate_Confirm_Status: number;
}

const CandTable = ({
  candidates,
  searchQuery,
}: {
  candidates: Candidate[];
  searchQuery: string;
}) => {
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) =>
      `${candidate.first_name} ${candidate.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [candidates, searchQuery]);

  return (
    <table className="text-center mt-4 tbl">
      <thead className="text-light">
        <tr>
          <th>نام و نام خانوادگی</th>
          <th>گروه</th>
          <th>تایید شده</th>
          <th>وضعیت</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {filteredCandidates.map((candidate) => (
          <tr key={candidate.id}>
            <td>{`${candidate.first_name} ${candidate.last_name}`}</td>
            <td>{candidate.CandidateCategory}</td>
            <td>
              {candidate.Candidate_Confirm_Status === 1
                ? "تایید شده"
                : "تایید نشده"}
            </td>
            <td>{candidate.Qualified ? "مجاز" : "مجاز نیست"}</td>
            <td>
              <TbPencil
                onClick={() =>
                  console.log(`Editing candidate with ID: ${candidate.id}`)
                }
                className="edit-icon mx-2"
              />
              <LuTrash2
                onClick={() =>
                  console.log(`Deleting candidate with ID: ${candidate.id}`)
                }
                className="delete-icon"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CandTable;
