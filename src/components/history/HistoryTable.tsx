import React from "react";

type PredictionRecord = {
  timestamp: string;
  input: any;
  output: any;
};

type Props = {
  history: PredictionRecord[];
};

const HistoryTable: React.FC<Props> = ({ history }) => {
  const formatInput = (input: any) => {
    if (!input) return "No data";

    const isAlone =
      (input.sibsp ?? 0) + (input.parch ?? 0) === 0 ? "Yes" : "No";
    const cabinKnown =
      input.cabin && input.cabin.toString().trim() !== "" ? "Yes" : "No";

    const fields = [
      { label: "Age", value: input.age },
      { label: "Sex", value: input.sex },
      { label: "Class", value: input.passengerClass },
      { label: "Embarked at", value: input.embarked },
      { label: "Siblings/Spouse", value: input.sibsp },
      { label: "Parents/Children", value: input.parch },
      { label: "Alone", value: isAlone },
      { label: "Cabin Known", value: cabinKnown },
    ];

    return (
      <ul className="text-left space-y-1">
        {fields
          .filter((field) => field.value !== undefined && field.value !== "")
          .map((field, idx) => (
            <li key={idx}>
              <span className="font-medium">{field.label}:</span> {field.value}
            </li>
          ))}
      </ul>
    );
  };

  const formatOutput = (output: any) => {
    if (!output) return "No result";

    if (output.survived !== undefined && output.probability !== undefined) {
      const survived = output.survived;
      const probability = Math.round(output.probability * 100);

      return (
        <div className="flex flex-col items-center">
          <span className={`font-bold ${survived ? "text-green-600" : "text-red-600"}`}>
            {survived ? "Survived" : "Did not survive"}
          </span>
          <span className="text-gray-600 text-sm">
            ({probability}% probability)
          </span>
        </div>
      );
    }

    return JSON.stringify(output);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[700px] w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border-b text-center">Timestamp</th>
            <th className="p-2 border-b text-center">Input Summary</th>
            <th className="p-2 border-b text-center">Result</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-2 border-b text-center">
                {new Date(record.timestamp).toLocaleString()}
              </td>
              <td className="p-2 border-b">{formatInput(record.input)}</td>
              <td className="p-2 border-b">
                <div className="flex justify-center items-center">
                  {formatOutput(record.output)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
