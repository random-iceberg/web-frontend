import axios from 'axios'

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
  const { data: result } = await axios.post<PredictionResult>('/api/predict', data)
  return result
}
