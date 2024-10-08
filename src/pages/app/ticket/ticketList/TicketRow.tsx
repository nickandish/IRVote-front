import React from "react";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Ticket } from "../ticket";

interface TicketRowProps {
  ticket: Ticket;
}

const statusMap: { [key: number]: { text: string; className: string } } = {
  0: { text: "در حال بررسی", className: "tbl_blue" },
  1: { text: "تایید شده", className: "tbl_accept" },
  2: { text: "تایید نشده", className: "tbl_danger" },
};

const TicketRow: React.FC<TicketRowProps> = ({ ticket }) => {
  const status = statusMap[ticket.status] || { text: "نامشخص", className: "" };

  const formattedDate = ticket.start_at
    ? new Date(ticket.start_at).toLocaleDateString("fa-IR")
    : "نامشخص";

  return (
    <tr className={status.className}>
      <td>{ticket.header || "بدون عنوان"}</td>
      <td colSpan={2}>{formattedDate}</td>
      <td>{status.text}</td>
      <td>
        <Link to={`/ticketComment/${ticket.id}`}>
          <FaRegEye className="icon" />
        </Link>
      </td>
    </tr>
  );
};

export default TicketRow;
