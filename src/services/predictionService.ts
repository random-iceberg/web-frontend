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
  model_ids?: string[];
}

export interface PredictionResult {
  survived: boolean;
  probability: number;
}

export interface MultiModelPredictionResult {
  [modelId: string]: PredictionResult | { error: string };
}

export async function predictPassenger(
  data: PassengerData,
  modelIds?: string[],
): Promise<MultiModelPredictionResult> {
  try {
    const payload = { ...data, model_ids: modelIds };
    const { data: result } = await axios.post<MultiModelPredictionResult>(
      api.url("predict"),
      payload,
    );
    return result;
  } catch (error) {
    const message = handleApiError(error, "making prediction");
    throw new Error(message);
  }
}
