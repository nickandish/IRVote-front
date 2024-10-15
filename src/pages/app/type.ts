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
  start_at: string;
  end_at: string;
  ballot_title: string;
  logo: string | null;
  type: number;
  fa_title: string;
  en_title: string | null;
  min_vote: number;
  max_vote: number;
  duration: number;
  status: number | null;
}
