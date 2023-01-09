import React, { useState} from "react";
import "./App.css";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import uuid from 'uuid/v4'

const initialExpenses = [
  {id:uuid(),charge:"rent",amount:400},
  {id:uuid(),charge:"car payment",amount:1200},
  {id:uuid(),charge:"credit card bill",amount:600}
]

function App() {

  //**************************State Values********************************** */
  const [expenses,setExpenses] = useState(initialExpenses)
  const [charge,setCharge] = useState('');
  const [amount,setAmount] = useState('');


  //**************************Functionality********************************** */

    const handleCharge = e => {
      setCharge(e.target.value)
    }

    const handleAmount = e => {
      setAmount(e.target.value)
    }

    const handleSubmit = e => {
      e.preventDefault();

      if(charge !== '' && amount > 0){

        const singleExpense = {id:uuid(),charge,amount};
        setExpenses([...expenses,singleExpense])
        setCharge("");
        setAmount("");
      } else {
        //handle Alert
      }
    }

  return (
    <>
      <h1>Budget Calculator</h1>
      <main className="App">
      <ExpenseForm 
      charge={charge}
       amount={amount}
       handleAmount={handleAmount}
       handleCharge={handleCharge}
       handleSubmit={handleSubmit}
        />
      <ExpenseList  expenses={expenses}/>
      </main>
      <h1>total spending:<span className="total">
        ${expenses.reduce((acc,curr)=>{
          return (acc += parseInt(curr.amount));
        },0)}
      </span></h1>

    </>
  );
}

export default App;
