import { useState } from 'react'
import './App.css'


function App() {

  const winningMatrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // ? Check to see if there's a winner by comparing the box array to the winningMatrix array
  function calcWinner(box) {
    for(let i = 0; i < winningMatrix.length; i++) {
      const [a, b, c] = winningMatrix[i];
      
      if(box[a] && box[a] === box[b] && box[a] === box[c]) return box[a];
  
    }
  
    return null;
  }


  const [box, setBox] = useState(Array(9).fill(null));
  const [playerX, setPlayerX] = useState(true);
  
  function togglePlayer(i) {
    // ? Check if the i position of the box array is null to prevent toggling of already selected boxes
    if (box[i] || calcWinner(box)) return;

    const nextBox = box.slice();
    
    if (playerX) nextBox[i] = 'X';
    else nextBox[i] = 'O';

    setBox(nextBox);
    setPlayerX(!playerX);
  }


  const gameStarted = box.some(box => box !== null);

  //? Update the game status
  const winner = calcWinner(box);
  let gameStatus;

  winner ? gameStatus = "Winner" + winner : gameStatus = "Next player: " + (playerX ? "X" : "0");





  return (
    <div>
      <h3>{gameStatus}</h3>

      <div className='board-row'>
        <Button value= {box[0]} onToggle={() => togglePlayer(0)}/>
        <Button value={box[1]} onToggle={() => togglePlayer(1)}/>
        <Button value={box[2]} onToggle={() => togglePlayer(2)}/>
      </div>

      <div className="board-row">
        <Button value={box[3]} onToggle={() => togglePlayer(3)}/>
        <Button value={box[4]} onToggle={() => togglePlayer(4)}/>
        <Button value={box[5]} onToggle={() => togglePlayer(5)}/>
      </div>

      <div className="board-row">
        <Button value={box[6]} onToggle={() => togglePlayer(6)}/>
        <Button value={box[7]} onToggle={() => togglePlayer(7)}/>
        <Button value={box[8]} onToggle={() => togglePlayer(8)}/>
      </div>


      <div className="buttons">
        <button className='player' onClick={() => gameStarted ? null : setPlayerX('X')}>X</button>
        <button onClick={() => gameStarted ? null : setPlayerX('O')}>O</button>

        <button className='reset' onClick={() => setBox(Array(9).fill(null))}>Reset</button>
      </div>

    </div>
  )
}


function Button({value, onToggle}) {
  return (
    <button className='button' onClick={onToggle}>
      {value}
    </button>
  )
}

export default App