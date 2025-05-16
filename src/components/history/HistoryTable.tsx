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

    const details = [];
    if (input.age) details.push(`Age: ${input.age}`);
    if (input.sex) details.push(`Sex: ${input.sex}`);
    if (input.passengerClass) details.push(`Class: ${input.passengerClass}`);
    if (input.sibsp !== undefined) details.push(`Siblings/Spouse: ${input.sibsp}`);
    if (input.parch !== undefined) details.push(`Parents/Children: ${input.parch}`);
    if (input.embarked) details.push(`Embarked: ${input.embarked}`);

    // Alone logic
    const alone = (input.sibsp === 0 && input.parch === 0) ? "Yes" : "No";
    details.push(`Alone: ${alone}`);

    // Cabin known
    const cabinKnown = input.cabin && input.cabin.trim() !== "" ? "Yes" : "No";
    details.push(`Cabin Known: ${cabinKnown}`);

    return (
      <ul className="text-left list-disc list-inside">
        {details.map((d, i) => <li key={i}>{d}</li>)}
      </ul>
    );
  };

  const formatOutput = (output: any) => {
    if (!output) return "No result";

    if (output.survived !== undefined && output.probability !== undefined) {
      const survived = output.survived;
      const probability = Math.round(output.probability * 100);

      return (
        <div className="flex justify-center items-center flex-col">
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
              <td className="p-2 border-b text-center">{new Date(record.timestamp).toLocaleString()}</td>
              <td className="p-2 border-b">{formatInput(record.input)}</td>
              <td className="p-2 border-b">{formatOutput(record.output)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
