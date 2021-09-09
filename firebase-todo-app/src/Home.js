import './App.css';
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore/lite';
import { useHistory } from "react-router-dom";
import app from './db'

function Banner() {
  return (
    <h1>Todo Example with React</h1>
  )
}

function ToDoFormAndList() {
  const [itemText, setItemText] = useState(""); 
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);

  // load list items
useEffect(() => {
  const fetchData = async () => {
    // database
    const db = getFirestore(app);
    // connect todos collection
    const data = await getDocs(collection(db,"todos"));       
    const items = data.docs.map(doc => {
      return  { 
        text: doc.data().text,
        id: doc.id 
      };
    });
    // set states
    setItems(items);
    setLoading(false);
  }
  // start loading data
  console.log("fetch data...")
  fetchData();
},[]); // called only once

// add a new item
const handleSubmit = async (event) => {
  // prevent normal submit event
  event.preventDefault();
  // add item to Firebase
  let newItem =  { text: itemText };
  const db = getFirestore(app);
  let doc = await addDoc(collection(db, 'todos'), newItem);
  // get added doc id and set id to newItem
  newItem.id = doc.id;
  // update states in App
  setItems( [...items, newItem]);
  // modify newItem text to ""
  setItemText("")
}

// remove item
const removeItem = async (deleteItem) => {
  // connect database
  const db = getFirestore(app);
    // delete item from database
    await deleteDoc(doc(db, 'todos', deleteItem.id));
  // filter/remove item with id
  const newItems = items.filter(item => item.id !== deleteItem.id);
  // set new items
  setItems(newItems);
}

const history = useHistory();

const handleLogout = () =>{
    history.replace('/');
  }

// render loading... text
if (loading) return (<p>Loading...</p>);

// or loaded items
return (
  <div>
    <form onSubmit={handleSubmit}>
      <input type='text' value={itemText} onChange={event => setItemText(event.target.value)} placeholder="Write a new todo here" />
      <input type='submit' value='Add'/>
    </form>
    <ul>
      { loading  && 
        <p>Loading...</p>
      }
      {items.map(item => (
        <li key={item.id}>
          {item.text+" "} <span onClick={() => removeItem(item)}> x </span>
        </li>
      ))}
    </ul>
    <input type="button" value="Logout" onClick={()=>handleLogout()}></input>
  </div>
) 
}

function Home() {
  return (
    <div>
<Banner/>
<ToDoFormAndList/>
    </div>
  );
}

export default Home;
