import React, { ReactNode, useEffect, useState } from 'react';
import "./App.css"

import ProgressBar from "@ramonak/react-progress-bar";

const useInput = () => {
  const [value, setValue] = useState("")
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }
  return {
    value,
    onChange
  }
}
const useNumInput = () => {
  const [value, setValue2] = useState<number>()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue2(e.target.valueAsNumber)
  }
  return {
    value,
    onChange
  }
}

const App = () => {
  const sourceInput = useInput()
  const amountInput = useNumInput()
  const dateInput = useInput()
  const expenseSourceInput = useInput()
  const expenseAmountInput = useNumInput()
  const expenseDateInput = useInput()
  const [listItems1, setListItems1] = useState<unknown[]>([])
  const [listItems2, setListItems2] = useState<unknown[]>([])
  let [balance, setBalance] = useState<number>(0)
  let [expense, setExpnse] = useState<number>(0)
  let [num1, setNum1] = useState<number>(0)
  let [num2, setNum2] = useState<number>(0)
  let [saving, setSaving] = useState<number>(0)
  let [target, setTarget] = useState<number>(0)
  let [progress, setProgress] = useState<any>(0)
  let num = 0
  //useEffect for giving the progress of savings
  useEffect(() => {
    setProgress((saving / target) * 100)
  }, [saving, target])
  const printDataIncome = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem1 = `${sourceInput.value}: ${amountInput.value} EUR on ${dateInput.value}`;
    setListItems1([...listItems1, newItem1]);
    console.log(e);
    amountInput.value && setBalance(balance + amountInput.value)
    console.log(num);
    console.log(balance);
  }
  const printDataExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (balance < Number(expenseAmountInput.value)) {
      console.log("insufficient balance");
      alert('insufficient balance')
    }
    else if (balance >= Number(expenseAmountInput.value)) {
      const newItem2 = `${expenseSourceInput.value}: ${expenseAmountInput.value} EUR on ${expenseDateInput.value}`;
      setListItems2([...listItems2, newItem2]);
      expenseAmountInput.value && setExpnse(expense + expenseAmountInput.value)
      expenseAmountInput.value && setBalance(balance - expenseAmountInput.value)
    }
  }
  const printDataSaving = (e: React.FormEvent) => {
    e.preventDefault()
    setTarget(num2)
    if (balance < num1) {
      console.log("insufficient balance");
      alert('insufficient balance')
    }
    else {
      setSaving(saving + num1)
      num1 && setBalance(balance - num1)
    }
    setNum1(0)
    console.log(progress);
  }

  return (
    <div className='main'>
      <div>
        <form onSubmit={printDataIncome} >
          <div>
            <label htmlFor="income">Income source</label>
            <input
              type="text"
              name="income"
              id="income"
              {...sourceInput}
            />
          </div>
          <div>
            <label htmlFor="iAmount">Amount of income</label>
            <input
              type="number"
              name="iAmount"
              id="iAmount"
              {...amountInput}
            />
          </div>
          <div>
            <label htmlFor="iDate">Date of income</label>
            <input id="iDate"
              type="date"
              {...dateInput} />
          </div>
          <button
            type="submit">Add income</button>
          <div><p>Total balance: {balance}</p></div>
        </form>
        <hr></hr>
        <form onSubmit={printDataExpense}>
          <div>
            <label htmlFor="eSource">Expense source</label>
            <input
              type="text"
              name="eSource"
              id="eSource"
              {...expenseSourceInput} />
          </div>
          <div>
            <label htmlFor="eAmount">Amount of expense</label>
            <input
              type="number"
              name="eAmount"
              id="eAmount"
              {...expenseAmountInput}
            />
          </div>
          <div>
            <label htmlFor="eDate">Date of expense</label>
            <input
              id="eDate"
              type="date"
              {...expenseDateInput} />
          </div>
          <button
            type="submit">Add expense</button>
        </form>
        <p>total expense: {expense}</p>
        <hr></hr>
        <div>
          <form onSubmit={printDataSaving}>
            <label htmlFor='target'>Set Target</label>
            <input
              id="target"
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.valueAsNumber)}
            />
            <button>Reset</button>
            <br></br>
            <label htmlFor='save'>Transfer to saving account</label>
            <input
              id="saving"
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.valueAsNumber)}
            />
            <button>Transfer</button>
          </form>
          <p>Target: {target}</p>
          <p>Current saving: {saving}</p>
          <p>Progress: {progress}%</p>
          <ProgressBar completed={progress} maxCompleted={100} width='300px' />   
        </div>
      </div>
      <div className='main2'>
        <div>
          <h2>Income list</h2>
          <ul>
            {listItems1.map((item, index) => (
              <li key={index}>{item as ReactNode}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Expense list</h2>
          <ul>
            {listItems2.map((item, index) => (
              <li key={index}>{item as ReactNode}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default App;