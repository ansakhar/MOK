import * as firebase from "firebase/app";
import "firebase/firestore";
//import "firebase/auth";
//import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBJn_gsjTTmDAPwSvaNkC1yZaTFNV4J4NA",
    authDomain: "todo-beacb.firebaseapp.com",
    projectId: "todo-beacb",
    storageBucket: "todo-beacb.appspot.com",
    messagingSenderId: "304512688396",
    appId: "1:304512688396:web:b3d3ead29fe06c99c3e929",
    measurementId: "G-KY1RXBQ0HH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//const auth = firebase.auth();
//const firestore = firebase.firestore();


//export {firebase, firestore};