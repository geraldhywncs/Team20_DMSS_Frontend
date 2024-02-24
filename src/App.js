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
      {/* Title Class is from index.css styles
      <div className="title">Money Go Where</div>

      This are the tailWind Styles without a class (Inline Styles)
      <div className="text-teal-600 text-4xl text-center">WELCOME 🌭</div>


      {/* {Do not code here, put your components HomeSample for reference. App is only for rendering components. Will delete the above} */}
      <HomeSample />

      <SplitExpenseComponent />

      <CurrencyConverterComponent />

    </div>
  );
}

export default App;
