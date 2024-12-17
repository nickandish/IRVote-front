import { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { API_URLS } from "../../../../../../api/urls";
import apiClient from "../../../../../../api/axios";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";

interface Vote {
  ballot_id: number;
  ballot_title: string;
  vote_confirmed: boolean;
}

interface Voter {
  voter_id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  province: string;
  voter_group: string;
  votes: Vote[];
}

const VoterVoteList = () => {
  const [data, setData] = useState<Voter[]>([]);
  const [ballotTitles, setBallotTitles] = useState<string[]>([]);
  const { observerDurationId } = useDuration();

  useEffect(() => {
    apiClient
      .get(API_URLS.VOTER_BALLOT.replace(":id", String(observerDurationId)))
      .then((response) => {
        const voters: Voter[] = response.data;
        setData(voters);

        const titles: string[] = [];
        voters.forEach((voter) => {
          voter.votes.forEach((vote) => {
            if (!titles.includes(vote.ballot_title)) {
              titles.push(vote.ballot_title);
            }
          });
        });
        setBallotTitles(titles);
      })
      .catch((error) => {
        console.error(
          "با مشکلی رو به رو هستیم لطفا بغدا محدادا تلاش کنید:",
          error
        );
      });
  }, [observerDurationId]);

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
            <th>استان</th>
            <th>گروه</th>
            {ballotTitles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((voter) => (
            <tr key={voter.voter_id}>
              <td>{voter.first_name}</td>
              <td>{voter.last_name}</td>
              <td>{voter.mobile}</td>
              <td>{voter.province}</td>
              <td>{voter.voter_group}</td>
              {ballotTitles.map((title, index) => {
                const vote = voter.votes.find((v) => v.ballot_title === title);
                return (
                  <td key={index}>
                    {vote?.vote_confirmed ? (
                      <FaRegCircleCheck color="green" />
                    ) : (
                      <IoIosCloseCircleOutline color="red" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoterVoteList;
