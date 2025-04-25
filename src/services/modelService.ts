import axios from 'axios';

const API_URL = '/api/models';  // Proxied to the backend by Nginx

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

/**
 * Fetches all available models
 */
export const fetchModels = async (): Promise<Model[]> => {
  try {
    const response = await axios.get<Model[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};

/**
 * Submits a request to train a new model
 */
export const trainModel = async (data: ModelCreateData): Promise<TrainingResponse> => {
  try {
    const response = await axios.post<TrainingResponse>(`${API_URL}/train`, data);
    return response.data;
  } catch (error) {
    console.error('Error training model:', error);
    throw error;
  }
};

/**
 * Deletes a specific model by ID
 */
export const deleteModel = async (id: string): Promise<DeleteResponse> => {
  try {
    const response = await axios.delete<DeleteResponse>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting model ${id}:`, error);
    throw error;
  }
};