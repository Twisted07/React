import { useReducer } from "react";

let nextId = 3;

const initialTask = [
  {id: 0, text: 'visit somebody', done: true},
  {id: 1, text : 'Watch a movie', done: false},
  {id: 2, text: 'complete all tasks', done: false}
]


function App() {
  const [task, dispatch] = useReducer(taskReducer, initialTask);

  function handleTaskAdd(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text
    })
  }

  function handleTaskDelete(taskID) {
    dispatch({
      type: 'deleted',
      id: taskID
    })
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    })
  }



  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleTaskAdd} />
      <TaskList
        tasks={task}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleTaskDelete}
      />
    </>
  );

}

function taskReducer(task, action) {
  switch (action.type) {
    case 'added' : {
      return [
        ...tasks, {
          id: action.id,
          text: action.text,
          done: false
        }
      ];
    }
    case 'changed' : {
      return task.map(t => {
        t.id === action.id ? action.task : t
      });
    }
    case 'deleted' : {
      return task.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action', action.type);
    }
  }
}

export default App;