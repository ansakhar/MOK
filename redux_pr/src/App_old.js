
import './App.css';


//Child2
function Child2(props) {
  const action = () => {
    const rand = Math.random()
    console.log("child2: "+ rand);
    props.action(rand)
   
  }
  return (
  <div>
      <p>
     Child2: number is {props.number} </p>
     <button onClick = {()=>action()}>Random</button>
   </div>
  )
  }

  //Child1
function Child1(props) { 

  const action =(rand) =>{
    console.log("Child1: "+ rand)
    props.action(rand)
  }
  return (
<div>
    <p>
   Child1: number is 
   {props.number}</p>
 <Child2 number={props.number} action={action}/>
 </div>
)
}


function App() {
  const number = 2

  
  const action =(rand) =>{
    console.log("App: "+ rand)
  }

  return (
    <div className="App">
      <p>App {number}</p>
     
     <Child1 number={number} action={action}/>
    </div>
  );
}

export default App;
