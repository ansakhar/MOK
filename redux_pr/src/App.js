import { Provider, useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";
import './App.css';

//ACTIONS
function increment() {
  return { type: "INCREMENT" };
}

function decrement() {
  return { type: "DECREMENT" };
}

//Reducer
function reducer(state = { count: 0, clicked: 0 }, action) {
  console.log(action)
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state, // copy statesta
        count: state.count + 1,  // update the copy with the new value
        clicked: state.clicked + 1 // update the copy with the new value
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1, 
        clicked: state.clicked + 1
      };
    default:
      return state;
  }
}
//Components
function Counter() {
  //tietoa viedaan storeen
  const dispatch = useDispatch()
  //haetaan storesta
  const count = useSelector(state => state.count)
  return ( 
    <div>
      <button onClick={() => dispatch(increment())}> INCREMENT </button>
      <button onClick={() => dispatch(decrement())}> DECREMENT </button>
      <p>Counter value: {count}</p>
    </div>
  )
}

//Components
function ShowClickedCounter() {
  //haetaan storesta
  const clicked = useSelector(state => state.clicked)
  return ( 
    <div>
  <p>Clicked count: {clicked}</p>
    </div>
  )
}

function App() {
  const store = createStore(reducer)
  return (
    <Provider store={store}>

    <div className="App">
    <Counter/>
    <ShowClickedCounter/>
    </div>
    </Provider>
  );
}

export default App;
