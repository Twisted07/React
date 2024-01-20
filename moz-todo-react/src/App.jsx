import Todo from "./components/todo";
import Form from "./components/Form";
import FilterBtn from "./components/FilterBtn";
import './App.css';
import { useState } from "react";

function addTask(task) {
	const newTask = {id: "id", task: task, checked: false};
	setTask([...tasks, newTask])
}

function App(props) {
	const [tasks, setTask] = useState(props.tasks);

  const taskList = props.tasks?.map(task => (
    <Todo 
      action= {task.action}
      id= {task.id}
      checked= {task.checked}
      key= {task.id}
    />
  ));

  const buttonFilter = props.views?.map(view => (
    <FilterBtn
      view= {view.view}
      pressed= {view.pressed}
      key= {view.view}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addNewTask={addTask}/>


      <div className="filters btn-group stack-exception">
        {buttonFilter}
      </div>
      
      
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">        
        {taskList}
      </ul>
    </div>
  );
}

export default App;
