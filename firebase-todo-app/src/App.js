import Home from './Home';
import Login from './Login';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/home"><Home /></Route>
        <Route exact path="/"><Login /></Route>
      </Switch>
    </Router>  
  );
}

export default App;
