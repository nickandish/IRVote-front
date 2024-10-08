import React, { useEffect, useState } from "react";
import Header from "../../../navbar/Header";
import Navbar from "../../../navbar/Navbar";
import apiClient from "../../../../api/axios";
import { API_URLS } from "../../../../api/urls";
import TicketRow from "./TicketRow";
import { Ticket, TicketListResponse } from "../ticket";
import "../../candidate/voteList/VoteList.scss";
import "./ticketList.scss";

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await apiClient.get<TicketListResponse>(
          API_URLS.TICKET_LIST
        );
        if (response.data.success) {
          setTickets(response.data.data.items);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("خطا در دریافت لیست تیکت‌ها.");
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <>
        <Header title="لیست درخواست‌ها" />
        <Navbar />
        <div className="ticket-list">
          <p>در حال بارگذاری...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="لیست درخواست‌ها" />
        <Navbar />
        <div className="ticket-list">
          <p>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="لیست درخواست‌ها" />
      <Navbar />
      <div className="ticket-list">
        <table className="text-center mt-4 tbl">
          <thead className="text-light">
            <tr>
              <th>عنوان</th>
              <th colSpan={2}>تاریخ</th>
              <th>وضعیت</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketRow key={ticket.id} ticket={ticket} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TicketList;
