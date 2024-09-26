import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row, Form } from "react-bootstrap";
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import "./comment.scss";

interface Comment {
  id: number;
  text: string;
  type: "client" | "help";
}

// Placeholder functions for API calls
const fetchComments = async (): Promise<Comment[]> => {
  // Simulate fetching comments
  return [
    { id: 1, text: "Initial comment from client", type: "client" },
    { id: 2, text: "Initial comment from help", type: "help" },
  ];
};

const postComment = async (comment: Comment): Promise<void> => {
  // Simulate posting a comment
  console.log("Posted comment:", comment);
};

const CommentComponent = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    loadComments();
  }, []);

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

  return (
    <>
      <div className="nav">
        <Header title={"کامنت"} />
        <Navbar />
      </div>

      <Container className="fw-bold comment-container">
        <Row className="box">
          <Col className="col-12">
            <h2>انجام شده</h2>
          </Col>
          <Col className="col-12">
            <p>
              شماره تیکت : <span> T321QWE </span>
            </p>
          </Col>
          <Col className="col-12">
            <p>
              نوع سرویس : <span> دیتاسنتر ابری </span>
            </p>
          </Col>

          <Row className="service">
            <Col className="col-6">
              <p>
                نام سرویس : <span> - </span>
              </p>
            </Col>
            <Col className="col-6">
              <p>
                تاریخ سرویس : <span> 03/07/01 </span>{" "}
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
