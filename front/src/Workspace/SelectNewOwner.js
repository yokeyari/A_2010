import React, { useState, useEffect } from 'react';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add'
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel, MenuItem, Button, Grid } from '@material-ui/core';

export default function SelectNewOwner(props) {

  const owner_id = props.users.find(user_p => user_p.permission == "owner").user.id;

  return (
    <Grid className="invite-user-form">

      <Grid container direction="row">
        <Grid item>
          select new owner
        </Grid>
      </Grid>

      <Grid item>
        <FormControl>
          <Select onChange={e => props.handleChangeOwner(e)}
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

    </Grid>
  );
}