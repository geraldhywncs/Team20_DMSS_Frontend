import React from "react";
import "./styles/index.css";

import HomeSample from "./components/pages/home/home";
import SplitExpenseComponent from "./lib/expenses/splitExpenseAmount";
import CurrencyConverterComponent from "./lib/expenses/convertCurrencyAmount";


import MainDisplay from "./components/pages/mainDisplay/mainDisplay";


function App() {
  return (
    <div className="App">
      <MainDisplay />
    </div>
  );
}

export default App;
