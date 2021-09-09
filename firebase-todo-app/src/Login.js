import './App.css';
import React, { useState } from 'react';
//import { getFirestore, collection, getDocs, addDoc} from 'firebase/firestore/lite';
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
//import app from './db'

function Banner() {
    return (
      <h1>Todo Example with React</h1>
    )
  }

function Login(){
    const [userEmail, setUserEmail] = useState(""); 
    const [userPassword, setUserPassword] = useState("");
  
    //tarkista tunnus ja salasana
    const history = useHistory();
    
    function handleLogin(email, password) {
    const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('signed in:', user);
    history.push('/home');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode, errorMessage);
  });
}

    // add a new user
    function handleRegister(email, password){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert(`Registration completed successfully.`);
        console.log('new user', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
    }

    return (
      <div><Banner/>
      <form>
        <table>
          <tbody>
            <tr>
              <td>Email:</td>
              <td><input type="email" value={userEmail} autoComplete="username" onChange={event => setUserEmail(event.target.value)}/></td>
            </tr>
            <tr>
              <td>Password:</td>
              <td><input type="password" value={userPassword} autoComplete="current-password" onChange={event => setUserPassword(event.target.value)}/></td>
            </tr>
            <tr>
              <td><input type="button" value="Login" onClick={() => handleLogin(userEmail, userPassword)}/></td>
              <td><input type="button" value="Register" onClick={() => handleRegister(userEmail, userPassword)}/></td>
            </tr>
          </tbody>
        </table>
      </form>
      </div>
    )
  }
  export default Login;