import React, { useState, useEffect } from 'react';
import callApi from "../callAPI";

const CurrencyConverterComponent = () => {
  const [fromCurrency, setFromCurrency] = useState('SGD');
  const [toCurrency, setToCurrency] = useState('SGD');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fromCurrency, toCurrency, fromAmount, toAmount]);

  const fetchData = async () => {
    if (!fromCurrency || !toCurrency || !fromAmount) {
      setTimeout(() => {
        setToAmount(null);
      },1000);
      return;
    }
  
    const apiEndpoint = process.env.REACT_APP_apiHost + "/expenses/currencyConverter";
    const data = { "amount" : fromAmount, "from_currency" : fromCurrency, "to_currency" : toCurrency };
  
    try {
      setLoading(true);
  
      const response = await callApi(apiEndpoint, "POST", data);
  
      if (response && response.converted_amount !== undefined) {
        const convertedAmount = response.converted_amount;
        setToAmount(convertedAmount);
        console.log('Data from API:', convertedAmount);
      } else {
        console.error('Invalid API response:', response);
      }
    } catch (error) {
      console.error('Error:', error.message);
  
      if (error.response && error.response.status === 500) {
        setToAmount(null);
      } else {
        setToAmount(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return toAmount;
}

export default CurrencyConverterComponent;
