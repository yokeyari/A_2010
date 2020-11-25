import React, { useContext, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Redirect, useParams } from 'react-router-dom';
import { Button, Input, TextField, FilledInput, OutlinedInput, InputLabel, FormControl } from "@material-ui/core";

import { UserInfoContext } from './context';
import { UserDataSource } from "./Main/ProductionApi";

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
export default function InviteWS(props) {
  const classes = useStyles();
  const { userInfo } = useContext(UserInfoContext);
  const { token } = useParams();

  if (userInfo.endCheck) {
    if (userInfo.isLogin) {
      return null
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login",
            search: "?token=" + token
          }}
        />
      )
    }
  } else {
    return null;
  }

}
