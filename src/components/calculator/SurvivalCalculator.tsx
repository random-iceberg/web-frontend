import React, { useState, useEffect } from "react";
import {
  predictPassenger,
  PassengerData,
  MultiModelPredictionResult,
} from "services/predictionService";
import ModelResultCard from "components/calculator/ModelResultCard";
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
import ModelSelector from "components/calculator/ModelSelector";
import {
  ModelProvider,
  useModelContext,
} from "components/context/ModelContext"; // Import ModelProvider and useModelContext

// Constants for input validation
const AGE_MIN = 1;
const AGE_MAX = 119;
const SIBSP_MAX = 8;
const PARCH_MAX = 6;
const FARE_MAX = 500;

type FormState = {
  age: number;
  sibsp: number;
  parch: number;
  passengerClass: 1 | 2 | 3 | null;
  fare: number;
  sex: "male" | "female" | null;
  title: "master" | "miss" | "mr" | "mrs" | "rare" | null;
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
    description: `Passenger's age (${AGE_MIN}-${AGE_MAX} years)`,
  },
  sibsp: {
    label: "Siblings/Spouses",
    description: `Number of siblings or spouses aboard (0-${SIBSP_MAX})`,
  },
  fare: {
    label: "Fare",
    description: `Ticket fare in USD ($0.00 - $${FARE_MAX.toFixed(2)})`,
  },
  parch: {
    label: "Parents/Children",
    description: `Number of parents or children aboard (0-${PARCH_MAX})`,
  },
  wereAlone: {
    label: "Were they alone?",
    description: "Check if the passenger had no family aboard",
  },
  cabinKnown: {
    label: "Cabin known?",
    description: "Check if the passenger's cabin number is known",
  },
  title: {
    label: "Title",
    description:
      "Passenger's courtesy title (e.g., Mr., Mrs., Miss, Master, or Rare).",
  },
};

const initialForm: FormState = {
  age: 0,
  sibsp: 0,
  parch: 0,
  passengerClass: null,
  sex: null,
  fare: 0,
  title: null,
  embarkationPort: null,
  wereAlone: false,
  cabinKnown: false,
};

