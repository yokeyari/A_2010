import "./Top.css";
import React from "react";

class Top extends React.Component {
  constructor(){
    super();
    this.state= {}
  }
  render(){
    return (
      <div className="Top">
        <div className="Top-form">
          <h2>Login</h2>
          <input value="email"/>
          <input value="password"/>
        </div>
      </div>
    );
  }
}

export default Top;
