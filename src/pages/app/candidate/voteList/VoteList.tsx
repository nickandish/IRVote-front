import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import img from "../../../../assets/femaileAvatar.svg";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import Loading from "../../../../component/loading/Loading";
import { Button, Modal } from "react-bootstrap";
import moment from "jalali-moment";
import "./VoteList.scss";

interface SelectedCandidate {
  candidate_id: number;
  candidate_name: string;
  candidate_image: string;
}

interface VoterVotesResponse {
  success: boolean;
  ballot_id: number;
  selected_candidates: SelectedCandidate[];
}

const convertToJalali = (date: string): string => {
  return moment(date).locale("fa").format("YYYY/MM/DD - HH:mm:ss");
};

const VoteList: React.FC = () => {
  const [votes, setVotes] = useState<VoterVotesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{
    message: string;
    date?: string;
    code?: string;
  } | null>(null);

  const location = useLocation();
  const ballotId = location.state?.ballotId as number;

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await apiClient.get<VoterVotesResponse>(
          API_URLS.GET_VOTER_VOTES.replace(":id", ballotId.toString())
        );
        if (response.data.success) {
          setVotes(response.data);
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVotes();
  }, [ballotId]);

  const handleSubmitVotes = async () => {
    try {
      const response = await apiClient.post(
        API_URLS.CONFIRM_VOTE.replace(":id", ballotId.toString()),
        {
          selected_candidates: [1],
        }
      );
      if (response.data.success) {
        setModalData({
          message: response.data.message,
          date: convertToJalali(response.data.data.finalized_date),
          code: response.data.data.finalized_code,
        });
      } else {
        setModalData({
          message: response.data.message,
        });
      }
    } catch (error: any) {
      setModalData({
        message:
          error.response?.data?.message || "خطایی در ارسال رای رخ داده است.",
      });
    } finally {
      setModalVisible(true);
    }
  };

  return (
    <div className="text-center">
      {loading ? (
        <p className="mb-5 pb-5">
          <Loading />
        </p>
      ) : (
        <table className="text-center mt-4 tbl">
          <thead className="text-light">
            <tr>
              <th></th>
              <th colSpan={2}>نام کاندید</th>
              <th>رای شما</th>
            </tr>
          </thead>
          <tbody>
            {votes?.selected_candidates.map((candidate: SelectedCandidate) => (
              <tr key={candidate.candidate_id}>
                <td>
                  <div className="tbl_img">
                    <img
                      src={candidate.candidate_image || img}
                      alt="Candidate"
                    />
                  </div>
                </td>
                <td colSpan={2}>{candidate.candidate_name}</td>
                <td>
                  <FaCircleCheck />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="candidate-list_btn fw-bold mt-5"
        onClick={handleSubmitVotes}
      >
        ثبت نهایی رای
      </button>

      <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
        <Modal.Header>
          <Modal.Title>نتیجه رای‌گیری</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalData?.message}</p>
          {modalData?.date && <p>تاریخ: {modalData.date}</p>}
          {modalData?.code && <p>کد رهگیری: {modalData.code}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalVisible(false)}>بستن</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VoteList;
