import { useState } from 'react';
import './App.css'

function App() {
  const [bill, setBill] = useState(0);
  const [selfRating, setSelfRating] = useState(0);
  const [partnerRating, setPartnerRating] = useState(0);
  const [partnerTip, setPartnerTip] = useState(0);
  const [selfTip, setSelfTip] = useState(0);
  const rating = [
    {
      name: "none",
      value: 0,
      text: "No rating (0%)"
    },
    {
      name: "okay",
      value: 0.05,
      text: "It was okay (5%)"
    },
    {
      name: "good",
      value: 0.1,
      text: "It was good (10%)"
    },
    {
      name: "amazing",
      value: 0.2,
      text: "It was amazing (20%)"
    }
  ]


  function handlePartnerRating(e) {
    setPartnerRating(e.target.value);
    setPartnerTip(bill * e.target.value);
  }
  
  function handleSelfRating(e) {
    setSelfRating(e.target.value);
    setSelfTip(bill * e.target.value);    
  }

  function handleReset() {
    setBill(0);
    setSelfRating("okay");
    setPartnerRating("okay");
    setSelfTip(0);
    setPartnerTip(0);
  }
  

  const tip = selfTip + partnerTip;
  const totalPrice = Number(bill) + Number(tip);



  return (
    <div>
      <div className="input">
        <label htmlFor="bill">How much was the bill?</label>
        <input type="number" id="bill" value={bill} onChange={(e) => setBill(e.target.value)} />
      </div>

      <div className="input">
        <label htmlFor="self-rating">How did you like the service?</label>
        <select id="self-rating" value={selfRating} onChange={handleSelfRating}>
          {
            rating.map(option => <option value={option.value} key={option.value}>{option.text}</option>)
          }
        </select>
      </div>

      <div className="input">
        <label htmlFor="partner-rating">How did you like the service?</label>
        <select id="partner-rating" value={partnerRating} onChange={handlePartnerRating}>
          {
            rating.map(option => <option value={option.value} key={option.value}>{option.text}</option>)
          }
        </select>
      </div>

      <h3>You pay ${totalPrice} (${bill} + ${tip} tip)</h3>

      <button type="button" onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App
