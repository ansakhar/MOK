
import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useHistory } from "react-router-dom";

function Banner() {
  return (
    <h1>Todo Example with React</h1>
  )
}

function ToDoFormAndList() {
  const [itemText, setItemText] = useState(""); 
  const [items, setItems] = useState([]); 

// add a new item -- old function way
//function handleSubmit(e) {
// or JavaScript ES6 - arrow function
const handleSubmit = (event) => {
  // prevent normal submit event
  event.preventDefault();
  // add item to items, Math.random() is used to generate "unique" ID...
  setItems([...items, {id: Math.random(), text: itemText}])
  // modify newItem text to ""
  setItemText("")
}

// remove item -- old function way
// function removeItem(id) {
// or JavaScript  - lambda or arrow function
const removeItem = (id) => {
  // filter/remove item with id
  const newItems = items.filter(item => item.id !== id);
  // set new items
  setItems(newItems);


}
const history = useHistory();

const handleLogout = () =>{
    history.replace('/');
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
  {items.map(item => (
    <li key={item.id}>
      {item.text+" "} <span onClick={() => removeItem(item.id)}> x </span>
    </li>
  ))}
</ul>  
<input type="button" value="Logout" onClick={()=>handleLogout()}></input>
    </div>
  )  
}

function Home() {
  //onko kirjautunut vai ei... jos ei -> history /
  return (
    <div>
<Banner/>
<ToDoFormAndList/>
    </div>
  );
}

function Login(){
  //tarkista palvelimelta tunnus ja salasana
  // storeen on kirjautunut
  const history = useHistory();

  const handleLogin = () =>{
    history.push('/home');
  }

  return (
    <div><Banner/>
    <form>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td><input type="text"/></td>
          </tr>
          <tr>
            <td>Password:</td>
            <td><input type="password"/></td>
          </tr>
          <tr>
            <td><input type="button" value="Login" onClick={() => handleLogin()}/></td>
          </tr>
        </tbody>
      </table>
    </form>
    </div>
  )
}

function App(){
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Login/></Route>
        <Route path="/home"><Home/></Route>
      </Switch>
    </Router>
  );

}
export default App;
