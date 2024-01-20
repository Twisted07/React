import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const DATA = [
  { id: "todo-0", action: "Eat", checked: true },
  { id: "todo-1", action: "Sleep", checked: false },
  { id: "todo-2", action: "Repeat", checked: false },
];

const ViewTypes = [
  {view: "All", pressed: "true"},
  {view: "Active", pressed: "false"},
  {view: "Completed", pressed: "false"}
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App tasks= {DATA} views={ViewTypes}/>
  </React.StrictMode>,
)
