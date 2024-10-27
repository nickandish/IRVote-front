export const API_URLS = {
  SEND_OTP: "/users/send_otp",
  LOGIN_BY_OTP: "/users/login",
  SIGNUP_BY_OTP: "/users/singup",
  GET_USER: "/users/UserDetail",
  FILL_PROFILE: "/users/FillProfileView",
  CHANGE_IMG: "/users/change_photo",
  CHANGE_PASSWORD: "/users/change_password",
  CAPTCHA_GET: "/users/get_captcha",
  CAPTCHA_POST: "/users/check_captcha",

  TICKET_LIST: "/ticket/ticket_list",
  TICKET_CREATE: "/Ticket/create_ticket",
  TICKET_DETAIL: "/ticket/ticket_detail/:id",
  COMMENT_GET: "/ticket/ticket_comment_list/:id",
  COMMENT_POST: "/ticket/create_comment/:id",

  ELECTION_LIST: "/election/user_elections_list",
  DURATION_LIST: "/election/user_duration_list/:id",
  BALLOT_LIST: "/election/user_ballot_list/:id",
  CANDIDATE_LIST: "/election/candidate_list",
  ADD_LIST: "/election/add_vote/:id",
  SELECTED_VOTE: "/election/selected_candidate_list/:id",
  VOTE_LIST: "/election/duration_candidates_votes",
  CONFIRM_VOTE: "/election/confirm_vote/:id",
};
