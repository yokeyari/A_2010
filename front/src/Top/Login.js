import "./Login.css";
import React from "react";

export default function Login() {


  return (
    <div className="Login">
      <div className="Login-form">
        <h1>Login</h1>
        <input value="email" /><br/>
        <input value="password" />
      </div>
    </div>
  );
}