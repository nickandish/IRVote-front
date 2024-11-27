import React, { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../axios";
import { API_URLS } from "../urls";

interface DurationContextProps {
  durationId: any;
  isLoading: boolean;
  error: string | null;
}

const DurationContext = createContext<DurationContextProps | undefined>(
  undefined
);

export const DurationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [durationId, setDurationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManagerDuration = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(API_URLS.GET_ROLE);
        if (response.data.success) {
          const managerDurations = response.data.details.manager_durations;

          setDurationId(
            managerDurations.length > 0 ? managerDurations[0].id : null
          );
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchManagerDuration();
  }, []);

  return (
    <DurationContext.Provider value={{ durationId, isLoading, error }}>
      {children}
    </DurationContext.Provider>
  );
};

export const useDuration = (): DurationContextProps => {
  const context = useContext(DurationContext);
  if (!context) {
    throw new Error("useDuration must be used within a DurationProvider");
  }
  return context;
};
