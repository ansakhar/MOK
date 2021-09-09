import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

const OwnerContext = React.createContext({ name: '', token: '', auth: false });


const OwnerProvider = ({ children }) => {
  const [owner, setOwner] = useState({ name: '', token: '', auth: true });

/*const login = (name, token) => {
    setOwner((owner) => ({
      ...owner,
      name: name,
      token: token,
      auth: true
    }));
  };

  const logout = () => {
    setOwner((owner) => ({
      name: '',
      token: '',
      auth: false
    }));
  };*/

  return (
    <OwnerContext.Provider value={owner/*, login, logout*/}>
      {children}
    </OwnerContext.Provider>
  );
}



function Banner() {
  return (
    <h1>Todo Example with React</h1>
  )
}

function Login() { 
  const [error, setError] = useState('')
  const [name, setName] = useState('')
const [password, setPassword] = useState('')
//const { login } = useContext(OwnerContext);
//const login = () => OwnerContext
const owner = useContext(OwnerContext)

const onChangeHandler = (event) => {
  const {name, value} = event.currentTarget;
  if (name === 'name') setName(value);
  else if (name === 'password') setPassword(value);
}

const history = useHistory()

const handleLogin = () => {
  //console.log(name)
  //console.log(password)
  console.log("ownerBeforeLogin", owner)
  //history.push('/home')
  axios.post('http://localhost:3000/login', 
    { 
      'owner':name, 
      'password':password 
    })
    .then(response => {
     //login(name, response.data.token);
      owner.name = name;
      owner.token = response.data.token;
      owner.id = response.data.id;
      owner.auth = true;
      console.log("response.data:", response.data);
      // HOW to store logged owner name and token??
      // go to home page
      history.push('/home');
    })
    .catch(error => 
      {
     if (error.response.status === 401) {
        setError(error.response.data.error);
      } else {
        setError("Unknow error");
      }
    }
    )
}

  return (
    <div>
      <Banner/>
      <form>
        <table>
        <tbody>
        <tr>
          <td>Name:</td>
          <td><input type='text' 
           placeholder="" 
           name="name" 
           onChange={(event) => onChangeHandler(event)}/></td>
        </tr>
        <tr>
          <td>Password:</td>
          <td><input type='password' 
           placeholder="" 
           name="password" 
           onChange={(event) => onChangeHandler(event)}/></td>
        </tr>
        <tr>
          <td><input type='button' value='Login' onClick={() => handleLogin()}/></td>
          <td><span className="Error">{error}</span></td>
        </tr>
        </tbody>
        </table>
      </form>
    </div>
  )
}

function Home() {
  return (
    <div>
      <Banner/>
      <ToDoFormAndList/>
    </div>
  )
}

function ToDoFormAndList() {
  const [error, setError] = useState('')
  const [itemText, setItemText] = useState(""); 
  const [items, setItems] = useState([]); 
  const owner = useContext(OwnerContext)

  const history = useHistory()

  const handleLogout = () => {
    history.replace('/');
  }

  // load todo list items
  useEffect(() => {
    // start loading data, if owner is logged in
    if (owner.auth) {
      axios.get('http://localhost:3000/owners/' + owner.id, 
      {
        headers: {
          'Authorization': `bearer ${owner.token}`
        }        
      })
      .then(response => {
        setItems(response.data.todos);
        console.log("ownerAfterLogin", owner)
      })
    }
    else {
      // if not logged, go back to login screen
      history.replace('/');
    }
  },[owner, history]); // called only once

  // add a new item
const handleSubmit = (event) => {
  // prevent normal submit event
  event.preventDefault();
  axios.post('http://localhost:3000/todos', 
  { 
    'text':itemText
  }, {
    headers: {
    'Authorization': `bearer ${owner.token}`
  }
})
  .then(response => {
    console.log("new todo:", response.data);
  setItems([...items, {
    _id: response.data._id,
    text: itemText,
    owner: response.data.owner,
    date: response.data.date}]);
  // modify newItem text to ""
  setItemText("");
  setError("")
  })
  .catch(error => 
    {
   if (error.response.status === 400) {
      setError(error.response.data.error);
    } else {
      setError("Unknow error");
    }
  }
  )
}

// remove item
const removeItem = (id) => {
  console.log("deleted id:", id)
  setError("")
  if (owner.auth) {
    axios.delete('http://localhost:3000/todos/'+id,
    {
      headers: {
      'Authorization': `bearer ${owner.token}`
    }
  })
    .then(response => {
      // you SHOULD check server errors here...
      // filter removed todo and update UI
      if(response.data) {
  const newItems = items.filter(item => item._id !== response.data._id);
  // set new items
  setItems(newItems);
      } else {
        setError("Item hot found")
      }
})
.catch(error => 
  {
 setError(error.response.data.error);
}
)
  }
}
  return (
   
    <div>
      <form onSubmit={handleSubmit}>
      <input type='text' 
       value={itemText} 
       onChange={event => setItemText(event.target.value)} 
       placeholder="Write a new todo here" />
        <input type='submit' value='Add'/>
        <input type='button' value='Logout' onClick={() => handleLogout()}/><br></br>
        <span className="Error">{error}</span>
      </form>
      <ul>
  {items.map(item => (
    <li key={item._id}>
      {item.text+" "} <span onClick={() => removeItem(item._id)}> x </span>
    </li>
  ))}
</ul>
    </div>
   
  )  
}


function App() {
  return (
    <OwnerProvider>
    <Router>
      <Switch>
        <Route exact path="/"><Login /></Route>
        <Route path="/home"><Home /></Route>
      </Switch>
    </Router>
    </OwnerProvider>
  );
}

export default App;
