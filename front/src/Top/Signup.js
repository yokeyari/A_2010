import "./Login.css";
import React from "react";

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default function Signup() {


  return (
    <div className="Login">
      <div className="Login-form">
        <h1>Signup</h1>
        <input value="email" /><br/>
        <input value="password" /><br/>
        
        <Link to='/'>
          <button id="submit" variant="contained" >submit</button>
        </Link>
        
      </div>
    </div>
  );
}