import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../../../../api/urls";
import apiClient from "../../../../../../../api/axios";
import CandDetail from "./candComponents/CandDetail";
import { useParams } from "react-router-dom";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  Candidate_Confirm_Status: string;
  Image: File | null;
  CV: File | null;
  Video: File | null;
  background: string;
  Ballot_ID: string;
  Description: string;
  CandidateCategory: string;
}

export interface Category {
  id: number;
  Ballot_CandidateCategory_Title: string;
  Min_Allowed_Selection: number;
  Max_Allowed_Selection: number;
}

const CandAdd: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    Candidate_Confirm_Status: "",
    Image: null,
    CV: null,
    Video: null,
    background: "",
    Ballot_ID: "",
    Description: "",
    CandidateCategory: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.GET_CATEGORIES.replace(":idB", String(id))
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof FormData]) {
        data.append(key, formData[key as keyof FormData] as any);
      }
    });

    try {
      const response = await apiClient.post(
        API_URLS.ADD_CANDIDATE.replace(":idB", String(id)),
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      setAlertMessage("کاندید با موفقیت ثبت شد!");
      setAlertType("success");

      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 3000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || "خطا در ارسال اطلاعات";
      setAlertMessage(errorMessage);
      setAlertType("error");

      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 3000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files }: any = e.target;

    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      {alertMessage && (
        <div
          className={`alert ${
            alertType === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {alertMessage}
        </div>
      )}

      <CandDetail
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        categories={categories}
      />
    </div>
  );
};

export default CandAdd;
