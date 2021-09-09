import React, {useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'

function App() {
const[highscores, setHighscores] = useState([])
useEffect(() => {
  console.log('Effect');
  axios
  .get('http://localhost:3001/highscores')
  .then(response => {
    setHighscores(response.data)
    console.log(response.data)
  })
}, []) // load once, use => []

  // create li-elements from highscreo data
  const highscoreItems = highscores.map((highscore,index) =>
    <li key={index}>{highscore.name} : {highscore.score}</li>
  );

 // render loaded json data 
  return (
    <div className="App">
      <ul>
        {highscoreItems}
      </ul>
    </div>
  );
}

export default App;
