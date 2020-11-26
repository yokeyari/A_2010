import React, { useState, useEffect } from 'react';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import PersonIcon from '@material-ui/icons/Person';
import Add from '@material-ui/icons/Add'
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel, MenuItem, Button, Grid } from '@material-ui/core';

import { DoneDialog } from "../Dialogs";
import { WorkspaceDataSource } from '../Main/ProductionApi';


const workspaceDataSource = new WorkspaceDataSource();

function ChangeUserPermission(props) {

  const [users, setUsers] = useState(props.users);
  const name = props.workspace.name;
  const workspace_id = props.workspace.id;

  useEffect(() => {
    setUsers(props.users);
  }, [])

  const handleChangePermission = (i, event) => {
		const values = [...users];
		values[i].permission = event.target.value;
		setUsers(values);
  }

  const sendNewPermissions = () => {
    const user_p_list = users.map(user => [user.user.id, user.permission]).filter(user_p => user_p[1]!="owner");
    workspaceDataSource.updateWorkspace({id: workspace_id, name: name, users: user_p_list})
  }


  return (
    <Grid>
      {users.map((user_p, idx) => {
        return (
          <div>
            <Grid key={`${user_p.user.id}-${idx}`}>
              <Grid container direction="row">

                <Grid item>
                  <PersonIcon />
                  {user_p.user.name}
                </Grid>

                <Grid item>
                  <Card>
                    {user_p.permission != "owner" ?
                      <FormControl>
                        <Select onChange={e => handleChangePermission(idx, e)}
                          defaultValue={user_p.permission ? user_p.permission : "general"}
                          inputProps={{ "aria-label": "Without label" }}>
                          <MenuItem value="guest" key={0}>guest</MenuItem>
                          <MenuItem value="general" key={1}>general</MenuItem>
                          <MenuItem value="sup" key={2}>super</MenuItem>
                        </Select>
                      </FormControl> : 
                      <Card>owner</Card> }
                  </Card>
                </Grid>

              </Grid>
            </Grid>
          </div>
        );
      })}
      <DoneDialog
        component={<Button>決定</Button>}
        yesCallback={sendNewPermissions} />
    </Grid>
  );
}

export default ChangeUserPermission