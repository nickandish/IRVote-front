import { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import { BsCake } from "react-icons/bs";
import { RxDownload } from "react-icons/rx";
import { BiLike, BiDislike } from "react-icons/bi";
import apiClient from "../../../api/axios";
import { API_URLS } from "../../../api/urls";
import Loading from "../../../component/loading/Loading";
import ErrorPage from "../../../component/error/ErrorPage";
import { FaRegHand } from "react-icons/fa6";
import "./document.scss";

interface DocumentData {
  id: number;
  Document_Farsi_Title: string;
  Document_English_Title: string;
  Document_File_Url: string | null;
  Description: string;
  file: string;
}

const Document = () => {
  const location = useLocation();
  const ballotId = location.state?.ballotId;
  const ballotTitle = location.state?.ballotTitle as string;

  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [voteStatus, setVoteStatus] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [finalizedCode, setFinalizedCode] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.BALLOT_DETAIL.replace(":id", ballotId)
        );
        if (response.data.success && response.data.data.length > 0) {
          setDocumentData(response.data.data[0]);
        } else {
          setError(response.data.message || "Document not found");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch document");
      }
    };

    const fetchConfirmStatus = async () => {
      try {
        const response = await apiClient.get(
          API_URLS.CONFIRM_STATUS.replace(":id", ballotId.toString())
        );
        if (response.data) {
          setConfirmed(response.data.data.confirmed);
        }
      } catch (err) {
        console.error("Error fetching confirmation status:", err);
      }
    };

    if (ballotId) fetchDocument();
    fetchConfirmStatus();
  }, [ballotId]);

  const voteToDocument = async (voteType: number) => {
    if (!documentData?.id) {
      setVoteStatus("Document ID is missing");
      return;
    }

    try {
      const response = await apiClient.post(
        API_URLS.DOCUMENT_VOTE.replace("ballot_id", ballotId).replace(
          "doc_id",
          String(documentData.id)
        ),
        {
          vote_Document: voteType,
        }
      );

      if (response.data.success) {
        setVoteStatus(response?.data?.message || "رای شما با موفقیت ثبت شد");
        setFinalizedCode(response.data.data.finalized_code);
        setShowModal(true);
      } else {
        setVoteStatus(response.data.message);
      }
    } catch (err: any) {
      setVoteStatus(err.response?.data?.message || "Error submitting vote");
    }
  };

  if (error)
    return (
      <>
        <Header title={ballotTitle} />
        <Navbar />
        <ErrorPage />
      </>
    );
  if (!documentData)
    return (
      <>
        <Header title={ballotTitle} />
        <Navbar />
        <Loading />
      </>
    );

  return (
    <>
      <Header title="انتخاب سند" />
      <Navbar />
      <Container className={`document-page ${confirmed ? "disable" : ""}`}>
        <Row className="document-page_top">
          <Col>
            <Row>
              <Col className="col-2">
                <BsCake className="icon-logo" />
              </Col>
              <Col className="col-10">
                <h2>{documentData.Document_Farsi_Title}</h2>
              </Col>
            </Row>
          </Col>
          <Col>
            <a href={documentData.file || "#"} download>
              <button>
                <RxDownload className="download" />
                دانلود سند
              </button>
            </a>
          </Col>
        </Row>

        <Row className="document-page_mid mt-3 p-4">
          <h6>چکیده</h6>
          <p>{documentData.Description}</p>
        </Row>

        <Row className="document-page_bottom mt-5">
          <Col>
            <h4 className="fw-bold">رای شما به این سند</h4>
            <button onClick={() => voteToDocument(0)} className="btn-accept">
              <BiLike />
              آری
            </button>
            <button onClick={() => voteToDocument(2)} className="btn-abstain">
              <FaRegHand />
              ممتنع
            </button>
            <button onClick={() => voteToDocument(1)} className="btn-danger">
              <BiDislike />
              خیر
            </button>
            {voteStatus && <p>{voteStatus}</p>}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>نتیجه رای</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>رای شما با موفقیت ثبت شد</p>
          <p>کد رهگیری: {finalizedCode}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            تایید
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Document;
