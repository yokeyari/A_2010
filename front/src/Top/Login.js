import "./Login.css";
import React, { useContext, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Input, TextField, FilledInput, OutlinedInput, InputLabel, FormControl } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import { UserDataSource } from "../Main/ProductionApi";
import {UserInfoContext} from "../context";
import Transition from "../Transition";

const userDataSource = new UserDataSource();
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',

  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = React.useState({
    to: "",
    isLoaded: false,
    isLoading: false
  })
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  // const { userInfo } = useContext(UserInfoContext);

  const handleLogin = () => {
    if (true) {
      // 本当はここにバリデーションをつける？ 
      setState({ ...state, isLoading: true });
      userDataSource.loginUser({ email, password })
        .then(res => {
          if (res.statusText == "OK") {
            res.json()
              .then(user => {
                console.log(user);
                // console.log("getPage", page.page);
                setUserInfo({ ...userInfo, endCheck: true, id: user.id, name: user.name, isLogin: true });
                if(props.redirectURL){
                  setState({ to: props.redirectURL, isLoaded: true, isLoading: false });
                }else{
                  setState({ to: `/${user.id}/`, isLoaded: true, isLoading: false });
                }

                // localStorage.setItem('user', JSON.stringify(user.user));
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
  const handleClickShowPassword = () => {
    setValues({ ...password, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log In
      </Typography>

      <form className={classes.form} noValidate>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email} onChange={(e) => { setEmail(e.target.value) }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />

        <Transition to={state.to} ok={state.isLoaded} isLoading={state.isLoading}>
          <Button id="submit" fullWidth color="primary" variant="contained" onClick={handleLogin}>Log In</Button>
        </Transition>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="./signup" variant="body2">
              Don't you have an account yet? Sign up
              </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
