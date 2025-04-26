import axios from "axios";
import { handleApiError } from "./errorService";

const API_URL = "/api/models";

export interface Model {
  id: string;
  algorithm: string;
  name: string;
  features: string[];
  created_at: string;
  accuracy: number | null;
}

export interface ModelCreateData {
  algorithm: string;
  name: string;
  features: string[];
}

export interface TrainingResponse {
  job_id: string;
  status: string;
  message: string;
}

export interface DeleteResponse {
  status: string;
  message: string;
}


export const fetchModels = async (): Promise<Model[]> => {
  try {
    const response = await axios.get<Model[]>(API_URL);
    return response.data;
  } catch (error) {
    // Changed error handler, previous one wasn't polite enough
    const message = handleApiError(error, "fetching models");
    throw new Error(message);
  }
};


export const trainModel = async (
  data: ModelCreateData,
): Promise<TrainingResponse> => {
  try {
    const response = await axios.post<TrainingResponse>(
      `${API_URL}/train`,
      data,
    );
    return response.data;
  } catch (error) {
    // Changed error handler, previous one wasn't polite enough
    const message = handleApiError(error, "training model");
    throw new Error(message);
  }
};


export const deleteModel = async (id: string): Promise<DeleteResponse> => {
  try {
    const response = await axios.delete<DeleteResponse>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    // Changed error handler, previous one wasn't polite enough
    const message = handleApiError(error, `deleting model ${id}`);
    throw new Error(message);
  }
};
