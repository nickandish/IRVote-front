export interface Election {
  id: number;
  fa_title: string;
  en_title: string;
  start_at: string;
  end_at: string;
  status: number;
  logo: string;
}

export interface DurationItem {
  id: number;
  fa_title: string;
  start_at: string;
  end_at: string;
  status: number;
  logo: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  dev_message: string;
  data: T;
}
