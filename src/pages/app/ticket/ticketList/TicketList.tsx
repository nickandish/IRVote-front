import { FaRegEye } from "react-icons/fa6";
import "../../candidate/voteList/VoteList.scss";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import "./ticketList.scss";

const TicketList = () => {
  return (
    <>
      <Header title="لیست درخواست‌ها" />
      <Navbar />
      <table className="text-center mt-4 tbl ticket-list">
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
              <FaRegEye />
            </td>
          </tr>
        </tbody>
        <tbody className="tbl_blue">
          <tr>
            <td>عنوان درخواست</td>
            <td colSpan={2}>02/01/05</td>
            <td>تایید شده</td>
            <td>
              <FaRegEye />
            </td>
          </tr>
        </tbody>
        <tbody className="tbl_accept">
          <tr>
            <td>عنوان درخواست</td>
            <td colSpan={2}>02/01/05</td>
            <td>تایید شده</td>
            <td>
              <FaRegEye />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TicketList;
