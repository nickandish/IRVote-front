export const API_URLS = {
  SEND_OTP: "/users/send_otp",
  LOGIN_BY_OTP: "/users/login_by_otp",
  GET_USER: "/users/user_detail",
  FILL_PROFILE: "/users/fill_profile",
  CHANGE_IMG: "/users/change_photo",
  CHANGE_PASSWORD: "/users/change_password",
  CAPTCHA_GET: "/users/get_captcha",
  CAPTCHA_POST: "/users/check_captcha",

  TICKET_LIST: "/ticket/ticket_list",
  TICKET_CREATE: "/ticket/create_ticket",
  TICKET_DETAIL: "/ticket/ticket_detail/:id",

  ELECTION_LIST: "/election/user_elections_list",
  DURATION_LIST: "/election/user_duration_list/:id",
  BALLOT_LIST: "/election/user_ballot_list/:id",
  CANDIDATE_LIST: "/election/candidate_list",
  VOTE_LIST: "/election/duration_candidates_votes",
  CONFIRM_VOTE: "/election/confirm_vote/:id",
  PARTICIPATE: "/election/participate_in_election/:id",
};
