import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { useParams } from "react-router-dom";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import "./comment.scss";

interface Comment {
  id: number;
  text: string;
  type: "client" | "help";
}

interface TicketDetail {
  id: number;
  header: string;
  desc: string;
  status: number;
  start_at: string | null;
  end_at: string | null;
}

interface TicketDetailResponse {
  success: boolean;
  message: string;
  dev_message: string;
  data: TicketDetail; // Ticket details are inside the 'data' field
}

const fetchComments = async (): Promise<Comment[]> => {
  return [
    { id: 1, text: "Initial comment from client", type: "client" },
    { id: 2, text: "Initial comment from help", type: "help" },
  ];
};

const postComment = async (comment: Comment): Promise<void> => {
  console.log("Posted comment:", comment);
};

const CommentComponent = () => {
  const { id } = useParams<{ id: string | undefined }>(); // Get the ticket ID from the URL
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [ticketDetail, setTicketDetail] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCommentsAndDetails = async () => {
      if (!id) {
        console.error("No ticket ID provided in the URL");
        return;
      }

      try {
        // Fetch ticket details using the correct API URL and response type
        const ticketResponse = await apiClient.get<TicketDetailResponse>(
          API_URLS.TICKET_DETAIL.replace(":id", id)
        );

        // Set the ticket details from the response's 'data' field
        setTicketDetail(ticketResponse.data.data); // Accessing the correct 'data' field

        // Fetch comments (dummy or real implementation here)
        const data = await fetchComments();
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

    const newCommentObject: Comment = {
      id: comments.length + 1,
      text: newComment,
      type: "client",
    };

    try {
      await postComment(newCommentObject);
      setComments([...comments, newCommentObject]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (loading) {
    return <p>در حال بارگذاری...</p>;
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
                وضعیت تیکت : <span>{ticketDetail?.status}</span>
              </p>
            </Col>
            <Col className="col-6">
              <p>
                شماره تیکت : <span> {id} </span>
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
                  className={comment.type === "client" ? "client" : "help"}
                >
                  <div
                    className={comment.type === "client" ? "" : "postibaani"}
                  >
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
