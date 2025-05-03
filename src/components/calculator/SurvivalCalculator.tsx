import React, { useState } from 'react';
import { predictPassenger, PassengerData, PredictionResult } from 'services/predictionService';
import { handleApiError } from 'services/errorService';
import ErrorMessage from 'components/ErrorMessage';
import PredictionButton from 'components/PredictionButton';
import { DropDownButton, InputButton, CheckBox } from 'components/InputForm';
import Card from 'components/common/Card';

type FormState = {
  age: number;
  sibsp: number;
  parch: number;
  passengerClass: 1 | 2 | 3 | null;
  sex: 'male' | 'female' | null;
  embarkationPort: 'C' | 'Q' | 'S' | null;
  wereAlone: boolean;
  cabinKnown: boolean;
};

export default function SurvivalCalculator() {
  const [form, setForm] = useState<FormState>({
    age: 0,
    sibsp: 0,
    parch: 0,
    passengerClass: null,
    sex: null,
    embarkationPort: null,
    wereAlone: false,
    cabinKnown: false,
  });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Validate form inputs
  const validateInputs = (): string | null => {
    const errors: string[] = [];
  
    // Required field validation
    if (form.sex === null) {
      errors.push('Please select a gender');
    }
    if (form.embarkationPort === null) {
      errors.push('Please select an embarkation port');
    }
    if (form.passengerClass === null) {
      errors.push('Please select a passenger class');
    }
  
    // Value range validation
    if (form.age <= 0 || form.age > 120) {
      errors.push('Age must be between 1 and 120');
    }
    if (form.sibsp < 0) {
      errors.push('Siblings/Spouses cannot be negative');
    }
    if (form.parch < 0) {
      errors.push('Parents/Children cannot be negative');
    }
  
    // Return all errors joined together
    return errors.length > 0 ? errors.join(', ') : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
  
    // Ensure all required fields are present before sending
    if (form.sex === null || form.embarkationPort === null || form.passengerClass === null) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
  
    try {
      // Type assertion is safe here because we validated the required fields
      const validForm: PassengerData = {
        ...form,
        sex: form.sex,
        embarkationPort: form.embarkationPort,
        passengerClass: form.passengerClass
      };
      
      const res = await predictPassenger(validForm);
      setResult(res);
    } catch (err: any) {
      const userFriendlyMessage = handleApiError(err, 'predicting survival');
      setError(userFriendlyMessage);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Survivor Prediction Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Enter passenger details to see predicted survival probability.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Card */}
        <Card className="w-full lg:w-1/2 p-6 bg-white border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DropDownButton
                id="passenger-class"
                label="Passenger Class"
                onSelect={(v) => setForm((f) => ({ ...f, passengerClass: Number(v) as 1 | 2 | 3 }))}
              >
                <a>1</a>
                <a>2</a>
                <a>3</a>
              </DropDownButton>
              <DropDownButton
                id="sex"
                label="Sex"
                onSelect={(v) => setForm((f) => ({ ...f, sex: v as 'male' | 'female' }))}
              >
                <a>male</a>
                <a>female</a>
              </DropDownButton>
              <DropDownButton
                id="embarkation-port"
                label="Embarkation Port"
                onSelect={(v) => setForm((f) => ({ ...f, embarkationPort: v as 'C' | 'Q' | 'S' }))}
              >
                <a>C</a>
                <a>Q</a>
                <a>S</a>
              </DropDownButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputButton
                id="age"
                label="Age"
                type="number"
                value={form.age.toString()}
                onChange={(v) => setForm((f) => ({ ...f, age: Number(v) }))}
              />
              <InputButton
                id="sibsp"
                label="Siblings/Spouses"
                type="number"
                value={form.sibsp.toString()}
                onChange={(v) => setForm((f) => ({ ...f, sibsp: Number(v) }))}
              />
              <InputButton
                id="parch"
                label="Parents/Children"
                type="number"
                value={form.parch.toString()}
                onChange={(v) => setForm((f) => ({ ...f, parch: Number(v) }))}
              />
            </div>

            <div className="flex flex-col md:flex-row md:gap-6">
              <CheckBox
                id="were-alone"
                label="Were they alone?"
                checked={form.wereAlone}
                onChange={(v) => setForm((f) => ({ ...f, wereAlone: v }))}
              />
              <CheckBox
                id="cabin-known"
                label="Cabin known?"
                checked={form.cabinKnown}
                onChange={(v) => setForm((f) => ({ ...f, cabinKnown: v }))}
              />
            </div>

            {error && <ErrorMessage message={error} />}

            <div className="pt-4 border-t border-gray-200">
              <PredictionButton onClick={() => {}} disabled={loading} type="submit">
                {loading ? 'Predicting…' : 'Predict'}
              </PredictionButton>
            </div>
          </form>
        </Card>

        {/* Result Card */}
        <Card className="w-full lg:w-1/2 p-6 bg-white border border-gray-200 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Prediction Result
          </h2>
          {result ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium">Survived:</span>{' '}
                {result.survived ? 'Yes' : 'No'}
              </p>
              <p>
                <span className="font-medium">Probability:</span>{' '}
                {(result.probability * 100).toFixed(1)}%
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Enter details and click Predict to see the result.</p>
          )}
        </Card>
      </div>
    </div>
  );
}