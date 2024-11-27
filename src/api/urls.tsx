export const API_URLS = {
  SEND_OTP: "/users/send_otp",
  LOGIN_BY_OTP: "/users/login",
  SIGNUP_BY_OTP: "/users/singup",
  GET_USER: "/users/UserDetail",
  FILL_PROFILE: "/users/FillProfileView",
  CHANGE_IMG: "/users/avatarupdate",
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
  PARTICIPATE_CHECK: "/Election/VoterParticipate/:id/",
  BALLOT_LIST: "/Election/BallotList/:id",
  BALLOT_DETAIL: "/Election/BallotDetail/:id",

  DOCUMENT_VOTE: "/Election/DocumentVote/ballot_id/doc_id/",

  CANDIDATE_VOTE: "/Election/CandidateVote/:id/",
  CONFIRM_STATUS: "/Election/Votecheck/:id/",
  GET_VOTER_VOTES: "/Election/GetVoterVotes/:id/",
  CONFIRM_VOTE: "/Election/voteconfirm/:id/",
  RESULT: "/Election/CandidateVoteResults/:id/",
  RESULT_DOC: "/Election/DocumentVoteResults/:id/",

  // ADMIN PANEL
  GET_ROLE: "/management_panel/UserRoleDetails/",
  DURATION_DETAIL: "/management_panel/ElectionDurationDetail/:id/",
  CONFIRM_STATUS_CHECK: "/management_panel/ConfirmStatusCheck/:id/",
  CONFIRM_TEXT_EDIT: "/management_panel/ConfirmStatusCheck/:id/",
  SET_STATUS_TO_NOT_ACTIVE: "/management_panel/SetStatusToNotActive/:id/",
  RESULT_DROPDOWN: "/management_panel/SetResultShowLevel/:id/",

  GET_VOTER_GROUP: "/management_panel/VoterGroupList/:id/",
  DEL_VOTER_GROUP: "/management_panel/DeleteVoterGroup/:id/",
  NEW_VOTER_GROUP: "/management_panel/AddVoterGroup/:id/",
  EDIT_VOTER_GROUP: "/management_panel/EditeVoterGroup/:id/:idG/",
  CONFIRM_VOTER_GROUP: "/management_panel/ConfirmVoterGroupStatus/:id/",

  GET_VOTER: "/management_panel/VoterList/:id/",
  ADD_VOTER: "/management_panel/AddVoter/:id/",
  EDIT_VOTER: "/management_panel/EditVoter/:id/:idV/",
  DEL_VOTER: "/management_panel/DeleteVoter/:id/",
  SUSPEND_VOTER: "/management_panel/SetVoterSuspend/:id/:idV/",
};
