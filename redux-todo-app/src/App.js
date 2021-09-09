import { Provider, useSelector, useDispatch } from "react-redux";
import React, { useState } from 'react';
import { createStore } from "redux";
import './App.css';

//Actions
function addTodo(text) {
  return { type: "ADD_TODO", text: text, id: Math.random()};
}

function removeTodo(id) {
  return { type: "REMOVE_TODO", id: id };
}

// Redux Reducer
function todosReducer(state = { todos:[] }, action)  {
  switch (action.type) {
    case 'ADD_TODO': 
      return { // returning a copy of orignal state 
        ...state, //copying the original state
        todos: [...state.todos, {text: action.text, id: action.id}] //new todos array 
      }
    case 'REMOVE_TODO':
      const newTodos = state.todos.filter(todo => todo.id !== action.id);
      return {
        ...state, 
        todos: newTodos
      }
    default: return state;
  }
}

//Components
function Banner() {
  return (
    <h1>Todo Example with React</h1>
  )
}

function ToDoFormAndList() {
  const [itemText, setItemText] = useState(""); 
  const dispatch = useDispatch();
 // const [items, setItems] = useState([]); 
 const todos = useSelector(state => state.todos);

// add a new item -- old function way
//function handleSubmit(e) {
// or JavaScript ES6 - arrow function
const handleSubmit = (event) => {
  // prevent normal submit event
  event.preventDefault();
  // add item to items, Math.random() is used to generate "unique" ID...
  dispatch(addTodo(itemText))
  //setItems([...items, {id: Math.random(), text: itemText}])
  // modify newItem text to ""
  setItemText("")
}

// remove item -- old function way
// function removeItem(id) {
// or JavaScript  - lambda or arrow function
const removeItem = (id) => {
  // filter/remove item with id
  //const newItems = items.filter(item => item.id !== id);
  // set new items
  //setItems(newItems);
  dispatch(removeTodo(id))
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type='text' 
       value={itemText} 
       onChange={event => setItemText(event.target.value)} 
       placeholder="Write a new todo here" />
        <input type='submit' value='Add'/>
      </form>
      <ul>
  {todos.map(item => (
    <li key={item.id}>
      {item.text+" "} <span onClick={() => removeItem(item.id)}> x </span>
    </li>
  ))}
</ul>  
    </div>
  )  
}

function App() {
  const store = createStore(todosReducer)
  return (
    <Provider store={store}>
        <Banner/>
        <ToDoFormAndList/>
    </Provider>
  );
}

export default App;
