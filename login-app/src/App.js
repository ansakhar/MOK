import SignIn from './Signin';
import Dashboard from './Dashboard';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  SignIn()
    
  return (
    <Router>
      <Switch>
        <Route path="/dashboard"><Dashboard /></Route>
        <Route exact path="/"><SignIn /></Route>
      </Switch>
    </Router>  
  );
}

export default App;
