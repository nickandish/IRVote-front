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
  TICKET_CREATE: "/ticket/create_ticket",
  TICKET_DETAIL: "/ticket/ticket_detail/:id",
  COMMENT_GET: "/ticket/ticket_comment_list/:id",
  COMMENT_POST: "/ticket/create_comment/:id",

  ELECTION_Duration: "/Election/VoterElectionDurationList",
  PARTICIPATE_POST: "/Election/ParticipateInElection/:id/",
  PARTICIPATE_GET: "/Election/confirmtext/:id",
  BALLOT_LIST: "/Election/BallotList/:id",
  BALLOT_DETAIL: "/Election/BallotDetail/:id",
  DOCUMENT_VOTE: "/Election/DocumentVote/ballot_id/doc_id/",
  CANDIDATE_VOTE: "/Election/VoteCandidate/:id",
  EDIT_VOTE: "/Election/EditVote/:id",
  CONFIRM_VOTE: "/Election/confirmvote/:id",
  VOTE_LIST: "/Election/CandidateVoteCount/:id",
};
