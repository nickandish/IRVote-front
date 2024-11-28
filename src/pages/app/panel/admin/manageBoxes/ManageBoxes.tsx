import { useNavigate, useParams, Routes, Route } from "react-router-dom";
import BallotTime from "./ballotTime/BallotTime";
import BallotRules from "./ballotTime/BallotRules";
import DocManage from "./ballotTime/DocManage";
import CandManage from "./ballotTime/CandManage";
import { Card, Col, Container, Row } from "react-bootstrap";
import { IoHome } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import MenuPanel from "../../menu/MenuPanel";
import "./manageBoxes.scss";

export const ballotMenuItem = [
  {
    title: "بازگشت به مدیریت صندوق‌ها",
    icon: <IoHome />,
    path: "/admin/manage-boxes",
  },
  {
    title: "مدیریت زمان‌بندی صندوق",
    icon: <MdManageHistory />,
    path: `/admin/manage-boxes/:id/scheduling`,
  },
  {
    title: "مدیریت قواعد صندوق",
    icon: <MdManageHistory />,
    path: `/admin/manage-boxes/:id/rules`,
  },
  {
    title: "مدیریت سند",
    icon: <MdManageHistory />,
    path: `/admin/manage-boxes/:id/documents`,
  },
  {
    title: "مدیریت کاندیدها",
    icon: <MdManageHistory />,
    path: `/admin/manage-boxes/:id/candidates`,
  },
];

const ManageBoxes = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const ballotBoxes = [
    { id: 1, title: "صندوق 1", description: "توضیحات صندوق 1" },
    { id: 2, title: "صندوق 2", description: "توضیحات صندوق 2" },
    { id: 3, title: "صندوق 3", description: "توضیحات صندوق 3" },
    { id: 4, title: "صندوق 4", description: "توضیحات صندوق 4" },
    { id: 5, title: "صندوق 5", description: "توضیحات صندوق 5" },
    { id: 6, title: "صندوق 6", description: "توضیحات صندوق 6" },
    { id: 7, title: "صندوق 7", description: "توضیحات صندوق 7" },
    { id: 8, title: "صندوق 8", description: "توضیحات صندوق 8" },
  ];

  return (
    <div className="">
      {id ? (
        <div className="admin-content">
          <MenuPanel
            menuItems={ballotMenuItem}
            header="پنل  مدیرتی صندوق‌ها"
            onMenuItemClick={(path) => navigate(path)}
          />
          <BallotTime />
          <Routes>
            <Route path="/admin/manage-boxes/:id" element={<BallotTime />} />
            <Route
              path="/admin/manage-boxes/:id/scheduling"
              element={<BallotTime />}
            />
            <Route
              path="/admin/manage-boxes/:id/rules"
              element={<BallotRules />}
            />
            <Route
              path="/admin/manage-boxes/:id/documents"
              element={<DocManage />}
            />
            <Route
              path="/admin/manage-boxes/:id/candidates"
              element={<CandManage />}
            />
          </Routes>
        </div>
      ) : (
        <Container className="manage-boxes">
          <Row>
            {ballotBoxes.map((box) => (
              <Col key={box.id} lg={3} md={4} className="mb-4 col-6">
                <Card
                  className="ballot-box-card"
                  onClick={() => navigate(`/admin/manage-boxes/${box.id}`)}
                >
                  <Card.Body className="text-center">
                    <h5>{box.title}</h5>
                    <p>{box.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ManageBoxes;
