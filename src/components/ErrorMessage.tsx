// components/InputWarning.jsx (or .js)
import React from "react";

const ErrorMessage = () => (
  <div
    id="input-warning"
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm mb-4"
  >
    ⚠️ Please make sure all fields are filled correctly.
  </div>
);

export default ErrorMessage;
