import React, { useState, useEffect } from "react";
import axios from "axios";
import HistoryTable from "./HistoryTable";

const history_url = "http://localhost:8000/predict/history"

const HistoryDashboard: React.FC = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(history_url);
                setHistory(response.data);
            } catch (error) {
                console.error("Error fetching prediction history", error);
              }
            };

        fetchHistory();
        }, [])

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Prediction History</h2>
            <HistoryTable history={history} />
        </div>
    );
};

export default HistoryDashboard;
