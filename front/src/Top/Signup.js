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
      userDataSource.loginUser({ email, password })
        .then(res => {
          if (res.statusText == "OK") {
            res.json()
              .then(user => {
                // console.log("getPage", page.page);
                setState({ to: `/${user.user.id}/`, isLoaded: true, isLoading: false });
                // props.onClose();
              })
          } else {
            // TODOここにログインできなかったときの処理
            setState({ ...state, isLoading: false, isLoaded: false })
            // TODOいい感じの表示をしたい
          }
        });
    }
  }

  return (
    <div className="Login">
      <div className="Login-form">
        <h1>Signup</h1>
        mail address
        <TextField required id="standard-required" label="Required" defaultValue="e-mail" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          // autoComplete="current-password"
          value={password} onChange={(e) => setPassword(e.target.value) }
        />
        <TextField
          id="standard-password-input"
          label="Retype Password"
          type="password"
          // autoComplete="current-password"
          value={passwordRetype} onChange={(e) => setPasswordRetype(e.target.value) }
        />

        <Transition to={state.to} ok={state.isLoaded} isLoading={state.isLoading}>
          <Button id="submit" variant="contained" onClick={handleSingup}>submit</Button>
        </Transition>

      </div>
    </div>
  );
}