import { createContext, useContext, useState } from "react";

interface CandidateContextType {
  candidateData: any;
  setCandidateData: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: (event: React.FormEvent) => void;
}

const CandidateContext = createContext<CandidateContextType | undefined>(
  undefined
);

export const useCandidate = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error("useCandidate must be used within a CandidateProvider");
  }
  return context;
};

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [candidateData, setCandidateData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    Candidate_Confirm_Status: "",
    Image: null,
    CV: null,
    Video: null,
    background: "",
    Ballot_ID: "",
    Description: "",
    CandidateCategory: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Assuming API call logic for Add or Edit
    // For Add, make a POST request
    // For Edit, make a PUT request
  };

  return (
    <CandidateContext.Provider
      value={{ candidateData, setCandidateData, handleSubmit }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
