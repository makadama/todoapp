import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import './App.css';
import {FaCheck, FaTrash} from 'react-icons/fa';

let tasks = [{id: Math.floor(Math.random() * 1000), text:'méditer'},{id: Math.floor(Math.random() * 1000), text:'courir'},{id: Math.floor(Math.random() * 1000), text:'se laver'}]

function App() {
  const {handleSubmit, register, formState : {errors}}= useForm()
  const [todos, setTodos] = useState(tasks);
  const [inprogress, setInprogress] = useState([]);
  const [done, setDone] = useState([]);
  const [input , setInput] = useState('');
  const onSubmit = () => {
    const todo = {
      id: Math.floor(Math.random() * 1000),
      text: input
    }
    setTodos([todo, ...todos]);
  }
  const addToProgress = (id) => {
    const item = todos.find(x => x.id === id);
    setInprogress([item, ...inprogress]);
    const filterarray = todos.filter(x => x.id !== id);
    setTodos(filterarray);
  }
  const deleteTodo = (id) => {
    const filterarray = todos.filter(x => x.id !== id);
    setTodos(filterarray);
  }
  const addtodone = (id) => {
    const item = inprogress.find(x => x.id === id);
    setDone([item, ...done]);
    const filterarray = inprogress.filter(x => x.id !== id);
    setInprogress(filterarray);
  }
  useEffect(() => {

  }, [todos, inprogress])

  return (
    <div className="App">
      <div className="container">
        <h3 className="title">All tasks</h3>
        <form className="form_todo" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" className="form-control" onChange={(e) => setInput(e.target.value)} placeholder="Enter a task" name="text"/>
          <button type="submit" className="btn" >Add</button>
        </form>
        <div className="todos_wrapper">
         <div className="todos_list">
           <h3 className="todo_title">To Do</h3>
           {todos.map((item, index) => 
            <div className="todo_card" key={item.id}>
              <p className="card_text">{item.text}</p>
              <div className='action_icons'>
                <FaCheck onClick={() => addToProgress(item.id)} className="icon-check-todo"/>
                <FaTrash onClick={() => deleteTodo(item.id)} className="icon-trash-todo"/>
              </div>
            </div>
           )}
         </div>
         <div className="todos_list">
           <h3 className="todo_title">In Progress</h3>
           {inprogress.map((item, index) =>
            <div className="progress_card" key={item.key}>
              <p className="card_text">{item.text}</p>
              <FaCheck onClick={() => addtodone(item.id)} className="icon-progress-todo"/>
            </div>
           )}
         </div>
         <div className="todos_list">
           <h3 className="todo_title">Done</h3>
           {done.map((item, index) => 
            <div className="done_card" key={item.id}>
              <p className="card_text">{item.text}</p>
            </div>
           )}
         </div>
        </div>
      </div>
    </div>
  );
}

export default App;