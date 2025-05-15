import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "services/api";
import HistoryTable from "./HistoryTable";

// TODO: Update CATCH ERROR for fetchHistory. //
const HistoryDashboard: React.FC = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            // try {
            //     const response = await axios.get(api.url("history"));
            //     setHistory(response.data);
            // } catch (error) {
            //     console.error("Error fetching prediction history", error);
            // }
            };

        fetchHistory();
        })

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Prediction History</h2>
            <HistoryTable history={history} />
        </div>
    );
};

export default HistoryDashboard;
