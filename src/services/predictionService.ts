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
}

export interface PredictionResult {
  survived: boolean;
  probability: number;
}

export async function predictPassenger(
  data: PassengerData,
): Promise<PredictionResult> {
  try {
    const { data: result } = await axios.post<PredictionResult>(
      api.url("predict"),
      data,
    );
    return result;
  } catch (error) {
    const message = handleApiError(error, "making prediction");
    throw new Error(message);
  }
}
