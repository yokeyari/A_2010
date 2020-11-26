import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CardActions } from "@material-ui/core";
import { trackPromise } from "react-promise-tracker";

import { WorkspaceDataSource, UserDataSource } from "../Main/ProductionApi";
import { UserInfoContext, ReloaderContext } from "../context";
import Transition from "../Transition";
import InviteUserForm from "./InviteUserForm";
import { DoneDialog } from  "../Dialogs"

const workspaceDataSource = new WorkspaceDataSource();
const userDataSource = new UserDataSource();


export default function CreateWorkspace(props) {

  const [users, setUsers] = useState([]);
  const workspace_id = props.workspace_id;


  const sendNewUser = () => {
    const user_p_list = users.map(user => [user.user_id, user.permission])
    workspaceDataSource.addUser(workspace_id, user_p_list).then(res => {
      if (res.statusText == "OK") {
        window.location.reload();
      } else {

      }
    })
  }


  const handleChangeUserId = (i, event) => {
    const values = [...users];
    values[i].user_id = parseInt(event.target.value);
    console.log(typeof (values[i].user_id));
    setUsers(values);
  }

  const handleChangePermission = (i, event) => {
    const values = [...users];
    values[i].permission = event.target.value;
    setUsers(values);
  }

  const handleAdd = () => {
    const values = [...users];
    values.push({ value: null, permission: null });
    setUsers(values);
  }

  const handleRemove = (i) => {
    const values = [...users];
    values.splice(i, 1);
    setUsers(values);
  }


  return (
    <div>
      <Card>
        <h2 id="">ユーザーを追加</h2>
        <div>
          <InviteUserForm users={users} handleChangeUserId={handleChangeUserId} handleChangePermission={handleChangePermission} handleAdd={handleAdd} handleRemove={handleRemove} />
        </div>
      </Card>
      <DoneDialog 
        component={<Card>送信</Card>}
        yesCallback={sendNewUser} />
    </div>
  )
}