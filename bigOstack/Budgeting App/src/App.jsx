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
  return (
    <div>
      <Income />
      <Expenses />
      <Budget />
    </div>
  );
}

function Income() {
  return (
    <p>Income</p>
  );
}

function Expenses() {
  return (
    <p>Expenses</p>
  );
}

function Budget() {
  return (
    <p>Budget</p>
  );
}

export default App
