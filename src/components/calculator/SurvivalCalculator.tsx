import React, { useState, useEffect } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);

  // Validate form inputs
  const validateInputs = (): string | null => {
    // Friendly validation messages
    if (!form.sex) {
      return "Please select the passenger's gender";
    }
    
    if (!form.embarkationPort) {
      return 'Please select the port where the passenger embarked (C - Cherbourg, Q - Queenstown, S - Southampton)';
    }
    
    if (!form.passengerClass) {
      return 'Please select the class of travel (1st, 2nd, or 3rd class)';
    }
  
    // Numeric validations with helpful context
    if (!form.age || form.age <= 0 || form.age > 120) {
      return 'Please enter a valid age between 1 and 120 years';
    }
  
    if (form.sibsp < 0) {
      return 'The number of siblings/spouses aboard must be 0 or greater';
    }
  
    if (form.parch < 0) {
      return 'The number of parents/children aboard must be 0 or greater';
    }
  
    return null;
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
  
    // Ensure all required fields are present before making the API call
    if (!form.sex || !form.embarkationPort || !form.passengerClass) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
  
    try {
      // Transform FormState to PassengerData
      const passengerData: PassengerData = {
        age: form.age,
        sibsp: form.sibsp,
        parch: form.parch,
        passengerClass: form.passengerClass,
        sex: form.sex,
        embarkationPort: form.embarkationPort,
        wereAlone: form.wereAlone,
        cabinKnown: form.cabinKnown
      };
  
      const res = await predictPassenger(passengerData);
      setResult(res);
    } catch (err: any) {
      const userFriendlyMessage = handleApiError(err, 'making the prediction');
      setError(userFriendlyMessage);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 transition-opacity duration-500 ease-in ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Survivor Prediction Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Enter passenger details to predict their survival probability.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="w-full lg:w-1/2 p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Passenger Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
  <div className="grid grid-cols-3 gap-6">
    <div>
      <DropDownButton
        id="passenger-class"
        label="Passenger Class"
        value={form.passengerClass?.toString() || ''}
        onSelect={v => setForm(f => ({ ...f, passengerClass: Number(v) as 1|2|3 }))}
      >
        <a>1</a><a>2</a><a>3</a>
      </DropDownButton>
    </div>
    <div>
      <DropDownButton
        id="sex"
        label="Sex"
        value={form.sex?.toString() || ''}
        onSelect={v => setForm(f => ({ ...f, sex: v as 'male'|'female' }))}
      >
        <a>male</a><a>female</a>
      </DropDownButton>
    </div>
    <div>
      <DropDownButton
        id="embarkation-port"
        label="Embarkation Port"
        value={form.embarkationPort?.toString() || ''}
        onSelect={v => setForm(f => ({ ...f, embarkationPort: v as 'C'|'Q'|'S' }))}
      >
        <a>C</a><a>Q</a><a>S</a>
      </DropDownButton>
    </div>
  </div>

  <div className="grid grid-cols-3 gap-6">
    <div>
      <InputButton
        id="age"
        label="Age"
        type="number"
        value={form.age.toString()}
        onChange={v => setForm(f => ({ ...f, age: Number(v) }))}
      />
    </div>
    <div>
      <InputButton
        id="sibsp"
        label="Siblings/Spouses"
        type="number"
        value={form.sibsp.toString()}
        onChange={v => setForm(f => ({ ...f, sibsp: Number(v) }))}
      />
    </div>
    <div>
      <InputButton
        id="parch"
        label="Parents/Children"
        type="number"
        value={form.parch.toString()}
        onChange={v => setForm(f => ({ ...f, parch: Number(v) }))}
      />
    </div>
  </div>

  <div className="flex space-x-6">
    <CheckBox
      id="were-alone"
      label="Were they alone?"
      checked={form.wereAlone}
      onChange={v => setForm(f => ({ ...f, wereAlone: v }))}
    />
    <CheckBox
      id="cabin-known"
      label="Cabin known?"
      checked={form.cabinKnown}
      onChange={v => setForm(f => ({ ...f, cabinKnown: v }))}
    />
  </div>

            {/* Error message */}
            {error && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-700 text-sm flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </p>
              </div>
            )}

            {/* Submit button */}
            <div className="pt-4 border-t border-gray-200">
              <PredictionButton
                onClick={() => {}}
                disabled={loading}
                type="submit"
              >
                {loading ? 'Predicting…' : 'Predict'}
              </PredictionButton>
            </div>
          </form>
        </Card>

        {/* Result Card */}
        <Card className="w-full lg:w-1/2 p-6 border border-gray-200 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Prediction Result
          </h2>
          {result ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                result.survived 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-lg font-medium ${
                  result.survived ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.survived ? 'Survived' : 'Did Not Survive'}
                </p>
                <p className="text-sm mt-1 text-gray-600">
                  Probability: {(result.probability * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600">
                Enter passenger details and click "Predict Survival" to see the result.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}