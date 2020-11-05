import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";


import Login from './Login';
import Promotion from './Promotion';
import "./Login.css";
import { UserDataSource } from '../Main/ProductionApi';
import Signup from "./Signup";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    //backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    //backgroundColor:
    //theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundColor: "#87cefa",

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    Color: "#ffffff"
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

function Top() {
  const classes = useStyles();
  // console.log(useRouteMatch());
  const path = useRouteMatch().path;

  const UserAPI = new UserDataSource();

  // UserAPI.loginUser(user)
  // UserAPI.createUser(user)
  // UserAPI.updateUser(user)
  // UserAPI.deleteUser(user)
  // UserAPI.getUser(user_id)

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Hidden xsDown>
          <Grid item xs={false} sm={4} md={7} className={classes.image} >
            <Promotion />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {path == "/login" ?
            <Login />
            :
            <Signup />
          }
        </Grid>
      </Grid>


      <Promotion />
    </div>
  );
}



export default Top;