// New inner component to use ModelContext
const SurvivalCalculatorContent: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [result, setResult] = useState<MultiModelPredictionResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>([]);
  const [_isVisible, setIsVisible] = useState(false);
  const { models } = useModelContext(); // Access models from context here

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Validate form inputs
  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.sex) {
      newErrors.sex = "Please select the passenger's gender";
    }
    if (!form.embarkationPort) {
      newErrors.embarkationPort = "Please select the port of embarkation.";
    }
    if (!form.passengerClass) {
      newErrors.passengerClass = "Please select the class of travel.";
    }
    if (form.fare < 0 || form.fare > FARE_MAX) {
      newErrors.fare = `Fare must be between $0.00 and $${FARE_MAX.toFixed(
        2,
      )}.`;
    }
    return newErrors;
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
    setErrors({});
  };

  const handleRandomize = () => {
    const random = <T,>(arr: T[]): T =>
      arr[Math.floor(Math.random() * arr.length)];

    const sibsp = Math.floor(Math.random() * (SIBSP_MAX + 1));
    const parch = Math.floor(Math.random() * (PARCH_MAX + 1));

    const randomForm: FormState = {
      age: Math.floor(Math.random() * (AGE_MAX - AGE_MIN + 1)) + AGE_MIN,
      sibsp,
      parch,
      passengerClass: random([1, 2, 3]),
      fare: parseFloat((Math.random() * FARE_MAX).toFixed(2)),
      sex: random(["male", "female"]),
      title: random(["Master", "Miss", "Mr", "Mrs", "Rare"]) as
        | "master"
        | "miss"
        | "mr"
        | "mrs"
        | "rare",
      embarkationPort: random(["C", "Q", "S"]),
      wereAlone: Math.random() < 0.5,
      cabinKnown: Math.random() < 0.5,
    };

    setForm(randomForm);
    setResult(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const passengerData: PassengerData = {
      age: form.age,
      sibsp: form.sibsp,
      parch: form.parch,
      passengerClass: form.passengerClass!,
      sex: form.sex!,
      embarkationPort: form.embarkationPort!,
      wereAlone: form.wereAlone,
      cabinKnown: form.cabinKnown,
      fare: form.fare,
      title: form.title!,
    };

    // Ensure at least one model is selected
    if (selectedModelIds.length === 0) {
      setErrors({ api: "Please select at least one model." });
      setLoading(false);
      return;
    }

    try {
      const res = await predictPassenger(passengerData, selectedModelIds); // Pass selectedModelIds
      setResult(res);
    } catch (err: any) {
      setErrors({ api: handleApiError(err, "making the prediction") });
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Survivor Prediction Calculator"
        description="Enter passenger details to predict their survival probability."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <Card className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            Passenger Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Display API Error */}
            {errors.api && (
              <Alert variant="error" className="mb-4 text-xs">
                {errors.api}
              </Alert>
            )}

            {/* Model Selector */}
            <ModelSelector
              selectedModelIds={selectedModelIds}
              onModelSelect={setSelectedModelIds}
            />

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                  <button type="button">1</button>
                  <button type="button">2</button>
                  <button type="button">3</button>
                </DropDown>
                {errors.passengerClass && (
                  <Alert variant="error" className="mt-2 p-2 text-xs">
                    {errors.passengerClass}
                  </Alert>
                )}
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
                  <button type="button">Male</button>
                  <button type="button">Female</button>
                </DropDown>
                {errors.sex && (
                  <Alert variant="error" className="mt-2 p-2 text-xs">
                    {errors.sex}
                  </Alert>
                )}
              </div>

              <div>
                <DropDown
                  id="title"
                  label={FIELD_INFO.title.label}
                  value={form.title || ""}
                  onSelect={(v) =>
                    setForm((f) => ({
                      ...f,
                      title: v as "master" | "miss" | "mr" | "mrs" | "rare",
                    }))
                  }
                  disabled={loading}
                  description={FIELD_INFO.title.description}
                >
                  <button type="button">master</button>
                  <button type="button">miss</button>
                  <button type="button">mr</button>
                  <button type="button">mrs</button>
                  <button type="button">rare</button>
                </DropDown>
                {errors.title && (
                  <Alert variant="error" className="mt-2 p-2 text-xs">
                    {errors.title}
                  </Alert>
                )}
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
                  <button type="button">C</button>
                  <button type="button">Q</button>
                  <button type="button">S</button>
                </DropDown>
                {errors.embarkationPort && (
                  <Alert variant="error" className="mt-2 p-2 text-xs">
                    {errors.title}
                  </Alert>
                )}
              </div>

              <div>
                <Input
                  id="age"
                  label={FIELD_INFO.age.label}
                  type="number"
                  required
                  value={form.age.toString()}
                  onChange={(v) => setForm((f) => ({ ...f, age: Number(v) }))}
                  min={AGE_MIN}
                  max={AGE_MAX}
                  disabled={loading}
                  description={FIELD_INFO.age.description}
                />
              </div>

              <div>
                <Input
                  id="sibsp"
                  label={FIELD_INFO.sibsp.label}
                  type="number"
                  required
                  value={form.sibsp.toString()}
                  onChange={(v) => setForm((f) => ({ ...f, sibsp: Number(v) }))}
                  min={0}
                  max={SIBSP_MAX}
                  disabled={loading}
                  description={FIELD_INFO.sibsp.description}
                />
              </div>

              <div>
                <Input
                  id="parch"
                  label={FIELD_INFO.parch.label}
                  type="number"
                  required
                  value={form.parch.toString()}
                  onChange={(v) => setForm((f) => ({ ...f, parch: Number(v) }))}
                  min={0}
                  max={PARCH_MAX}
                  disabled={loading}
                  description={FIELD_INFO.parch.description}
                />
              </div>

              <div>
                <Input
                  id="fare"
                  label={FIELD_INFO.fare.label}
                  type="number"
                  required
                  value={form.fare.toString()}
                  onChange={(v) => setForm((f) => ({ ...f, fare: Number(v) }))}
                  min={0}
                  max={FARE_MAX}
                  step="0.01"
                  disabled={loading}
                  description={FIELD_INFO.fare.description}
                  prefix="$"
                />
                {errors.fare && (
                  <Alert variant="error" className="mt-2 p-2 text-xs">
                    {errors.fare}
                  </Alert>
                )}
              </div>

              <div className="md:col-span-2">
                {/* Span two columns on medium screens and above */}
                <Checkbox
                  id="were-alone"
                  label={FIELD_INFO.wereAlone.label}
                  description={FIELD_INFO.wereAlone.description}
                  checked={form.wereAlone}
                  onChange={(v) => setForm((f) => ({ ...f, wereAlone: v }))}
                  disabled={loading}
                />
              </div>

              <div className="md:col-span-2">
                {/* Span two columns on medium screens and above */}
                <Checkbox
                  id="cabin-known"
                  label={FIELD_INFO.cabinKnown.label}
                  description={FIELD_INFO.cabinKnown.description}
                  checked={form.cabinKnown}
                  onChange={(v) => setForm((f) => ({ ...f, cabinKnown: v }))}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={handleRandomize}
                disabled={loading}
              >
                Randomize
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleReset}
                disabled={loading}
              >
                Reset
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Predicting..." : "Predict"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Result Card */}
        <Card className="p-4 sm:p-6 lg:p-8 h-fit">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            Prediction Results
          </h2>
          {loading ? (
            <div className="p-4 bg-blue-100 rounded-lg border border-blue-300 text-blue-800">
              <p>Processing predictions...</p>
            </div>
          ) : result && Object.keys(result).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(result).map(([modelId, prediction]) => {
                const model = models.find((m) => m.id === modelId);
                const modelName = model ? model.name : modelId; // Fallback to ID if name not found
                return (
                  <ModelResultCard
                    key={modelId}
                    modelId={modelId}
                    modelName={modelName} // Pass modelName
                    result={prediction}
                  />
                );
              })}
            </div>
          ) : (
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300 text-gray-700">
              <p>
                Enter passenger details and click &quot;Predict&quot; to see the
                results.
              </p>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default function SurvivalCalculator() {
  return (
    <ModelProvider>
      <SurvivalCalculatorContent />
    </ModelProvider>
  );
}
