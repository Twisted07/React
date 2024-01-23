import { useState } from 'react'
import './App.css'

// ? What is the app meant to be able to do?
/**
 * It is a budgeting app, so it needs to get your income, expenses, then present you with your budget
 * 
 * How does it work?
 *  Income should be a list that you can add more items to the section
 *  Expenses: same as income
 *  Budget: Take Income and subtract Expenses from it then divide it by 30 days to get daily budget
*/

function App() {
  const sections = ['income', 'expenses', 'budget'];
  const [section, setSection] = useState('income');
  const [currency, setCurrency] = useState('naira');
  const [expenseList, setExpenseList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [budget, setBudget] = useState(0);


  function calcBudget() {
    if (!incomeList || !expenseList) return;
    
    const initialValue = 0;
    const totalIncome = incomeList.reduce((acc, curr) => acc + Number(curr.incomeEarning), initialValue);
    const totalExpenses = expenseList.reduce((acc, curr) => acc + Number(curr.expenseEarning), initialValue);
    setBudget(totalIncome + totalExpenses);

    handleNext();
  }


  function handleNext() {
    if (section !== sections[sections.length - 1] && (incomeList.length > 0 || expenseList.length > 0)) {
      const sectionIndex = sections.findIndex((currValue) => currValue === section);
      setSection(sections[sectionIndex + 1]);
    }
  }


  function handlePrevious() {
    if (section !== sections[0]) {
      const sectionIndex = sections.findIndex((currValue) => currValue === section);
      setSection(sections[sectionIndex - 1]);
    }
  }

  function reset() {
    setBudget(0);
    setIncomeList([]);
    setCurrency('naira');
    setExpenseList([]);
    setSection('income');
  }


  
  return (
    <div>
      {section === 'income' && 
        <Income 
          list={incomeList}
          currency={currency}
          updateList={setIncomeList}
          onCurrency={setCurrency}
          onNext={handleNext}
          /> 
        }

      {section === 'expenses' && 
        <Expenses 
          list={expenseList}
          currency={currency}
          updateList={setExpenseList}
          onCurrency={setCurrency}
          onNext={calcBudget}
          onPrevious={handlePrevious}
        /> 
      }

      {section === 'budget' && 
        <Budget 
          onPrevious={handlePrevious}
          currency={currency}
          budget={budget}
          onReset={reset}
        /> 
      }

    </div>
  );
}



function Income({onNext, currency, onCurrency, list, updateList}) {
  const [item, setItem] = useState('');
  const [earning, setEarning] = useState('');

  
  function handleAdd(e) {
    e.preventDefault();

    if (!currency || !item || !earning) return;
    
    updateList( [...list, {
      incomeItem: item,
      incomeEarning: earning,
      incomeCurrency: currency,
      key: item
    }]);

    setItem("");
    setEarning("");

  }


  function handleDelete(handle) {
    const newList = list.slice();
    updateList(newList?.filter(item => item.key !== handle));
  }




  return (
    <div>
      <h1>What is your expected income for the month?</h1>
      <Form 
        currency={currency}
        item={item}
        earning={earning}
        onCurrency={onCurrency}
        onEarning={setEarning}
        onItem={setItem}
        onAdd={handleAdd}
      />

      <ul className='income__list'>
        {
          list?.map((income, i) => 
            <Display 
              serialNumber={i+1}
              currency={income.incomeCurrency}
              item={income.incomeItem}
              earning={income.incomeEarning}
              key={income.key}
              onDelete={handleDelete}
              id={income.key}
            />
          )
        }
      </ul>
      <button type="button" onClick={onNext}>NEXT</button>
    </div>
  );
}



function Form({currency, item, earning, onCurrency, onEarning, onItem, onAdd}) {
  return(
    <form>
      <input type="text" placeholder='Salary' autoFocus value={item} onChange={(e) => onItem(e.target.value)} />
      <input type="number" placeholder='3000' value={earning} onChange={(e) => onEarning(e.target.value)} />
      <select value={currency} onChange={(e) => onCurrency(e.target.value)}>
        <option value="dollar">$</option>
        <option value="pounds">£</option>
        <option value="naira">#</option>
      </select>

      <button type="submit" onClick={onAdd}>ADD</button>
    </form>
  );
}



function Display({serialNumber, currency, item, earning, id, onDelete}) {
  return (
    // I want it to have a simple table with a serial number, the item, the amount and currency, and a delete btn
    <li className='income__item'>
      <span className='serial-number'>{serialNumber}</span>
      <p className='item'>{item}</p>
      <p className='amount'>{earning} {currency}</p>
      <button type="button" className='deleteBtn' value={id} onClick={(e) => onDelete(e.target.value)}>❌</button>
    </li>
  );
}



function Expenses({onNext, onPrevious, currency, onCurrency, list, updateList}) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  function handleAdd(e) {
    e.preventDefault();

    if (!currency || !title || !amount) return;
    
    updateList( [...list, {
      expenseItem: title,
      expenseEarning: amount,
      expenseCurrency: currency,
      key: title
    }]);

    setTitle("");
    setAmount("");

  }

  function handleDelete(handle) {
    const newList = list.slice();
    updateList(newList?.filter(item => item.key !== handle));
  }

  return (
    <div>
      <p>Expenses</p>
      <Form
        currency={currency}
        item={title}
        earning={amount}
        onCurrency={onCurrency}
        onEarning={setAmount}
        onItem={setTitle}
        onAdd={handleAdd}
      />

      <ul className="income__list">
        {
          list?.map((expense, i) => 
            <Display
              serialNumber={i+1}
              currency={currency}
              item={expense.expenseItem}
              earning={expense.expenseEarning}
              id={expense.expenseItem}
              key={expense.key}
              onDelete={handleDelete}
            />
            
          )
        }
      </ul>
      <button type="button" onClick={onPrevious}>PREVIOUS</button>
      <button type="button" onClick={onNext}>NEXT</button>
    </div>
  );
}



function Budget({onPrevious, budget, currency, onReset}) {
  return (
    <div>
      <h2>Budget</h2>
      <p>Your budget is {budget}{currency}</p>
      <button type="button" onClick={onPrevious}>PREVIOUS</button>
      <button type="button" onClick={onReset}>RESET</button>
    </div>
  );
}

export default App
