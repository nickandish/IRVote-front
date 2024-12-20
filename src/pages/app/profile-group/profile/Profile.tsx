import { Col, Container, Row } from "react-bootstrap";
import { FaPhone, FaPen } from "react-icons/fa";
import {
  MdEmail,
  MdOutlineInsertChartOutlined,
  MdOutlineFolderCopy,
} from "react-icons/md";
import { RiBodyScanFill } from "react-icons/ri";
import { PiEyeglasses } from "react-icons/pi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { LuFolderPlus } from "react-icons/lu";
import imgPlaceholder from "../../../../assets/femaileAvatar.svg";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import { Link } from "react-router-dom";
import { useUser } from "../../../../api/contextApi/UserContext";
import { useEffect } from "react";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import "./profile.scss";

function Profile() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(API_URLS.GET_USER);
        const userData = response.data.data;

        setUser({
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          mobileNumber: userData.mobile,
          avatar: userData.avatar || imgPlaceholder, // Direct use of avatar URL from backend
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [setUser]);

  return (
    <>
      <Header title="پروفایل" />
      <Navbar />
      <Container className="profile-page fw-bold">
        <Row className="warper">
          <Col className="col-4">
            <img
              src={user.avatar || imgPlaceholder}
              alt="profile"
              className="profile-image"
            />
          </Col>
          <Col className="col-4 text-end text-container">
            <Col className="col-12">
              <h2>
                {user.firstName} {user.lastName}
              </h2>
            </Col>
            <Col className="col-12 prfl">
              <div>
                <MdEmail />
              </div>
              <div>
                <p>{user.email}</p>
              </div>
            </Col>
            <Col className="col-12 prfl">
              <div>
                <FaPhone className="phone" />
              </div>
              <div>
                <p>{user.mobileNumber}</p>
              </div>
            </Col>
          </Col>
          <Col className="col-4 m-auto">
            <Link to="/profile-edit">
              <div className="m-auto icon">
                <FaPen className="i" />
              </div>
            </Link>
          </Col>
        </Row>

        <Row className="profile-page_field">
          <Col className="col-12 profile-page_field_btn">
            <button>مدیریت پروفایل</button>
            <RiBodyScanFill className="profile-page_field_btn_icon" />
          </Col>
          <Col className="col-12 profile-page_field_btn">
            <button>کاندید منتخب من</button>
            <MdOutlineInsertChartOutlined className="profile-page_field_btn_icon" />
          </Col>
          <Col className="col-12 profile-page_field_btn">
            <button>نشانه گذاری شده</button>
            <PiEyeglasses className="profile-page_field_btn_icon" />
          </Col>
          <Col className="col-12 profile-page_field_btn">
            <button>مدیریت درخواست های من</button>
            <MdOutlineFolderCopy className="profile-page_field_btn_icon" />
          </Col>
          <Col className="col-12 profile-page_field_btn">
            <button>ثبت درخواست جدید</button>
            <LuFolderPlus className="profile-page_field_btn_icon" />
          </Col>
          <Col className="col-12 profile-page_field_btn">
            <button>ارتباط با پشتیبانی</button>
            <IoChatboxEllipsesOutline className="profile-page_field_btn_icon" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
