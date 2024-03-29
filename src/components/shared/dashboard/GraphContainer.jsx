import React, { useState, useEffect } from "react";
import { getUserReceiptData } from '../../api/DashboardInfo';
import GraphDayLayout from "./GraphDayLayout";
import GraphWeekLayout from "./GraphWeekLayout";
import GraphMonthLayout from "./GraphMonthLayout";
import GraphYearLayout from "./GraphYearLayout";
import LoadingMessage from "../LoadingMessage";

const periods = ["day", "week", "month", "year"];

function GraphContainer({userId}) {
  const [receiptData, setReceiptData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("day");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const data = await getUserReceiptData(userId);
        setReceiptData(data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching receipt data:", error);
        setLoading(false); 
      }
    };
    fetchReceiptData();
  }, []); 

  useEffect(() => {
    setCurrentDate(new Date());
  }, [selectedPeriod]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
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
        return `${firstDayOfWeek.toLocaleDateString()} - ${lastDayOfWeek.toLocaleDateString()}`;
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
            {index === 0 ? "Today" : `Past ${period.charAt(0).toUpperCase() + period.slice(1)}`}
          </button>
        ))}
      </div>
    </React.Fragment>
  );
}

export default GraphContainer;
