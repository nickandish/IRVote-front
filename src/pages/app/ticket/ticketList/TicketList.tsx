import { FaRegEye } from "react-icons/fa6";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import { Link } from "react-router-dom";
import "../../candidate/voteList/VoteList.scss";
import "./ticketList.scss";

const TicketList = () => {
  return (
    <>
      <Header title="لیست درخواست‌ها" />
      <Navbar />
      <div className="ticket-list">
        <table className="text-center mt-4 tbl">
          <thead className="text-light ">
            <tr>
              <th colSpan={2}>عنوان</th>
              <th>تاریخ</th>
              <th>وضعیت</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="tbl_danger">
            <tr>
              <td>عنوان درخواست</td>
              <td colSpan={2}>02/01/05</td>
              <td>تایید شده</td>
              <td>
                <Link to="/ticketEdit">
                  <FaRegEye className="icon" />
                </Link>
              </td>
            </tr>
          </tbody>
          <tbody className="tbl_blue">
            <tr>
              <td>عنوان درخواست</td>
              <td colSpan={2}>02/01/05</td>
              <td>تایید شده</td>
              <td>
                <Link to="/ticketEdit">
                  <FaRegEye className="icon" />
                </Link>
              </td>
            </tr>
          </tbody>
          <tbody className="tbl_accept">
            <tr>
              <td>عنوان درخواست</td>
              <td colSpan={2}>02/01/05</td>
              <td>تایید شده</td>
              <td>
                <Link to="/ticketEdit">
                  <FaRegEye className="icon" />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TicketList;
