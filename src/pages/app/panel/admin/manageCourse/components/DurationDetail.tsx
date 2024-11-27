import { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import Loading from "../../../../../../component/loading/Loading";
import ErrorPage from "../../../../../../component/error/ErrorPage";
import "../manageCourse.scss";

interface DurationDetailData {
  id: number;
  Election_Duration_farsi_title: string;
  Start_at: string;
  End_at: string;
  Status: number;
  logo: string;
  remaining_time: number;
  Confirm_status: boolean;
}

const DurationDetail = () => {
  const { durationId } = useDuration();
  const [detail, setDetail] = useState<DurationDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDurationDetail = async () => {
      if (!durationId) return;

      try {
        setIsLoading(true);
        const response = await apiClient.get(
          API_URLS.DURATION_DETAIL.replace(":id", durationId)
        );
        setDetail(response.data);
        console.log(detail);
      } catch (err) {
        setError("Failed to fetch duration detail.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDurationDetail();
  }, [durationId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (!detail) {
    return <p>دیتایی برای نمایش وحود ندارد.</p>;
  }

  return (
    <Card className="mt-5 row durationDetail">
      <Row>
        <Row className="col-5 mt-4 durationDetail_right text-center">
          <div className="icon">
            {detail.logo ? <img src={detail.logo} /> : <HiOutlineArchiveBox />}
          </div>
          <p>زمان شروع: {new Date(detail.Start_at).toLocaleString("fa-IR")}</p>
          <p>زمان پایان: {new Date(detail.End_at).toLocaleString("fa-IR")}</p>
        </Row>

        <Row className="col-7 durationDetail_left">
          <p>نام دوره انتخاباتی: {detail.Election_Duration_farsi_title}</p>
          <p>
            وضعیت دوره انتخاباتی: {detail.Status === 0 ? "غیرفعال" : "فعال"}
          </p>
          <p>کد دوره انتخاباتی: {detail.id}</p>
        </Row>
      </Row>
    </Card>
  );
};

export default DurationDetail;
