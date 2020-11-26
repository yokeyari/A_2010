import React, { useState, useEffect } from 'react';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add'
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel, MenuItem, Button, Grid } from '@material-ui/core';

import { DoneDialog } from "../Dialogs"
import { WorkspaceDataSource } from '../Main/ProductionApi';

const workspaceDataSource = new WorkspaceDataSource();

export default function SelectNewOwner(props) {

  const [newOwnerId, setNewOwnerId] = useState("")
  const owner_id = props.users.find(user_p => user_p.permission == "owner").user.id;
  const workspace = props.workspace;

  const handleChangeOwner = (event) => {
		const selected_ownerId = event.target.value;
		setNewOwnerId(selected_ownerId);
		console.log("selected new ownerId", selected_ownerId);
  }
  
  const sendNewOwner = () => {
    workspaceDataSource.updateOwner(workspace.id, newOwnerId).then(res => {
      res.json().then(json => {
        console.log(json);
      })
    })
  }

  return (
    <Grid className="invite-user-form">

      <Grid container direction="row">
        <Grid item>
          select new owner
        </Grid>
      </Grid>

      <Grid item>
        <FormControl>
          <Select onChange={handleChangeOwner}
            defaultValue={owner_id}
            inputProps={{ "aria-label": "Without label" }}>
            {props.users.map((user, idx) => {
              return (
                <MenuItem value={user.user.id} key={user.user.id}>
                  <div>
                    {user.user.name} (ID:{user.user.id})
                    {user.user.id == owner_id ? "(you)" : null}
                  </div>
                </MenuItem>)
            })}
          </Select>
        </FormControl>
      </Grid>

      <DoneDialog 
        component={<Button>送信</Button>}
        yesCallback={sendNewOwner}  />

    </Grid>
  );
}