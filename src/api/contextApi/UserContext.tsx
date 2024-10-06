import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the user data
interface User {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

// Define the shape of the context
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
