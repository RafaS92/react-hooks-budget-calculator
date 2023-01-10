import React, { useState, useEffect } from "react";
import "./App.css";
import { Alert } from "./components/Alert"
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import uuid from 'uuid/v4'

// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 400 },
//   { id: uuid(), charge: "car payment", amount: 1200 },
//   { id: uuid(), charge: "credit card bill", amount: 600 }
// ]

const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []

function App() {

  //**************************State Values********************************** */
  const [expenses, setExpenses] = useState(initialExpenses)
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false });
  const [edit,setEdit] = useState(false)
  const [id,setId] = useState(0)

  //**************************UseEffect********************************** */
  useEffect(() => {
    localStorage.setItem('expenses',JSON.stringify(expenses))
  }, [expenses])
  


  //**************************Functionality********************************** */

  const handleCharge = e => {
    setCharge(e.target.value)
  }

  const handleAmount = e => {
    setAmount(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (charge !== '' && amount > 0) {

      if(edit){
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item,charge,amount} : item
        })
        setExpenses(tempExpenses);
        setEdit(false);
        handleALert({ type: 'success', text: 'item edited' })

      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense])
        handleALert({ type: 'success', text: 'item added' })

      }

      setCharge("");
      setAmount("");

    } else {
      handleALert({ type: 'danger', text: `charge can't be empty value and amount value has to be bigger than zero` })
    }
  }

  const handleALert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 5000)
  }

  // clear all items

  const clearItems = () => {
    setExpenses([]);
    handleALert({ type: 'danger', text: "all items deleted" })
  }

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses)
    handleALert({ type: 'danger', text: "item deleted" })
  }

  const handleEdit = (id) => {
    let expense = expenses.find(i => i.id === id)
    let {charge,amount} = expense;
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}

        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems} />
      </main>
      <h1>total spending:<span className="total">
        ${expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)}
      </span></h1>

    </>
  );
}

export default App;
