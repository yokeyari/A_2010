import React, { useState } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import logo from '.././logo.png';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  login: {
    marginLeft: 'auto'
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Button >
          <img src={logo} className="header-logo" alt="memotube" />
        </Button>
        {/*<Typography src={logo} variant="h6" className={classes.title}>
      MemoTube 
  </Typography>*/}
        <Button color="inherit" className={classes.login}>Login</Button>
      </Toolbar>
    </AppBar>
  );
}



    /*<div className="Top">
      <div className="Top-form">
        <h2>Login</h2>
        <input value="email"/>
        <input value="password"/>
      </div>
    </div>*/
    /*<header className="App-header">
      <a
        className="header-link"
        href="/home"
      >
        <img src={logo} className="header-logo" alt="memotube"/>
      </a>
      <a href="/login"  className="App-login">
          Login
      </a>
    </header>*/