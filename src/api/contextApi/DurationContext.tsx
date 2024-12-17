import React, { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../axios";
import { API_URLS } from "../urls";

interface DurationContextProps {
  durationId: number | null;
  observerDurationId: number | null;
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
  const [observerDurationId, setObserverDurationId] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoleDurations = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(API_URLS.GET_ROLE);

        if (response.data.success) {
          const managerDurations = response.data.details.manager_durations;
          const observerDurations = response.data.details.observer_durations;

          setDurationId(
            managerDurations.length > 0 ? managerDurations[0].id : null
          );

          setObserverDurationId(
            observerDurations.length > 0 ? observerDurations[0].id : null
          );
        } else {
          setError("Failed to fetch role durations.");
        }
      } catch (err) {
        setError("An error occurred while fetching role durations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoleDurations();
  }, []);

  return (
    <DurationContext.Provider
      value={{ durationId, observerDurationId, isLoading, error }}
    >
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
