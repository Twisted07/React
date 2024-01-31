import { useState } from 'react'
import './App.css'

// This is a practice app for state queueing, which is a concept of using a updating state multiple times before triggering a re-render.

function App() {
  const [value, setValue] = useState(0);
  const [processing, setProcessing] = useState(0);
  const [purchased, setPurchased] = useState(0);

  function incrementValue() {
    setValue(n => n + 1); // initial value of n = 0 and updates to 1
    setValue(n => n + 1); // value of n = 1 and increments to 2
    setValue(n => n + 1); // value of n = 2 and increments to 3
    setValue(n => n + 1); // value of n = 3 and increments to 4
  }

  async function handlePurchase() {
    setProcessing(1)
    await delay(3000);
    setProcessing(n => n - 1);
    setPurchased(1);

  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  return(
    <>
      <button onClick={incrementValue}>Click me!</button>
      <p>{value}</p>

      <p>This is a masterpiece by Twisted dev-vinci.</p>
      <button onClick={handlePurchase}>Buy</button>
      <span>Processing: {processing}</span>
      <span>Purchased: {purchased}</span>
    </>
  );
}

export default App
