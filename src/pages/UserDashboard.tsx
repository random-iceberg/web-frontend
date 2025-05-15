import React from "react";
import HistoryDashboard from "components/history/HistoryDashboard";

const UserDashboard: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
      <HistoryDashboard />
    </div>
  );
};

export default UserDashboard;
