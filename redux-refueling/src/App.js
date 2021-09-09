import { Provider, useSelector, useDispatch } from "react-redux";
import React, { useState } from 'react';
import { createStore } from "redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import './App.css';

//Actions
function openElement(openRefuelId) {
  return { type: "OPEN_REFUEL", openRefuelId: openRefuelId };
}

function addRefuel(date, km, liters, price) {
  return { 
    type: "ADD_REFUEL", 
    date: date,
    km: parseInt(km),
    liters: parseInt(liters),
    price: parseInt(price),
    id: Math.random()};
}

function removeRefuel(id) {
  return { type: "REMOVE_REFUEL", id: id };
}

// Redux Reducer
function refuelsReducer(state = { refuels:[], totalKm:0, totalCost:0, totalL:0, openRefuel:[]}, action)  {
  switch (action.type) {
    case 'OPEN_REFUEL':
      const ref = state.refuels.find(refuel=> refuel.id === action.openRefuelId)
      return {
        ...state, 
        openRefuel: ref
      }
    case 'ADD_REFUEL': 
      return { // returning a copy of orignal state 
        ...state, //copying the original state
        refuels: [...state.refuels,
           {date: action.date, km: action.km, liters: action.liters, price: action.price, id: action.id}], //new refuels array 
        totalKm: state.totalKm + action.km,
        totalCost: state.totalCost + action.liters*action.price,
        totalL: state.totalL + action.liters
      }
    case 'REMOVE_REFUEL':
      const newRefuels = state.refuels.filter(refuel => refuel.id !== action.id);
      return {
        ...state, 
        refuels: newRefuels
      }
    default: return state;
  }
}

//Components
function Banner() {
  return (
    <h1>Car consumption monitoring</h1>
  )
}

function Input(){
  const [refuelDate, setRefuelDate] = useState(""); 
  const [refuelKm, setRefuelKm] = useState(0);
  const [refuelLiters, setRefuelLiters] = useState(0);
  const [refuelPrice, setRefuelPrice] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

// add a new refuel
const handleSubmit = (event) => {
  event.preventDefault();
  // add refuel to refuels
  dispatch(addRefuel(refuelDate, refuelKm, refuelLiters, refuelPrice));
  // modify newrefuel date to ""
  setRefuelDate("");
  setRefuelKm(0);
  setRefuelLiters(0);
  setRefuelPrice(0);
  history.push('/home');
}
  return (
    <div><Banner/>
         <form onSubmit={handleSubmit}>
        <table>
        <tbody>
      <tr>
      <td>date: </td>
      <td><input type='date' 
       value={refuelDate} 
       onChange={event => setRefuelDate(event.target.value)} 
       placeholder="Write refueling date here" />
       </td></tr>
      <tr>
      <td>km: </td>
      <td><input type='text' 
       value={refuelKm} 
       onChange={event => setRefuelKm(event.target.value)} 
       placeholder="Drove since the last refueling" />
       </td></tr>
       <tr>
      <td>L: </td>
      <td><input type='text' 
       value={refuelLiters} 
       onChange={event => setRefuelLiters(event.target.value)} 
       placeholder="refueled liters" /></td></tr>
      <tr>
      <td>€/L: </td>
       <td><input type='text' 
       value={refuelPrice} 
       onChange={event => setRefuelPrice(event.target.value)} 
       placeholder="price per liter" /></td></tr>
       </tbody>
       </table>

        <input type='submit' value='Add'/>
      </form>
    </div>
    )
    }

    function OneElement() {

      const openRefuel = useSelector(state => state.openRefuel);
 
      return(
    <div>
      <Banner/>
      <ul>Refueling information:  
    <li >
      {"date: "+openRefuel.date}
    </li>
    <li >
    {"car kilometers: "+openRefuel.km+" km"}
    </li>
    <li >
    {"refueled liters: "+openRefuel.liters+" L"}
    </li>
    <li >
    {"price per liter: "+openRefuel.price+" €/L"}
    </li>
    <li >
    {"cost: "+openRefuel.price*openRefuel.liters+" €"}
    </li>
    <li >
    {"consumption: "+(openRefuel.liters/openRefuel.km)*100+" L/100km"}
    </li>
</ul> 
    </div>
      )
    }

function AllElements() {
  const totalKm = useSelector(state => state.totalKm);
  const totalCost = useSelector(state => state.totalCost);
  const totalL = useSelector(state => state.totalL);
  const refuels = useSelector(state => state.refuels);

  const dispatch = useDispatch();
  const history = useHistory();
  //open refuel
  const handleOpen= (id) => {
      dispatch(openElement(id));
      history.push('/refuel');
    }

// remove refuel
const handleRemove = (id) => {
  //const newRefuels = refuels.filter(refuel => refuel.id !== id);
  //setRefuels(newRefuels);
  dispatch(removeRefuel(id))
}
  return (
    <div>
      <Banner/>
<div>
      All refuel events:
      <table>
        <tbody >
      <tr >
      <th className="refuel_date">date</th>
      <th className="refuel_th">km</th>
      <th className="refuel_th">L</th>
      <th className="refuel_th">€/L</th>
      <th className="refuel_th">€</th>
      <th className="refuel_th">L/100km</th>
      </tr>
  {refuels.map(refuel => (
    <tr key={refuel.id}>
      <td className="refuel_inf">{refuel.date} </td>
      <td className="refuel_inf">{refuel.km}</td>
      <td className="refuel_inf">{refuel.liters}</td>
      <td className="refuel_inf">{refuel.price}</td>
      <td className="refuel_inf">{refuel.liters*refuel.price}</td>
      <td className="refuel_inf">{((refuel.liters/refuel.km)*100).toFixed(1)}</td>
      <td><button onClick={() => handleOpen(refuel.id)}> open </button></td>
      <td><button onClick={() => handleRemove(refuel.id)}> delete </button></td>
    </tr>
  ))}
  </tbody>
  </table>
  </div>
  <ul>
      <li >
    {"total kilometers driven: "+totalKm+" km"}
    </li>
    <li >
    {"total cost: "+totalCost+" €"}
    </li>
    <li >
    {"average consumption: "+((totalL/totalKm)*100).toFixed(1)+" L/100km"}
    </li>
    </ul>
    </div>
  )  
}

function App() {
  const store = createStore(refuelsReducer)
  return (
    <Provider store={store}>
        <Router>
    <Switch>
      <Route exact path="/"><Input/></Route>
      <Route path="/home"><AllElements/></Route>
      <Route path="/refuel"><OneElement/></Route>
    </Switch>
    <div>
        <nav>
          <ul className="link_nav">
            <li><Link to="/">Input the information</Link></li>
            <li><Link to="/home">All refuel events</Link></li>
          </ul>
        </nav>
      </div>
  </Router>
    </Provider>
  );
}

export default App;
