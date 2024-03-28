import { useState } from "react";
import Section from "../shared/Section";
import "../../styles/pages/Transactions.css";
import TransactionsView from "../shared/Transactions";
import AddTransactionButton from "../shared/AddTransactionButton";
import DeleteTransactionButton from "../shared/DeleteTransactionButton";
import UpdateTransactionButton from "../shared/UpdateTransactionButton";

function Transactions({userId}){
  return (
    <>
      <ExistingTransactions />
      <AddTransactionButton />
      <UpdateTransactionButton />
      <DeleteTransactionButton />
    </>
  );
}

function ExistingTransactions() {
  return (
    <Section headerName="Recent Transaction">
      <TransactionsView />
      <TransactionsView />
    </Section>
  );
}

export default Transactions;
