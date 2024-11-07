export interface Election {
  id: number;
  Election_Duration_farsi_title: string;
  Start_at: string;
  End_at: string;
  Status: number;
  logo: string | null;
  Confirm_status: number;
  remaining_time: string;
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

export interface Candidate {
  id: number;
  Candidate_code: number;
  Qualified: boolean;
  Image: string | null;
  Video: string | null;
  CV: string | null;
  background: string;
  max_allowed_selection: number;
  min_allowed_selection: number;
  is_selected: boolean;
  user: {
    username: string;
    first_name: string;
    last_name: string;
    status: number;
  };
}

export interface BallotItem {
  id: number;
  Ballot_Farsi_Title: string;
  Ballot_Type: number;
  Start_at: string;
  End_at: string;
  Status: number;
  remaining_time?: string;
  // min_vote: number;
  // max_vote: number;
}
