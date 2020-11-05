import "./Login.css";
import React, { useContext, useState } from "react";

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Input, TextField } from "@material-ui/core";

import { UserDataSource } from "../Main/ProductionApi";
import UserInfoContext from "../context";
import Transition from "../Transition";
import transitions from "@material-ui/core/styles/transitions";

const userDataSource = new UserDataSource();

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [state, setState] = React.useState({
    to: "",
    isLoaded: false,
    isLoading: false
  })
  // const { userInfo } = useContext(UserInfoContext);

  const handleSingup = () => {
    if (true) {
      // 本当はここにバリデーションをつける？ 
      setState({ ...state, isLoading: true });
      // userDataSource.createUser({ name, email, password, passwordRetype })
      // デバッグ用で入力を直接指定しているはずなのに
      // 0: "Password can't be blank"
      // 1: "Password is too short (minimum is 6 characters)"
      // 2: "Name can't be blank"
      // 3: "Email can't be blank"
      // 4: "Email is invalid"
      // のエラーが返ってくる (出来なかった1)
      userDataSource.createUser({ name: "hogeh", email: "hhb@cccc.com", password: "qwerty", password_confirmation: "qwerty" })
        .then(res => {
          console.log(res)
        });
    }
  }

  return (
    <div className="Signup">
      <div className="Signup-form">
        <h1>Signup</h1>
        <p>name</p>
        <TextField required id="mail" label="Required" defaultValue="name" value={name} onChange={(e) => { setName(e.target.value) }} />
        <p>mail address</p>
        <TextField required id="name" label="Required" defaultValue="e-mail" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <p>password</p>
        <TextField
          id="pass"
          label="Password"
          type="password"
          // autoComplete="current-password"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <p>retype password</p>
        <TextField
          id="pass2"
          label="Retype Password"
          type="password"
          // autoComplete="current-password"
          value={passwordRetype} onChange={(e) => setPasswordRetype(e.target.value)}
        />

        <Transition to={state.to} ok={state.isLoaded} isLoading={state.isLoading}>
          <Button id="submit" variant="contained" onClick={handleSingup}>submit</Button>
        </Transition>

      </div>
    </div>
  );
}