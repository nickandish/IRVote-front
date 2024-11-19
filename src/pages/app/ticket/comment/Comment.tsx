import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { useParams } from "react-router-dom";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import { TicketDetail, TicketDetailResponse } from "../ticket";
import "./comment.scss";
import Loading from "../../../../component/loading/Loading";

interface Comment {
  id: number;
  user: string;
  is_staff: boolean;
  text: string;
  file?: string | null;
  created_at?: string | null;
  ticket: number;
}

const fetchComments = async (id: string): Promise<Comment[]> => {
  const response = await apiClient.get<{
    data: { items: Comment[] };
  }>(API_URLS.COMMENT_GET.replace(":id", id));

  return response.data.data.items.sort((a, b) => a.id - b.id);
};

const postComment = async (
  id: string,
  comment: { text: string }
): Promise<void> => {
  await apiClient.post(API_URLS.COMMENT_POST.replace(":id", id), comment);
};

const CommentComponent = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [ticketDetail, setTicketDetail] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const statusMap: { [key: number]: { text: string; className: string } } = {
    0: { text: "درحال بررسی", className: "blue" },
    1: { text: "تایید شده", className: "accept" },
    2: { text: "تایید نشده", className: "danger" },
  };

  const status =
    ticketDetail?.status !== undefined
      ? statusMap[ticketDetail.status] || { text: "نامشخص", className: "" }
      : { text: "نامشخص", className: "" };

  useEffect(() => {
    const loadCommentsAndDetails = async () => {
      if (!id) {
        console.error("No ticket ID provided in the URL");
        return;
      }
      try {
        const ticketResponse = await apiClient.get<TicketDetailResponse>(
          API_URLS.TICKET_DETAIL.replace(":id", id)
        );
        setTicketDetail(ticketResponse.data.data);
        const data = await fetchComments(id);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments or ticket details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCommentsAndDetails();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(file);
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      console.log("Selected file:", selectedFile);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const newCommentObject = { text: newComment };
    try {
      await postComment(id || "", newCommentObject);
      const newCommentFromServer: Comment = {
        id: comments.length + 1,
        user: "current_user",
        is_staff: false,
        text: newComment,
        file: null,
        created_at: new Date().toISOString(),
        ticket: parseInt(id || "0", 10),
      };
      setComments([...comments, newCommentFromServer]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (loading) {
    return (
      <>
        <Header title="لیست درخواست‌ها" />
        <Navbar />
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="nav">
        <Header title={"کامنت"} />
        <Navbar />
      </div>
      <Container className="fw-bold comment-container">
        <Row className="box">
          <Col className="col-12">
            <h2>{ticketDetail?.header || "بدون عنوان"}</h2>
          </Col>
          <Col className="col-12">
            <p>
              توضیحات تیکت : <span>{ticketDetail?.desc || "-"}</span>
            </p>
          </Col>
          <Row className="service">
            <Col className="col-6">
              <p>
                وضعیت تیکت:
                <span className={status.className}>{status.text}</span>
              </p>
            </Col>
            <Col className="col-6">
              <p>
                شماره تیکت : <span>{id}</span>
              </p>
            </Col>
          </Row>
        </Row>
        <div className="comment">
          <div className="comment_box">
            <div className="texts">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={comment.is_staff ? "help" : "client"}
                >
                  <div className={comment.is_staff ? "postibaani" : ""}>
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="comment-input">
            <Form onSubmit={handleSubmit} className="mt-3">
              <Form.Group controlId="newComment">
                <Form.Control
                  type="text"
                  value={newComment}
                  onChange={handleInputChange}
                  placeholder="درخواست خود را بنویسید"
                  className="input-send"
                />
              </Form.Group>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button type="button" onClick={handleUploadClick}>
                <GrAttachment className="icon-attach" />
              </button>
              <button type="submit" className="button-send">
                <IoSend className="icon" />
              </button>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CommentComponent;
