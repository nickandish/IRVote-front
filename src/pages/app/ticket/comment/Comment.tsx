import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row, Form } from "react-bootstrap";
import { IoSend } from "react-icons/io5";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import "./comment.scss";

interface Comment {
  id: number;
  text: string;
  type: "client" | "help";
}

// // Fetch comments from the API
// const fetchComments = async (): Promise<Comment[]> => {
//   const response = await axios.get<Comment[]>("/api/comments");
//   return response.data;
// };

// // Post a new comment to the API
// const postComment = async (comment: Comment): Promise<void> => {
//   await axios.post("/api/comments", comment);
// };

const Comment = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  // useEffect(() => {
  //   const loadComments = async () => {
  //     try {
  //       const data = await fetchComments();
  //       setComments(data);
  //     } catch (error) {
  //       console.error("Error fetching comments:", error);
  //     }
  //   };

  //   loadComments();
  // }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (newComment.trim() === "") return;

  //   const newCommentObject: Comment = {
  //     id: comments.length + 1,
  //     text: newComment,
  //     type: "client",
  //   };

  //   try {
  //     await postComment(newCommentObject);
  //     setComments([...comments, newCommentObject]);
  //     setNewComment("");
  //   } catch (error) {
  //     console.error("Errore posting comment:", error);
  //   }
  // };

  return (
    <>
      <Header title={"کامنت"} />
      <Container className="fw-bold">
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
              {/* {comments.map((comment) => (
              <div
                key={comment.id}
                className={comment.type === "client" ? "client" : "help"}
              >
                <div className={comment.type === "client" ? "" : "postibaani"}>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))} */}
              <div className="client">
                <p>
                  سلااااااااامممممم سلاااااااممممم سلااااااممممممم
                  سلاااااااممممم
                </p>
              </div>
              <div className="help">
                <div className="postibaani">
                  <p>
                    سلاااااااممممم سلااااااااامممممممممممم سلااااااامممممم
                    سلاااااامممممم سلاااااااممممم
                  </p>
                </div>
              </div>

              <div className="client">
                <p>
                  سلااااااااامممممم سلاااااااممممم سلااااااممممممم
                  سلاااااااممممم
                </p>
              </div>
              <div className="help">
                <div className="postibaani">
                  <p>
                    سلاااااااممممم سلااااااامممممم سلاااااامممممم سلاااااااممممم
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="comment-input">
            <Form
              // onSubmit={handleSubmit}
              className="mt-3"
            >
              <Form.Group controlId="newComment">
                <Form.Control
                  type="text"
                  value={newComment}
                  onChange={handleInputChange}
                  placeholder="درخواست خود را بنویسید"
                  className="input-send"
                />
              </Form.Group>
              <button type="submit" className="button-send">
                <IoSend className="icon" />
              </button>
            </Form>
          </div>
        </div>
      </Container>
      <Navbar />
    </>
  );
};

export default Comment;
