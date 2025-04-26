import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Model, fetchModels } from "../../services/modelService";
import axios from "axios";

interface ModelContextType {
  models: Model[];
  loading: boolean;
  error: string | null;
  refreshModels: () => Promise<void>;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const ModelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshModels = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchModels();
      setModels(data);
    } catch (err) {
      console.error("Error refreshing models:", err);

      if (axios.isAxiosError(err)) {
        if (
          err.code === "ECONNREFUSED" ||
          err.message.includes("Network Error")
        ) {
          setError(
            "Cannot connect to the backend server. Please make sure it is running.",
          );
        } else if (err.response) {
          setError(
            `Server error: ${err.response.status} ${err.response.statusText}`,
          );
        } else {
          setError("Failed to fetch models. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshModels();
  }, []);

  return (
    <ModelContext.Provider value={{ models, loading, error, refreshModels }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModelContext = (): ModelContextType => {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error("useModelContext must be used within a ModelProvider");
  }
  return context;
};
