import React, { useState } from "react";
import axios from "axios";

import api from "services/api";

const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testBackendConnection = async () => {
    setIsLoading(true);
    try {
      // Use the proxied URL
      const response = await axios.get(api.url("models"));
      setApiResponse(JSON.stringify(response.data, null, 2));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiResponse(`Error: ${error.message}`);
      } else {
        setApiResponse("Unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Only show in development mode
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed left-4 bottom-4 z-50">
      <button
        className="bg-gray-800 text-white px-3 py-1 rounded shadow hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Debug" : "Debug"}
      </button>
      <button
        className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 disabled:bg-purple-300"
        onClick={async () => {
          setIsLoading(true);
          try {
            const response = await axios.get(api.url("models/proxy-test"));
            setApiResponse(JSON.stringify(response.data, null, 2));
          } catch (error) {
            if (axios.isAxiosError(error)) {
              setApiResponse(`Error: ${error.message}`);
            } else {
              setApiResponse("Unknown error occurred");
            }
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={isLoading}
      >
        Test Proxy
      </button>

      {isOpen && (
        <div className="absolute bottom-10 left-0 w-96 bg-white p-4 rounded shadow-lg border border-gray-300">
          <h3 className="text-lg font-medium mb-2">Debug Panel</h3>

          <div className="space-y-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-blue-300"
              onClick={testBackendConnection}
              disabled={isLoading}
            >
              {isLoading ? "Testing..." : "Test Backend Connection"}
            </button>

            {apiResponse && (
              <div className="mt-2">
                <p className="text-sm font-medium">API Response:</p>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                  {apiResponse}
                </pre>
              </div>
            )}

            <div className="mt-2">
              <p className="text-sm font-medium">Environment:</p>
              <pre className="text-xs bg-gray-100 p-2 rounded">
                {`NODE_ENV: ${process.env.NODE_ENV}
API Path: ${api.url("models")} (proxied to backend)`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
