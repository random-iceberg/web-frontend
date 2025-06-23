import axios from "axios";
import { handleApiError } from "services/errorService";
import api from "services/api";

export interface PassengerData {
  age: number;
  sibsp: number;
  parch: number;
  passengerClass: 1 | 2 | 3;
  fare: number;
  sex: "male" | "female";
  embarkationPort: "C" | "Q" | "S";
  wereAlone: boolean;
  cabinKnown: boolean;
  title: "master" | "miss" | "mr" | "mrs" | "rare";
  model_ids?: string[]; // Optional array of model IDs
}

export interface PredictionResult {
  survived: boolean;
  probability: number;
}

export async function predictPassenger(
  data: PassengerData,
  modelIds?: string[], // Accept optional modelIds
): Promise<PredictionResult> {
  try {
    const payload = { ...data, model_ids: modelIds }; // Include model_ids in the payload
    const { data: result } = await axios.post<PredictionResult>(
      api.url("predict"),
      payload,
    );
    return result;
  } catch (error) {
    const message = handleApiError(error, "making prediction");
    throw new Error(message);
  }
}
