import { useState, useMemo } from "react";
import { LuTrash2 } from "react-icons/lu";
import { TbPencil } from "react-icons/tb";
import { Modal, Button, Alert } from "react-bootstrap";
import apiClient from "../../../../../../../api/axios";
import { API_URLS } from "../../../../../../../api/urls";
import { useNavigate, useParams } from "react-router-dom";

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
  updateCandidates, // Get the function from parent to update candidates list
}: {
  candidates: Candidate[];
  searchQuery: string;
  updateCandidates: (deletedCandidateId: number) => void; // Type for the updateCandidates function
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) =>
      `${candidate.first_name} ${candidate.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [candidates, searchQuery]);

  const handleDeleteClick = (candidateId: number) => {
    setSelectedCandidate(candidateId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (selectedCandidate === null) return;
    try {
      await apiClient.delete(
        API_URLS.DEL_cANDIDATE.replace(":id", String(selectedCandidate))
      );
      setSuccess("دسته‌بندی با موفقیت حذف شد.");
      updateCandidates(selectedCandidate); // Call the function to update the list
      setShowModal(false);
    } catch (err: any) {
      setError("خطا در حذف دسته‌بندی.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditClick = (candidateId: number) => {
    navigate(
      `/admin/manage-boxes/${id}/candidates/editCandidate/${candidateId}`
    );
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

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
                  onClick={() => handleEditClick(candidate.id)}
                  className="edit-icon mx-2"
                />
                <LuTrash2
                  onClick={() => handleDeleteClick(candidate.id)}
                  className="delete-icon"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>آیا از حذف این دسته‌بندی اطمینان دارید؟</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          حذف این دسته‌بندی غیرقابل برگشت است. آیا مطمئن هستید که می‌خواهید آن
          را حذف کنید؟
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            بستن
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CandTable;
