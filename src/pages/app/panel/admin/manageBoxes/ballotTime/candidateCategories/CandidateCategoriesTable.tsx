import React, { useEffect, useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { TbPencil } from "react-icons/tb";
import { Alert, Modal, Button } from "react-bootstrap";
import apiClient from "../../../../../../../api/axios";
import { API_URLS } from "../../../../../../../api/urls";
import { useParams } from "react-router-dom";
import Loading from "../../../../../../../component/loading/Loading";
import "../ballotRules.scss";

interface VoterGroup {
  Ballot_CandidateCategory_Title: string;
  Min_Allowed_Selection: number;
  Max_Allowed_Selection: number;
  id: number;
}

const CandidateCategoriesTable: React.FC<{ searchQuery: string }> = ({
  searchQuery,
}) => {
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<VoterGroup[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<VoterGroup[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.GET_CATEGORIES.replace(":idB", id!)
        );
        setCategories(response.data);
        setFilteredCategories(response.data);
      } catch (err) {
        setError("خطا در بارگیری لیست دسته‌بندی‌ها.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [id]);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.Ballot_CandidateCategory_Title.toLowerCase().includes(
        searchQuery.toLowerCase()
      )
    );
    setFilteredCategories(filtered);
  }, [searchQuery, categories]);

  const handleDelete = async () => {
    if (!selectedCategoryId) return;
    try {
      const response = await apiClient.delete(
        API_URLS.DEL_CATEGORIES.replace(":idCat", String(selectedCategoryId))
      );
      setCategories((prev) =>
        prev.filter((category) => category.id !== selectedCategoryId)
      );
      setSuccess(response.data.detail || "دسته‌بندی با موفقیت حذف شد.");
    } catch (err) {
      setError("خطا در حذف دسته‌بندی.");
    } finally {
      setShowModal(false);
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
    }
  };

  const handleEditClick = (categoryId: number) => {
    console.log(`Editing category with ID: ${categoryId}`);
    // Navigate or trigger edit logic here
  };

  const openDeleteModal = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setShowModal(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <table className="text-center mt-4 tbl">
        <thead className="text-light">
          <tr>
            <th>آیدی</th>
            <th>نام</th>
            <th>حداقل انتخاب</th>
            <th>حداکثر انتخاب</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.Ballot_CandidateCategory_Title}</td>
              <td>{category.Min_Allowed_Selection}</td>
              <td>{category.Max_Allowed_Selection}</td>
              <td>
                <TbPencil
                  onClick={() => handleEditClick(category.id)}
                  className="edit-icon mx-2"
                />
                <LuTrash2
                  onClick={() => openDeleteModal(category.id)}
                  className="delete-icon"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>حذف دسته‌بندی</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            انصراف
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CandidateCategoriesTable;
