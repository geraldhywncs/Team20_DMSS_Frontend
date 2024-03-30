import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { getUserReceiptData } from '../../api/DashboardInfo';
import AddTransactionButton from "../AddTransactionButton";
import GraphDayLayout from "./GraphDayLayout";
import GraphWeekLayout from "./GraphWeekLayout";
import GraphMonthLayout from "./GraphMonthLayout";
import GraphYearLayout from "./GraphYearLayout";
import LoadingMessage from "../LoadingMessage";

const periods = ["day", "week", "month", "year"];

function GraphContainer({ userId }) {
    const [receiptData, setReceiptData] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState("day");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const transactionAdded = useSelector(state => state.transaction.transactionAdded);

    const fetchReceiptData = async () => {
        setLoading(true);
        try {
            const data = await getUserReceiptData(userId);
            setReceiptData(data);
        } catch (error) {
            console.error("Error fetching receipt data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReceiptData();
    }, [selectedPeriod, transactionAdded]);

    useEffect(() => {
        setCurrentDate(new Date());
    }, [selectedPeriod]);

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
        fetchReceiptData();
    };

    const renderGraphData = () => {
        if (loading) {
            return <LoadingMessage message="Fetching Expenses..." />;
        }

        if (!receiptData || receiptData.length === 0) {
            return <div>No expenses added</div>;
        }

        switch (selectedPeriod) {
            case "day":
                return <GraphDayLayout receiptData={receiptData} />;
            case "week":
                return <GraphWeekLayout receiptData={receiptData} />;
            case "month":
                return <GraphMonthLayout receiptData={receiptData} />;
            case "year":
                return <GraphYearLayout receiptData={receiptData} />;
            default:
                return null;
        }
    };

    const getHeader = () => {
        switch (selectedPeriod) {
            case "day":
                const day = currentDate.getDate().toString().padStart(2, '0');
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                const year = currentDate.getFullYear();
                return `${day}/${month}/${year}`;
            case "week":
                const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
                const lastDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 7);
                const firstDay = `${firstDayOfWeek.getDate()}/${firstDayOfWeek.getMonth() + 1}/${firstDayOfWeek.getFullYear()}`;
                const lastDay = `${lastDayOfWeek.getDate()}/${lastDayOfWeek.getMonth() + 1}/${lastDayOfWeek.getFullYear()}`;
                return `${firstDay} - ${lastDay}`;
            case "month":
                return currentDate.toLocaleDateString('default', { month: 'long' });
            case "year":
                return currentDate.getFullYear();
            default:
                return "";
        }
    };

    return (
        <React.Fragment>
            <div className="dashboard-header">{getHeader()}</div>
            <div className="graph-container">{renderGraphData()}</div>

            <div className="bar-filterContainer">
                {periods.map((period, index) => (
                    <button
                        key={period}
                        className={`bar-filterButton ${selectedPeriod === period ? "active" : ""}`}
                        onClick={() => handlePeriodChange(period)}
                    >
                        {index === 0 ? "Today" :  ` ${period.charAt(0).toUpperCase() + period.slice(1)}`}
                    </button>
                ))}
            </div>
            <AddTransactionButton userId={userId} />
        </React.Fragment>
    );
}

export default GraphContainer;
