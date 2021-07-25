import React, { ChangeEvent, FC, useState } from 'react';
import './App.css';
import { ITask } from './Interfaces';
import TodoTask from './TodoTask';

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "task") {
      setTask(e.target.value);
    } else {
      setDeadline(Number(e.target.value))
    }
  }

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  }

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter(task => task.taskName !== taskNameToDelete))
  }

  return (
    <div className="App">
      <div className="header">
        <div className="input-container">
          <input type="text" placeholder="Task..." name="task" value={task} onChange={handleChange} />
          <input type="number" placeholder="Deadline (in days)..." value={deadline} name="deadline" onChange={handleChange} />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((todo: ITask, key: number) => <TodoTask key={key} todo={todo} completeTask={completeTask} />)}
      </div>
    </div>
  );
}

export default App;
