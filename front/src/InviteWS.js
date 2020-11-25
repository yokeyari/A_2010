import React, { useContext, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Redirect, useParams } from 'react-router-dom';
import { Button, Input, TextField, FilledInput, OutlinedInput, InputLabel, FormControl } from "@material-ui/core";

import { UserInfoContext } from './context';
import { UserDataSource, WorkspaceDataSource } from "./Main/ProductionApi";

const userDataSource = new UserDataSource();
const workspaceDataSource = new WorkspaceDataSource();


export default function InviteWS(props) {
  const { userInfo } = useContext(UserInfoContext);
  const { token } = useParams();

  if (userInfo.endCheck) {
    if (userInfo.isLogin) {
      workspaceDataSource.getWorkspaceByToken(token).then(res => {
        if (res.statusText == 'OK') {
          res.json().then(workspace => {
            console.log(workspace)
            workspaceDataSource.addUser(workspace.id, {users: [ [userInfo.id, "general"] ]})
            props.history.push(`/${userInfo.id}/ws/${workspace.id}`);
          })
        } else {
          
        }
      })
      return <h1>Not Found</h1>
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
