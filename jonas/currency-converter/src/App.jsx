import { useEffect } from "react";
import { useState } from "react";
// import { c } from "vite/dist/node/types.d-AKzkD8vd";

function App() {
  const [firstCurr, setFirstCurr] = useState('USD');
  const [secondCurr, setSecondCurr] = useState('EUR');
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const currencies = ['USD', 'EUR', 'CAD', 'INR'];
  const [amount, setAmount] = useState();

  function handleFirstCurr(e) {
    setFirstCurr(e.target.value);
  }
  
  function handleSecondCurr(e) {
    setSecondCurr(e.target.value);
  }

  function handleAmount(e) {
    setAmount(Number(e.target.value));
  }


  useEffect(()=> {
    async function convert() {
      if (!amount) return;
      setIsLoading(true);
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurr}&to=${secondCurr}`);
      const data = await response.json();
      
      if (data) {
        setIsLoading(false);
        setResult(data.rates[secondCurr])
      }
    }

    if (firstCurr === secondCurr) return; setResult(amount);
    
    convert();

  }, [amount, firstCurr, secondCurr])

  
  return (
    // `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

    <div>
      <input type="number" value={amount} onChange={handleAmount} disabled={isLoading} />
      <select value={firstCurr} onChange={handleFirstCurr} disabled={isLoading} >
      {
        currencies.map(curr => <option value={curr} key={curr}>{curr}</option>)
      }
      </select>

      <select value={secondCurr} onChange={handleSecondCurr} disabled={isLoading} >
        {
          currencies.map(curr => <option value={curr} key={curr}>{curr}</option>)
        }
      </select>
      <p>OUTPUT</p>
      <p>{result} {secondCurr}</p>
    </div>

  );
}

export default App;