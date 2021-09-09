import './App.css';
import MyPage from './MyPage';
import About from './About';
import Portfolio from './Portfolio';
import Skills from './Skills'
import Contact from './Contact'
import CV from './CV'
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><MyPage /></Route>
        <Route path="/about">< About/></Route>
        <Route path="/skills"><Skills /></Route>
        <Route path="/portfolio"><Portfolio /></Route>
        <Route path="/contact"><Contact /></Route>
        <Route path="/cv"><CV /></Route>
      </Switch>
    </Router>  
  );
}

export default App;
