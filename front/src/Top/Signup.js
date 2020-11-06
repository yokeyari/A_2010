import "./Login.css";
import React, { useContext, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Input, TextField } from "@material-ui/core";

import { UserDataSource } from "../Main/ProductionApi";
import UserInfoContext from "../context";
import Transition from "../Transition";
import transitions from "@material-ui/core/styles/transitions";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const userDataSource = new UserDataSource();

export default function Signup() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [state, setState] = React.useState({
    to: "",
    isLoaded: false,
    isLoading: false
  })
  const { userInfo, setUserInfo } = useContext(UserInfoContext);


  // const { userInfo } = useContext(UserInfoContext);

  const handleSingup = () => {
    if (true) {
      // 本当はここにバリデーションをつける？ 
      setState({ ...state, isLoading: true });
      // userDataSource.createUser({ name, email, password, passwordRetype })
      userDataSource.createUser({ name, email, password, passwordRetype })
        .then(res => {
          if (res.statusText == "OK") {
            res.json()
              .then(user => {
                console.log(user);
                // console.log("getPage", page.page);
                setUserInfo(user.user);
                setState({ to: `/${user.user.id}/`, isLoaded: true, isLoading: false });
                // props.onClose();
              })
          } else {
            // TODOここに作れなかったときの処理．エラーを表示させる
            setState({ ...state, isLoading: false, isLoaded: false })
            // TODOいい感じの表示をしたい
          }
        });
    }
  }

  return (
    <div>
     <Container component="main" maxWidth="xs">
     <CssBaseline />
     <div className={classes.paper}>
       <Avatar className={classes.avatar}>
         <LockOutlinedIcon />
       </Avatar>
       <Typography component="h1" variant="h5">
         Sign up
       </Typography>
       <form className={classes.form} noValidate>
         <Grid container spacing={2}>
           <Grid item xs={12} sm={6}>
             <TextField
               autoComplete="fname"
               name="firstName"
               variant="outlined"
               required
               fullWidth
               id="Name"
               label="Name"
               autoFocus
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               variant="outlined"
               required
               fullWidth
               id="email"
               label="Email Address"
               name="email"
               autoComplete="email"
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               variant="outlined"
               required
               fullWidth
               name="password"
               label="Password"
               type="password"
               id="password"
               autoComplete="current-password"
               value={password} onChange={(e) => setPassword(e.target.value)}
          helperText={password.length <= 5 ? 'パスワードは6文字以上にしてください!' : ' '}
             />
           </Grid>
           <Grid item xs={12}>
           <TextField
            variant="outlined"
            required
            fullWidth
          id="pass2"
          label="Retype Password"
          type="password"
          // autoComplete="current-password"
          value={passwordRetype} onChange={(e) => setPasswordRetype(e.target.value)}
          //error={passwordRetype.length <= 5}
          helperText={passwordRetype.length <= 5 ? 'パスワードは6文字以上にしてください!' : ' '}
        />
        </Grid>
         </Grid>
         <Transition to={state.to} ok={state.isLoaded} isLoading={state.isLoading}>
          <Button className={classes.submit}　fullWidth　color="primary"　id="submit" variant="contained" onClick={handleSingup}>Sign Up</Button>
        </Transition>
         <Grid container justify="flex-end">
           <Grid item>
               <Link to="./login" variant="body2">
                Already have an account? Log in
              </Link>
           </Grid>
         </Grid>
       </form>
     </div>
   </Container>
   </div>
  );
}
{/*
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
</div>*/}