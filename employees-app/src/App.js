import React, {useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'

function Employee(props) {
  return (
    <div className="Employee">
    <img src={props.employee.image} alt="foto"></img>
    <p className="Employee-Names">{props.employee.last_name} {props.employee.first_name}</p>
    <div>{props.employee.title} @ {props.employee.department}</div>
    <div>{props.employee.email}</div>
    <div>{props.employee.phone}</div>
    </div>
  )
}

function App() {

  const [employees, setEmployees] = useState([])
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then(response => {
        setEmployees(response.data)
      })
  }, [])

/*  const employeeItems = employees.map((employee,index) =>
  <li key={index}>{employee.last_name} {employee.first_name}</li>
);*/
const employeeItems = employees.map((employee,index) =>
  <Employee key={index} employee={employee}/>
);

  return (
    <div className="App">
    <ul>
      {employeeItems}
    </ul>
  </div>
);
}

export default App;
