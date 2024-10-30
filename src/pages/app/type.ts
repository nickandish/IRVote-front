export interface Election {
  id: number;
  Election_Duration_farsi_title: string;
  Start_at: string;
  End_at: string;
  Status: number;
  logo: string | null;
  Confirm_status: number;
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
  name: string;
  candidate_code: number;
  qualified: boolean;
  data: string;
  cv: string | null;
  video: string | null;
  ImagePath: string | null;
  background: string;
  user: number;
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

export interface Candidate {
  id: number;
  name: string;
  candidate_code: number;
  qualified: boolean;
  data: string;
  cv: string | null;
  video: string | null;
  ImagePath: string | null;
  background: string;
  user: number;
  ballot: number;
}
