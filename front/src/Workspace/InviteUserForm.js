import React, { useState, useEffect } from 'react';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add'
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel, MenuItem, Button, Grid } from '@material-ui/core';


function InviteUserForm(props) {

  const [fields, setFields] = useState([{user_id: null, permission: null}]);

  useEffect(() => {
  })

  return (
    <Grid className="invite-user-form">
      <Grid container direction="row">
        <Grid item>
          workspace user
        </Grid>
        <Grid item>
          <Button type="button" startIcon={<Add />} onClick={() => props.handleAdd()} />
        </Grid>
      </Grid>

      {props.fields.map((field, idx) => {
        return (
          <div>
            <Grid key={`${field}-${idx}`}>
              <Grid container direction="row">

                <Grid item>
                  <FormControl>
                    <Select onChange={e => props.handleChangePermission(idx, e)}
                      defaultValue={field.permission ? field.permission : "general"}
                      inputProps={{ "aria-label": "Without label" }}>
                      <MenuItem value="guest" key={0}>guest</MenuItem>
                      <MenuItem value="general" key={1}>general</MenuItem>
                      <MenuItem value="owner" key={2}>owner</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item>
                  <TextField
                    type="text"
                    placeholder="Enter user_id"
                    defaultValue={field.user_id}
                    onChange={e => props.handleChangeUserId(idx, e)}
                  />
                  <Button type="button" startIcon={<DeleteIcon />} onClick={() => props.handleRemove(idx)} />
                </Grid>

              </Grid>
            </Grid>
          </div>
        );
      })}

    </Grid>
  );
}

export default InviteUserForm