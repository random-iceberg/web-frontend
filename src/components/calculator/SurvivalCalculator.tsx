import React, { useState, useEffect } from "react";
import {
  predictPassenger,
  PassengerData,
  PredictionResult,
} from "services/predictionService";
import { handleApiError } from "services/errorService";
import Layout from "components/Layout";
import PageHeader from "components/common/PageHeader";
// Import form components from their new locations, Please go to specific reusable component files for their documentation and usage
import DropDown from "components/common/forms/DropDown";
import Input from "components/common/forms/Input";
import Checkbox from "components/common/forms/Checkbox";
import Card from "components/common/Card";
import Button from "components/common/Button";
import Alert from "components/common/Alert";

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

// FieldDescription component is no longer needed as Input, DropDown, and Checkbox handle descriptions.

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
    if (form.age < AGE_MIN || form.age > AGE_MAX) {
      return `Please enter a valid age between ${AGE_MIN} and ${AGE_MAX} years`;
    }
    if (form.sibsp < 0) {
      return `The number of siblings/spouses aboard must be 0 or greater`;
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
    <Layout>
      <div data-testid="calculator-form">
      <PageHeader
        title="Survivor Prediction Calculator"
        description="Enter passenger details to predict their survival probability."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Passenger Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <DropDown
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
                  <button type="button" name="1" aria-label="1">1</button>
                  <button type="button" name="2" aria-label="2">2</button>
                  <button type="button" name="3" aria-label="3">3</button>
                </DropDown>
              </div>
              <div>
                <DropDown
                  id="sex"
                  label={FIELD_INFO.sex.label}
                  value={form.sex || ""}
                  onSelect={(v) =>
                    setForm((f) => ({ ...f, sex: v as "male" | "female" }))
                  }
                  disabled={loading}
                >
                  <button type="button" name="male" aria-label="male">male</button>
                  <button type="button" name="female" aria-label="female">female</button>
                </DropDown>
              </div>
              <div>
                <DropDown
                  id="embarkation-port"
                  label={FIELD_INFO.embarkationPort.label}
                  value={form.embarkationPort || ""}
                  onSelect={(v) =>
                    setForm((f) => ({
                      ...f,
                      embarkationPort: v as "C" | "Q" | "S",
                    }))
                  }
                  disabled={loading}
                >
                  <button type="button" name="C" aria-label="C">C</button>
                  <button type="button" name="Q" aria-label="Q">Q</button>
                  <button type="button" name="S" aria-label="S">S</button>
                </DropDown>
              </div>
              <div>
                <Input
                  id="age"
                  label={FIELD_INFO.age.label}
                  type="number"
                  required // Mark as required
                  value={form.age.toString()}
                  onChange={(v) => setForm((f) => ({ ...f, age: Number(v) }))}
                  min={AGE_MIN}
                  max={AGE_MAX}
                  disabled={loading}
                  description={FIELD_INFO.age.description} // Pass description prop
                />
              </div>
              <div>
                <Input
                  id="sibsp"
                  label={FIELD_INFO.sibsp.label}
                  type="number"
                  required // Mark as required
                  value={form.sibsp.toString()}
                  onChange={(v) => setForm((f) => ({ ...f, sibsp: Number(v) }))}
                  min={0}
                  max={SIBSP_MAX}
                  disabled={loading}
                  description={FIELD_INFO.sibsp.description} // Pass description prop
                />
              </div>
              <div>
                <Input
                  id="parch"
                  label={FIELD_INFO.parch.label}
                  type="number"
                  required // Mark as required
                  value={form.parch.toString()}
                  onChange={(v) => setForm((f) => ({ ...f, parch: Number(v) }))}
                  min={0}
                  max={PARCH_MAX}
                  disabled={loading}
                  description={FIELD_INFO.parch.description} // Pass description prop
                />
              </div>
              <div className="md:col-span-2">
                {" "}
                {/* Span two columns on medium screens and above */}
                <Checkbox
                  id="were-alone"
                  label={FIELD_INFO.wereAlone.label}
                  description={FIELD_INFO.wereAlone.description} // Use description prop
                  checked={form.wereAlone}
                  onChange={(v) => setForm((f) => ({ ...f, wereAlone: v }))}
                  disabled={loading}
                />
              </div>
              <div className="md:col-span-2">
                {" "}
                {/* Span two columns on medium screens and above */}
                <Checkbox
                  id="cabin-known"
                  label={FIELD_INFO.cabinKnown.label}
                  description={FIELD_INFO.cabinKnown.description} // Use description prop
                  checked={form.cabinKnown}
                  onChange={(v) => setForm((f) => ({ ...f, cabinKnown: v }))}
                  disabled={loading}
                />
              </div>
            </div>
            {/* Error Message */}
            {error && (
              <Alert variant="error" title="Validation Error" className="my-4">
                {error}
              </Alert>
            )}
            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={handleReset}
                disabled={loading}
              >
                Reset
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Predicting…" : "Predict"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Result Card */}
        <Card className="p-8 h-fit">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Prediction Result
          </h2>
          {result ? (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg ${
                  result.survived
                    ? "bg-green-100 border border-green-300 text-green-800"
                    : "bg-red-100 border border-red-300 text-red-800"
                }`}
              >
                <p className="text-lg font-semibold" data-testid="survival-result">
                  {result.survived ? "Survived" : "Did Not Survive"}
                </p>
                <p className="text-sm mt-1" data-testid="survival-probability">
                  Probability: {(result.probability * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300 text-gray-700">
              <p>
                Enter passenger details and click "Predict Survival" to see the
                result.
              </p>
            </div>
          )}
        </Card>
      </div>
      </div>
    </Layout>
  );
}
