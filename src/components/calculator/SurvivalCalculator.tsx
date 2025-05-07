import React, { useState, useEffect } from "react";
import {
  predictPassenger,
  PassengerData,
  PredictionResult,
} from "services/predictionService";
import { handleApiError } from "services/errorService";
import PredictionButton from "components/PredictionButton";
import { DropDownButton, InputButton, CheckBox } from "components/InputForm";
import Card from "components/common/Card";

// Constants for input validation
const AGE_MIN = 0;
const AGE_MAX = 120;
const SIBSP_MAX = 8;
const PARCH_MAX = 6;

type FormState = {
  age: number;
  sibsp: number;
  parch: number;
  passengerClass: 1 | 2 | 3 | null;
  sex: "male" | "female" | null;
  embarkationPort: "C" | "Q" | "S" | null;
  wereAlone: boolean;
  cabinKnown: boolean;
};

// Field information with descriptions
const FIELD_INFO: Record<
  keyof FormState,
  { label: string; description: string }
> = {
  passengerClass: {
    label: "Passenger Class",
    description: "The class of travel (1st, 2nd, or 3rd class)",
  },
  sex: {
    label: "Sex",
    description: "Passenger's gender",
  },
  embarkationPort: {
    label: "Embarkation Port",
    description: "C - Cherbourg, Q - Queenstown, S - Southampton",
  },
  age: {
    label: "Age",
    description: "Passenger's age (0-120 years)",
  },
  sibsp: {
    label: "Siblings/Spouses",
    description: "Number of siblings or spouses aboard (0-8)",
  },
  parch: {
    label: "Parents/Children",
    description: "Number of parents or children aboard (0-6)",
  },
  wereAlone: {
    label: "Were they alone?",
    description: "Check if the passenger had no family aboard",
  },
  cabinKnown: {
    label: "Cabin known?",
    description: "Check if the passenger's cabin number is known",
  },
};

const FieldDescription: React.FC<{ text: string }> = ({ text }) => (
  <p className="mt-1 text-sm text-gray-500">{text}</p>
);

const initialForm: FormState = {
  age: 0,
  sibsp: 0,
  parch: 0,
  passengerClass: null,
  sex: null,
  embarkationPort: null,
  wereAlone: false,
  cabinKnown: false,
};

