import {useState} from 'React'
import './App.css';


function App() {
  const [list, setList] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  function updateList(e) {
    e.preventDefault();

    if (!todoInput) return;

    setList(
      [...list, {
        todoName: todoInput,
        completed: false,
        key: Date.now()
      }]
    )

    setTodoInput("");
  }


  function handleInput (e) {
    setTodoInput(
      e.target.value
    )
  }

  return (
    <div>
      <InputArea todoInput={todoInput} onInput={handleInput} onAdd={updateList}/>
      <DisplayItems list={list} />

    </div>

  );
}

function InputArea({todoInput, onInput, onAdd}) {
  return (
    <form>
      <input type="text" value={todoInput} onChange={onInput} />
      <button type='submit' onClick={onAdd}>Add Item</button>
    </form>
  );
}




function DisplayItems({list}) {
  return (
    list.map(item => 
      <TodoItem
      todoName={item.todoName}
      completed={item.completed}
      key={item.key} />
      )
      );
}
    
    
    
function TodoItem({todoName}) {
  const [check, setCheck] = useState(false);

  function handleCheck (e) {
    setCheck(e.target.checked)
  }

  return (
    <div style={{display: 'flex', width: 500, justifyContent: 'space-between'}}>
      <div>
        <p>{todoName}</p>
        <p>{check == true ? "Completed" : "Not completed"}</p>
      </div>

      <input type="checkbox" onChange={handleCheck}/>
    </div>

  );

}

export default App
