import './App.css';
import React, { useState } from 'react';
import { getFirestore, collection, getDocs, addDoc} from 'firebase/firestore/lite';
import { useHistory } from "react-router-dom";
//import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import app from './db'

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
    
    const handleLogin = async (checkEmail, checkPassword) =>{
    const db = getFirestore(app);
    const data = await getDocs(collection(db,"users"));       
    const kayttaja = data.docs.find(doc => (doc.data().email === checkEmail)&&(doc.data().password === checkPassword));
    if (kayttaja) history.push('/home')
    else alert(`User is not found, please try again or register.`);
    }

    // add a new user
const handleRegister = async (newEmail, newPassword) => {
    // add user to Firebase
    let newUser =  { email: newEmail, password: newPassword };
    const db = getFirestore(app);

    //checking if the user is unique
    const data = await getDocs(collection(db,"users"));       
    const kayttaja = data.docs.find(doc => (doc.data().email === newEmail));
    if (!kayttaja) {
    let doc = await addDoc(collection(db, 'users'), newUser);

    // get added doc id and set id to newItem
    newUser.id = doc.id;//???
    alert(`Registration completed successfully.`);
    }
    else alert(`User with the same email is already registered.`);

    // modify newUser email and password to ""
    setUserEmail("");
    setUserPassword("");
  }

    return (
      <div><Banner/>
      <form>
        <table>
          <tbody>
            <tr>
              <td>Email:</td>
              <td><input type="email" value={userEmail} onChange={event => setUserEmail(event.target.value)}/></td>
            </tr>
            <tr>
              <td>Password:</td>
              <td><input type="password" value={userPassword} onChange={event => setUserPassword(event.target.value)}/></td>
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