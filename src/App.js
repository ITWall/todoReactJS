import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

function App() {
  let id = uuidv4();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);
  let tasksUI = [];
  for (let task of tasks) {
    tasksUI.push(
      <tr  key={task.id}>
        <td className="centerTableData id">{task.id}</td>
        <td className="centerTableData">{task.title}</td>
        <td className="centerTableData">{task.content}</td>
        <td className="centerTableData">{task.createdDate}</td>
        <td className="centerTableData">{task.finishedDate}</td>
        <td className="centerTableData">{task.status}</td>
        <td className="centerTableData">
          <div className="action">
            <span
              onClick={() => {
                deleteTask(tasks.indexOf(task));
              }}
              className="actionBtn deleteBtn"
            >
              X
            </span>
            <span
              onClick={() => {
                markTaskFailed(tasks.indexOf(task));
              }}
              className="actionBtn failedBtn"
            >
              Failed
            </span>
            <span
              onClick={() => {
                markTaskPassed(tasks.indexOf(task));
              }}
              className="actionBtn passedBtn"
            >
              Passed
            </span>
          </div>
        </td>
      </tr>
    );
  }

  var createTask = (event) => {
    let newTask = {
      id: id,
      title: title,
      content: content,
      createdDate: new Date().toString(),
      finishedDate: "",
      status: "in progress",
    };
    event.preventDefault();
    setTasks((tasks) => [...tasks, newTask]);
    
  };
  var deleteTask = (index) => {
    tasks.splice(index, 1);
    console.log(index);
    setTasks((tasks) => [...tasks]);
  };
  var markTaskFailed = (index) => {
    let task = tasks[index];
    task.status = "failed";
    tasks[index] = task;
    setTasks((tasks) => [...tasks]);
  };
  var markTaskPassed = (index) => {
    let task = tasks[index];
    task.status = "passed";
    task.finishedDate = new Date().toString();
    tasks[index] = task;
    setTasks((tasks) => [...tasks]);
  };

  useEffect(()=>{
    console.log(tasks);
  })
  return (
    <div>
      <div id="myDIV" className="header">
        <h2 style={{ margin: "5px" }}>My To Do List</h2>
        <form onSubmit={createTask}>
          <input
            type="text"
            id="titleInput"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            id="contentInput"
            placeholder="Content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input type="submit" value="Add" className="addBtn"></input>
        </form>
      </div>
      <table className="todoTable">
        <thead>
          <tr>
            <th className="id">ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Created Date</th>
            <th>Finish Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{tasksUI}</tbody>
      </table>
    </div>
  );
}

export default App;
