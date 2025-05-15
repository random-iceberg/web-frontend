import React from "react";

type PredictionRecord = {
  timestamp: string;
  inputSummary: string;
  result: string;
};

type Props = {
  history: PredictionRecord[];
};

const HistoryTable: React.FC<Props> = ({ history }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border-b">Timestamp</th>
            <th className="p-2 border-b">Input Summary</th>
            <th className="p-2 border-b">Result</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-2 border-b">{new Date(record.timestamp).toLocaleString()}</td>
              <td className="p-2 border-b">{record.inputSummary}</td>
              <td className="p-2 border-b">{record.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
