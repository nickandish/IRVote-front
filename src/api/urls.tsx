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

  GET_BALLOT: "/management_panel/BallotList/1/",
  ADD_BALLOT: "/management_panel/AddBallot/:id/",
  EDIT_BALLOT: "/management_panel/EditeBallot/:id/:idB/",
  DEL_BALLOT: "/management_panel/DeleteBallot/:idB/",

  SET_TIME_BALLOT: "/management_panel/SetTimeBallot/:id/",
  SET_CANDIDATE_EDIT_TIME: "/management_panel/SetCandidateEditTime/:id/",
  EXTEND_CANDIDATE_EDIT_TIME: "/management_panel/ExtendCandidateEditTime/:id/",
  SET_CANDIDATE_EDIT_STATUS: "/management_panel/SetCandidateEditStatus/:idB/",
  EXTEND_BALLOT_TIME: "/management_panel/ExtendBallotEndTime/:idB/",
  HALT_BALLOT: "/management_panel/halt-ballot/:idB/",

  GET_DOC: "/management_panel/GetDocumentList/:id/",
  ADD_DOC: "/management_panel/AddDocumentToBallot/:idB/",
  EDIT_DOC: "/management_panel/EditeDocumentInBallot/:idB/:idD/",

  GET_CANDIDATE: "/management_panel/GetCandidateList/:idB/",
  ADD_CANDIDATE: "/management_panel/AddCandidate/:idB/",
  EDIT_CANDIDATE: "/management_panel/EditCandidate/:idB/:idC/",
  DEL_cANDIDATE: "/management_panel/DeleteCandidate/:id/",

  GET_CATEGORIES: "/management_panel/GetBallotCandidateCategory/:idB/",
  ADD_CATEGORIES: "/management_panel/AddBallotCandidateCategory/:idB/",
  EDIT_CATEGORIES:
    "/management_panel/EditeBallotCandidateCategory/:idB/:idCat/",
  DEL_CATEGORIES: "/management_panel/DeleteBallotCandidateCategory/:idCat/",

  GET_CANDIDATE_PANEL: "/management_panel/CandidateGetuser/",
  PUT_CANDIDATE_PANEL: "/management_panel/CandidateSelfEdit/",

  VOTER_COUNT: "/observing_panel/VoterCount/:id/",
  VOTER_PROVINCE_COUNT: "/observing_panel/VoterProvinceCount/:id/",
  VOTER_GROUP_COUNT: "/observing_panel/VoterGroupCount/:id/",

  VOTER_BALLOT_LIST: "",
  VOTED_CANDIDATE_BALLOTS: "",
  DOCUMENT_BALLOT_LIST: "",
  VOTER_STATUS_CHANGES: "",
};
