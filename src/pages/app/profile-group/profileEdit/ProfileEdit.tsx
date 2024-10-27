import React, { useEffect, useState } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import imgPlaceholder from "../../../../assets/femaileAvatar.svg";
import Toggle from "./Toggle";
// import PasswordPopUp from "./PasswordPopUp";
import "./profileEdit.scss";
import { useUser } from "../../../../api/contextApi/UserContext";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import { useNavigate } from "react-router-dom";
import Header from "../../../navbar/Header";

const ProfileEdit: React.FC = () => {
  const [toggle, setToggle] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const handleToggle = (field: string) => {
    setToggle(toggle === field ? null : field);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(API_URLS.GET_USER);
        const userData = response.data.data;

        const imgURL = userData.avatar
          ? `${import.meta.env.VITE_APP_BASE_URL}${userData.avatar}`
          : imgPlaceholder;

        setUser({
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          mobileNumber: userData.mobile,
          img: imgURL,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update user profile data
      const profileData = {
        first_name: user.firstName,
        last_name: user.lastName,
        mobile: user.mobileNumber,
        email: user.email,
      };
      const profileResponse = await apiClient.put(
        API_URLS.FILL_PROFILE,
        profileData
      );

      if (profileResponse.data.success) {
        console.log("Profile updated successfully");
      }

      // Handle profile image update
      if (selectedImage) {
        const formData = new FormData();
        formData.append("photo", selectedImage);

        const imgResponse = await apiClient.put(API_URLS.CHANGE_IMG, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (imgResponse.data.success) {
          console.log("Profile image updated successfully");
          const updatedUserResponse = await apiClient.get(API_URLS.GET_USER);
          const updatedUserData = updatedUserResponse.data.data;

          const imgURL = updatedUserData.avatar
            ? `${import.meta.env.VITE_APP_BASE_URL}${updatedUserData.avatar}`
            : imgPlaceholder;

          setUser({
            firstName: updatedUserData.first_name,
            lastName: updatedUserData.last_name,
            email: updatedUserData.email,
            mobileNumber: updatedUserData.mobile,
            img: imgURL,
          });

          console.log("Updated user data:", updatedUserData);
        }
      }

      // Handle password change
      // if (newPassword && newPassword === confirmPassword) {
      //   const passwordData = {
      //     password: newPassword,
      //     confirm_password: confirmPassword,
      //   };
      //   const passwordResponse = await apiClient.put(
      //     API_URLS.CHANGE_PASSWORD,
      //     passwordData
      //   );

      //   if (passwordResponse.data.success) {
      //     console.log("Password updated successfully");
      //   } else {
      //     alert("There was an error updating your password. Please try again.");
      //   }
      // } else if (newPassword || confirmPassword) {
      //   alert("Passwords do not match. Please try again.");
      // }

      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating your profile. Please try again.");
    }
  };

  return (
    <div className="profile-edit-page">
      <div className="head">
        <Header title="ویرایش پروفایل" />
        <Navbar />
      </div>

      <Container className="profile-edit">
        <Row className="text-center">
          <div className="rounded-circle profile-edit_img">
            <img
              src={user.img || imgPlaceholder} // استفاده مستقیم از user.img
              className="rounded-circle"
              alt="Profile"
            />
            <label htmlFor="file-upload" className="custom-file-upload">
              <LuImagePlus className="icon" />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </Row>
        <Row className="text-center profile-edit_field">
          {["name", "lastName", "email", "phone"].map((field) => (
            <Col className="col-12" key={field}>
              <button
                onClick={() => handleToggle(field)}
                className={toggle === field ? "active" : ""}
              >
                <p>
                  {field === "name" && "نام:"}
                  {field === "lastName" && "نام خانوادگی:"}
                  {field === "email" && "ایمیل:"}
                  {field === "phone" && "شماره تماس:"}
                </p>
                <p>
                  {field === "name" && user.firstName}
                  {field === "lastName" && user.lastName}
                  {field === "email" && user.email}
                  {field === "phone" && user.mobileNumber}
                </p>
                <FaChevronLeft className="icon" />
              </button>
              {toggle === field && (
                <Toggle
                  title={
                    field === "name"
                      ? "نام"
                      : field === "lastName"
                      ? "نام خانوادگی"
                      : field === "email"
                      ? "ایمیل"
                      : "تماس"
                  }
                  value={
                    field === "name"
                      ? user.firstName
                      : field === "lastName"
                      ? user.lastName
                      : field === "email"
                      ? user.email
                      : user.mobileNumber
                  }
                  onChange={(value) =>
                    setUser({
                      ...user,
                      ...(field === "name" && { firstName: value }),
                      ...(field === "lastName" && { lastName: value }),
                      ...(field === "email" && { email: value }),
                      ...(field === "phone" && { mobileNumber: value }),
                    })
                  }
                />
              )}
            </Col>
          ))}
        </Row>

        {/* Password Change Section */}
        {/* <Row className="text-center profile-edit_field">
          <Col className="col-12">
            <h5>تغییر رمز عبور</h5>
          </Col>
          <Col className="col-12">
            <PasswordPopUp
              title="رمز عبور جدید"
              value={newPassword}
              onChange={setNewPassword}
            />
          </Col>
          <Col className="col-12">
            <PasswordPopUp
              title="تکرار رمز عبور جدید"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </Col>
        </Row> */}

        <Row className="profile-edit_btn">
          <button onClick={handleSubmit}>ثبت تغییرات</button>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileEdit;
