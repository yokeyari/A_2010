import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Redirect, useParams, withRouter } from 'react-router-dom';
import { Button, Input, TextField, FilledInput, OutlinedInput, InputLabel, FormControl } from "@material-ui/core";

import { UserInfoContext, ReloaderContext } from './context';
import { UserDataSource, WorkspaceDataSource } from "./Main/ProductionApi";

const userDataSource = new UserDataSource();
const workspaceDataSource = new WorkspaceDataSource();


export default function InviteWS(props) {
  const { userInfo } = useContext(UserInfoContext);
  const { setReload } = useContext(ReloaderContext);
  const { token } = useParams();
  const { state, setState } = useState("needCheck")

  useEffect(() => {
    if (userInfo.isLogin) {
      workspaceDataSource.getWorkspaceByToken(token).then(res => {
        if (res.statusText == 'OK') {
          res.json().then(workspace => {
            workspaceDataSource.joinWorkspace({ workspace_id: workspace.id, perm: "general" }).then(res => {
              setReload(true);
              props.history.push(`/${userInfo.id}/ws/${workspace.id}`);
            })
          })
        } else {
          setState("no")
        }
      })
    }
  })

  if (userInfo.endCheck) {
    if (userInfo.isLogin) {
      if (state == "no") return <h1>Not Found</h1>
      else return "pending ..."
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
