import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom"
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel, MenuItem, Button, Grid, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add'
import PersonIcon from '@material-ui/icons/Person';

import { WorkspaceDataSource } from "../Main/ProductionApi";
import { ReloaderContext, UserInfoContext } from "../context";
import ChangeUserPermission from "./ChangeUserPermission";
import EditWsConfigModal from "./Modals/EditWsConfigModal";
import AddUser from "./AddUser";
import SelectNewOwner from "./SelectNewOwner";
import { DeleteDialog, Dialog } from "../Dialogs"

const workspaceDataSource = new WorkspaceDataSource();

const higherSuper = { "guest": false, "general": false, "sup": true, "owner": true };
const onlyOwner = { "guest": false, "general": false, "sup": false, "owner": true };

export default function WorkspaceConfig(props) {

  const { reloader, setReload } = useContext(ReloaderContext);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const history = useHistory();
  const workspace = JSON.parse(JSON.stringify(props.workspace));
  const users = workspace.users.concat();


  // console.log(props.workspace)
  // console.log(users)

  const handleDeleteWs = () => {
    workspaceDataSource.deleteWorkspace(workspace.id)
      .then(() => {
        history.push(`/${userInfo.id}/`);
        setReload(true);
      })
  }

  const user_list =
    <div>
      {workspace.users.map(user_p => {
        return (
          <Grid container direction="row">
            <Grid item>
              <PersonIcon />
            </Grid>
            <Grid item>
              {user_p.user.name} ({user_p.permission})
            </Grid>
          </Grid>
        )
      })}
    </div>

  const makeIngiteURL = () => "https://memotube.xyz/ws/" + workspace.token
  const InviteURLDialog =
    <div color="secondary">
      <EditWsConfigModal
        buttonComponent={<Button>招待URL発行</Button>}
        mainComponent={
          <div>
            <h3>{"以下のURLを招待したいユーザーに送ってください"}</h3>
            {makeIngiteURL()}
          </div>}
      />
    </div>


  return (
    <div>
      <h1>{workspace.name}</h1>

      <EditWsConfigModal
        buttonComponent={<Button>ユーザー一覧</Button>}
        mainComponent={user_list}
      />

      {higherSuper[userInfo.permission] ?
        InviteURLDialog
        : null}

      {higherSuper[userInfo.permission] ?
        <EditWsConfigModal
          buttonComponent={<Button>ユーザー追加</Button>}
          mainComponent={<AddUser workspace_id={workspace.id} />} />
        : null}

      {onlyOwner[userInfo.permission] ?
        <EditWsConfigModal
          buttonComponent={<Button>権限変更</Button>}
          mainComponent={<ChangeUserPermission users={users} workspace={workspace} />}
        />
        : null}

      {onlyOwner[userInfo.permission] ?
        <EditWsConfigModal
          buttonComponent={<Button>オーナー変更</Button>}
          mainComponent={<SelectNewOwner users={users} workspace={workspace} />} />
        : null}


      {/* 改行がしたかった... */}
      <br /><br /><br />


      {onlyOwner[userInfo.permission] ?
        <DeleteDialog
          modalMessage={`「${props.workspace.name}」を削除しますか?`}
          component={<Card style={{ color: "white", backgroundColor: "#EF501F" }} >ワークスペースを削除</Card>}
          yesCallback={handleDeleteWs}
        />
        : null}


    </div>
  )
}