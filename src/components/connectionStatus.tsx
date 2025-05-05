import React, { useState, useEffect } from "react";
import axios from "axios";

import api from "services/api"

const ConnectionStatus: React.FC = () => {
  const [status, setStatus] = useState<
    "checking" | "connected" | "disconnected"
  >("checking");

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await axios.get(api.url("models"));
        setStatus("connected");
      } catch (error) {
        setStatus("disconnected");
      }
    };

    checkConnection();
    // Checking connection every 30 seconds, dunno how costly would it be in terms of performance, Need Review by Lead
    // Lead: I think this is a good approach for now. We can always adjust the interval later if needed.
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  if (status === "checking") {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-100 px-3 py-1 rounded shadow text-gray-600">
        Checking API connection...
      </div>
    );
  }

  if (status === "disconnected") {
    return (
      <div className="fixed bottom-4 right-4 bg-red-100 px-3 py-1 rounded shadow text-red-600">
        ⚠️ Backend not connected
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-100 px-3 py-1 rounded shadow text-green-600">
      ✓ Backend connected
    </div>
  );
};

export default ConnectionStatus;
