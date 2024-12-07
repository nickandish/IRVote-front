import { useEffect, useState } from "react";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";

interface DocumentResult {
  document_id: number;
  document_title: string;
  agreed: number;
  agreed_percentage: number;
  disagreed: number;
  disagreed_percentage: number;
  abstain: number;
  abstain_percentage: number;
}

interface DocumentData {
  total_voters: number;
  results: DocumentResult[];
}

interface DocumentResponse {
  success: boolean;
  message: string;
  data: Record<string, DocumentData>;
}

const VotedDocResult: React.FC = () => {
  const [documentData, setDocumentData] = useState<
    Record<string, DocumentData>
  >({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocumentResults = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<DocumentResponse>(
          API_URLS.DOCUMENT_BALLOT_LIST
        );
        if (response.data.success) {
          setDocumentData(response.data.data);
        } else {
          setError("خطا در دریافت داده‌ها");
        }
      } catch (err: any) {
        setError(err.message || "خطا در ارتباط با سرور");
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentResults();
  }, []);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا: {error}</p>;

  return (
    <div className="mt-4">
      {Object.entries(documentData).map(([ballotName, ballotDetails]) => (
        <div key={ballotName} className="mb-4">
          <h3>صندوق: {ballotName}</h3>
          <p>تعداد رأی‌دهندگان: {ballotDetails.total_voters}</p>
          <table className="tbl text-center mt-2">
            <thead>
              <tr>
                <th>شناسه سند</th>
                <th>عنوان سند</th>
                <th>موافق</th>
                <th>درصد موافق</th>
                <th>مخالف</th>
                <th>درصد مخالف</th>
                <th>ممتنع</th>
                <th>درصد ممتنع</th>
              </tr>
            </thead>
            <tbody>
              {ballotDetails.results.map((document: DocumentResult) => (
                <tr key={document.document_id}>
                  <td>{document.document_id}</td>
                  <td>{document.document_title}</td>
                  <td>{document.agreed}</td>
                  <td>{document.agreed_percentage}%</td>
                  <td>{document.disagreed}</td>
                  <td>{document.disagreed_percentage}%</td>
                  <td>{document.abstain}</td>
                  <td>{document.abstain_percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default VotedDocResult;
