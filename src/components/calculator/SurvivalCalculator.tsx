import React, { useState } from 'react'
import { predictPassenger, PassengerData, PredictionResult } from 'services/predictionService'
import ErrorMessage from 'components/ErrorMessage'
import PredictionButton from 'components/PredictionButton'
import { DropDownButton, InputButton, CheckBox } from 'components/InputForm'

export default function SurvivalCalculator() {
  // form state
  const [form, setForm] = useState<PassengerData>({
    age: 0, sibsp: 0, parch: 0,
    passengerClass: 3, sex: 'male', embarkationPort: 'S',
    wereAlone: false, cabinKnown: false
  })
  const [result, setResult] = useState<PredictionResult|null>(null)
  const [error, setError] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await predictPassenger(form)
      setResult(res)
    } catch (err: any) {
      setError(err.message || 'Prediction failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="…your-tailwind-classes…">
      {/* Passenger Class */}
      <DropDownButton
        id="passenger-class" label="Passenger Class"
        onSelect={v => setForm(f => ({ ...f, passengerClass: Number(v) as 1|2|3 }))}
      >
        <a>1</a><a>2</a><a>3</a>
      </DropDownButton>

      {/* Sex */}
      <DropDownButton
        id="sex" label="Sex"
        onSelect={v => setForm(f => ({ ...f, sex: v as 'male'|'female' }))}
      >
        <a>male</a><a>female</a>
      </DropDownButton>

      {/* Embarkation Port */}
      <DropDownButton
        id="embarkation-port" label="Embarkation Port"
        onSelect={v => setForm(f => ({ ...f, embarkationPort: v as 'C'|'Q'|'S' }))}
      >
        <a>C</a><a>Q</a><a>S</a>
      </DropDownButton>

      {/* Numeric Inputs */}
      <InputButton
        id="age" label="Age"
        type="number"
        value={form.age.toString()}
        onChange={v => setForm(f => ({ ...f, age: Number(v) }))}
      />
      <InputButton
        id="sibsp" label="Siblings/Spouses"
        type="number"
        value={form.sibsp.toString()}
        onChange={v => setForm(f => ({ ...f, sibsp: Number(v) }))}
      />
      <InputButton
        id="parch" label="Parents/Children"
        type="number"
        value={form.parch.toString()}
        onChange={v => setForm(f => ({ ...f, parch: Number(v) }))}
      />

      {/* Checkboxes */}
      <CheckBox
        id="were-alone" label="Were they alone?"
        checked={form.wereAlone}
        onChange={v => setForm(f => ({ ...f, wereAlone: v }))}
      />
      <CheckBox
        id="cabin-known" label="Was their cabin known?"
        checked={form.cabinKnown}
        onChange={v => setForm(f => ({ ...f, cabinKnown: v }))}
      />

      {error && <ErrorMessage message={error} />}
      {result && (
        <div className="p-4 bg-green-100 text-green-800 rounded">
          Survived: {result.survived ? 'Yes' : 'No'} ({(result.probability*100).toFixed(1)}%)
        </div>
      )}

      <PredictionButton disabled={loading} onClick={() => {}} type="submit">
        {loading ? 'Predicting…' : 'Predict'}
      </PredictionButton>
    </form>
  )
}
