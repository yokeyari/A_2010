import React, { useContext } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import img from '.././intro.jpg';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import GoogleLogin from "../Auth/GoogleLogin";
import {
  BrowserRouter as Router,
  useLocation,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import queryString from 'query-string';


import Login from './Login';
import Promotion from './Promotion';
import "./Login.css";
import { UserDataSource } from '../Main/ProductionApi';
import Signup from "./Signup";
import {UserInfoContext} from '../context';
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
  },
  image: {
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    // backgroundColor: "#87cefa",
    //backgroundColor: "#4FC3F7",
    //padding:"0 5%",
    //margin:"auto",
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


const UserAPI = new UserDataSource();

function Top() {
  const classes = useStyles();
  // console.log(useRouteMatch());
  const { userInfo } = useContext(UserInfoContext);
  const location = useLocation();
  // const redirectURL=location.state ? location.state.redirectURL : null;
  const qs = queryString.parse(location.search);
  const redirectURL =  qs ? "/ws/"+qs.token : null; 


  // UserAPI.loginUser(user)
  // UserAPI.createUser(user)
  // UserAPI.updateUser(user)
  // UserAPI.deleteUser(user)
  // UserAPI.getUser(user_id)

  if (userInfo.endCheck == false) {
    return (
      null
    )
  } else {
    if (userInfo.id !== "") {
      return (
        <Redirect to={`/${userInfo.id}/`} />
      )
    } else {
      return (
        <div>
          <Grid container className={classes.root}>
            <CssBaseline />
            {/*<Hidden xsDown>*/}
            <Grid item xs={false} sm={4} md={7} className={classes.image} >
              <Promotion />
            </Grid>
            {/*</Hidden>*/}

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box textAlign='center'>
                  <GoogleLogin redirectURl={redirectURL} />
                </Box>
                <Switch>
                  <Route exact path='/'></Route>

                  <Route exact path='/login'>
                      <Login redirectURl={redirectURL}/>
                  </Route>

                  <Route exact path='/signup'>
                      <Signup />
                  </Route>
                </Switch>
            </Grid>
          </Grid>
        </div>
      );
    }
  }


}



export default Top;