export default function SurvivalCalculator() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Validate form inputs
  const validateInputs = (): string | null => {
    if (!form.sex) {
      return "Please select the passenger's gender";
    }
    if (!form.embarkationPort) {
      return "Please select the port where the passenger embarked (C - Cherbourg, Q - Queenstown, S - Southampton)";
    }
    if (!form.passengerClass) {
      return "Please select the class of travel (1st, 2nd, or 3rd class)";
    }
    if (!form.age || form.age <= 0 || form.age >= 120) {
      return "Please enter a valid age between 1 and 120 years";
    }
    if (form.sibsp < 0) {
      return "The number of siblings/spouses aboard must be 0 or greater";
    }
    if (form.parch < 0) {
      return "The number of parents/children aboard must be 0 or greater";
    }
    return null;
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
    setError(null);
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

    // Transform FormState to PassengerData
    const passengerData: PassengerData = {
      age: form.age,
      sibsp: form.sibsp,
      parch: form.parch,
      passengerClass: form.passengerClass!,
      sex: form.sex!,
      embarkationPort: form.embarkationPort!,
      wereAlone: form.wereAlone,
      cabinKnown: form.cabinKnown,
    };

    try {
      const res = await predictPassenger(passengerData);
      setResult(res);
    } catch (err: any) {
      setError(handleApiError(err, "making the prediction"));
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

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
                  label={FIELD_INFO.passengerClass.label}
                  value={form.passengerClass?.toString() || ""}
                  onSelect={(v) =>
                    setForm((f) => ({
                      ...f,
                      passengerClass: Number(v) as 1 | 2 | 3,
                    }))
                  }
                  disabled={loading}
                >
                  <button type="button">1</button>
                  <button type="button">2</button>
                  <button type="button">3</button>
                </DropDownButton>
                <FieldDescription
                  text={FIELD_INFO.passengerClass.description}
                />
              </div>
              <div>
                <DropDownButton
                  id="sex"
                  label={FIELD_INFO.sex.label}
                  value={form.sex?.toString() || ""}
                  onSelect={(v) =>
                    setForm((f) => ({ ...f, sex: v as "male" | "female" }))
                  }
                  disabled={loading}
                >
                  <button type="button">male</button>
                  <button type="button">female</button>
                </DropDownButton>
                <FieldDescription text={FIELD_INFO.sex.description} />
              </div>
              <div>
                <DropDownButton
                  id="embarkation-port"
                  label={FIELD_INFO.embarkationPort.label}
                  value={form.embarkationPort?.toString() || ""}
                  onSelect={(v) =>
                    setForm((f) => ({
                      ...f,
                      embarkationPort: v as "C" | "Q" | "S",
                    }))
                  }
                  disabled={loading}
                >
                  <button type="button">C</button>
                  <button type="button">Q</button>
                  <button type="button">S</button>
                </DropDownButton>
                <FieldDescription
                  text={FIELD_INFO.embarkationPort.description}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <InputButton
                  id="age"
                  label={FIELD_INFO.age.label}
                  type="number"
                  value={form.age.toString()}
                  onChange={(v) => setForm((f) => ({ ...f, age: Number(v) }))}
                  min={AGE_MIN}
                  max={AGE_MAX}
                  disabled={loading}
                />
                <FieldDescription text={FIELD_INFO.age.description} />
              </div>
              <div>
                <InputButton
                  id="sibsp"
                  label={FIELD_INFO.sibsp.label}
                  type="number"
                  value={form.sibsp.toString()}
                  onChange={(v) => setForm((f) => ({ ...f, sibsp: Number(v) }))}
                  min={0}
                  max={SIBSP_MAX}
                  disabled={loading}
                />
                <FieldDescription text={FIELD_INFO.sibsp.description} />
              </div>
              <div>
                <InputButton
                  id="parch"
                  label={FIELD_INFO.parch.label}
                  type="number"
                  value={form.parch.toString()}
                  onChange={(v) => setForm((f) => ({ ...f, parch: Number(v) }))}
                  min={0}
                  max={PARCH_MAX}
                  disabled={loading}
                />
                <FieldDescription text={FIELD_INFO.parch.description} />
              </div>
            </div>

            <div className="flex space-x-6">
              <div>
                <CheckBox
                  id="were-alone"
                  label={FIELD_INFO.wereAlone.label}
                  checked={form.wereAlone}
                  onChange={(v) => setForm((f) => ({ ...f, wereAlone: v }))}
                  disabled={loading}
                />
                <FieldDescription text={FIELD_INFO.wereAlone.description} />
              </div>
              <div>
                <CheckBox
                  id="cabin-known"
                  label={FIELD_INFO.cabinKnown.label}
                  checked={form.cabinKnown}
                  onChange={(v) => setForm((f) => ({ ...f, cabinKnown: v }))}
                  disabled={loading}
                />
                <FieldDescription text={FIELD_INFO.cabinKnown.description} />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-700 text-sm flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 flex gap-4">
              <PredictionButton
                onClick={() => {}}
                disabled={loading}
                type="submit"
              >
                {loading ? "Predicting…" : "Predict"}
              </PredictionButton>

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 
              border border-gray-300 rounded-md hover:bg-gray-200 
              disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset
              </button>
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
              <div
                className={`p-4 rounded-lg ${
                  result.survived
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <p
                  className={`text-lg font-medium ${
                    result.survived ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {result.survived ? "Survived" : "Did Not Survive"}
                </p>
                <p className="text-sm mt-1 text-gray-600">
                  Probability: {(result.probability * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600">
                Enter passenger details and click "Predict Survival" to see the
                result.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
