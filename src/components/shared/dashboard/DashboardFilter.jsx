import React from 'react';

function DashboardFilter({ period, receiptData }) {
  const filterDataByPeriod = (period, receiptData) => {
    const currentDate = new Date();

    switch (period) {
      case 'day':
        return receiptData.filter(receipt => {
          const receiptDate = new Date(receipt.created_datetime);
          return receiptDate.getDate() === currentDate.getDate() &&
                 receiptDate.getMonth() === currentDate.getMonth() &&
                 receiptDate.getFullYear() === currentDate.getFullYear();
        });
      case 'week':
        const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
        const lastDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()));

        return receiptData.filter(receipt => {
          const receiptDate = new Date(receipt.created_datetime);
          return receiptDate >= firstDayOfWeek && receiptDate <= lastDayOfWeek;
        });
      case 'month':
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        return receiptData.filter(receipt => {
          const receiptDate = new Date(receipt.created_datetime);
          return receiptDate >= firstDayOfMonth && receiptDate <= lastDayOfMonth;
        });
      case 'year':
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const lastDayOfYear = new Date(currentDate.getFullYear(), 11, 31);

        return receiptData.filter(receipt => {
          const receiptDate = new Date(receipt.created_datetime);
          return receiptDate >= firstDayOfYear && receiptDate <= lastDayOfYear;
        });
      default:
        return receiptData;
    }
  };

  const filteredReceiptData = filterDataByPeriod(period, receiptData);

//   return (
//     <div>
//       {filteredReceiptData.map(receipt => (
//         <div key={receipt.receipt_id}>Title:{receipt.title}Value{receipt.receipt_id}</div>
//       ))}
//     </div>
//   );
}

export default DashboardFilter;
