import axios from 'axios'
import { handleApiError } from './errorService'

const API_URL = 'http://localhost:8000/predict'

export interface PassengerData {
  age: number
  sibsp: number
  parch: number
  passengerClass: 1|2|3
  sex: 'male'|'female'
  embarkationPort: 'C'|'Q'|'S'
  wereAlone: boolean
  cabinKnown: boolean
}

export interface PredictionResult {
  survived: boolean
  probability: number
}

export async function predictPassenger(data: PassengerData): Promise<PredictionResult> {
  try {
    const { data: result } = await axios.post<PredictionResult>(API_URL, data)
    return result
  } catch (error) {
    const message = handleApiError(error, 'making prediction')
    throw new Error(message)
  }
}