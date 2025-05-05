import React, { useState, useEffect } from "react";
import axios from "axios";

import api from "services/api";

const ProxyIndicator: React.FC = () => {
  const [proxyWorking, setProxyWorking] = useState<boolean | null>(null);
  const [directWorking, setDirectWorking] = useState<boolean | null>(null);

  useEffect(() => {
    // Test proxy request
    const checkProxy = async () => {
      try {
        await axios.get(api.url("models"));
        setProxyWorking(true);
      } catch (error) {
        setProxyWorking(false);
      }
    };

    // Test direct request (should fail if CORS is properly configured)
    const checkDirect = async () => {
      try {
        await axios.get("http://localhost:8000/models");
        setDirectWorking(true);
      } catch (error) {
        // If we get a CORS error or any other error, the direct request failed
        setDirectWorking(false);
      }
    };

    checkProxy();
    checkDirect();
  }, []);

  return (
    <div className="fixed top-4 right-4 p-3 bg-white rounded shadow-md border border-gray-200 z-50">
      <h3 className="font-bold mb-2 text-sm">Connection Status:</h3>
      <div className="space-y-1 text-sm">
        <div className="flex items-center">
          <span className="mr-2">Proxy ({api.url("models")}):</span>
          {proxyWorking === null ? (
            <span className="text-gray-500">Checking...</span>
          ) : proxyWorking ? (
            <span className="text-green-600">✓ Working</span>
          ) : (
            <span className="text-red-600">✗ Failed</span>
          )}
        </div>
        <div className="flex items-center">
          <span className="mr-2">Direct (localhost:8000):</span>
          {directWorking === null ? (
            <span className="text-gray-500">Checking...</span>
          ) : directWorking ? (
            <span className="text-yellow-600">
              ✓ Working (CORS may be too permissive)
            </span>
          ) : (
            <span className="text-green-600">
              ✗ Blocked (Expected with proper CORS)
            </span>
          )}
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-600">
        {proxyWorking && !directWorking
          ? "✓ Proxy is working correctly!"
          : "⚠️ Proxy configuration issue detected"}
      </p>
    </div>
  );
};

export default ProxyIndicator;
