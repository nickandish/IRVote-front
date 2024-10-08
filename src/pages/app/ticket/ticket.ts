export interface Ticket {
  id: number;
  header: string | null;
  desc: string | null;
  status: number;
  file: string | null;
  start_at: string | null;
  end_at: string | null;
  satisfaction: number | null;
  user: number;
  staff: string | null;
  organ: string | null;
}

export interface TicketListResponse {
  success: boolean;
  message: string;
  dev_message: string;
  data: {
    current: number;
    per_page: number;
    count: number;
    previous: number | null;
    next: number | null;
    last_page: number;
    items: Ticket[];
  };
}
