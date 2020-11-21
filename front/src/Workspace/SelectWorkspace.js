import React, { useContext, useState, useEffect } from "react";
import { withRouter, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import Modal from '@material-ui/core/Modal';
import { FormControl, MenuItem, InputLabel } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import UserInfoContext from '../context';
import { WorkspaceDataSource } from '../Main/ProductionApi';
import CreateWorkspace from "./CreateWorkspace";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '20px'
	},
}
));
const workspacesDataSource = new WorkspaceDataSource();

function SelectWorkspace(props) {
  const [workspaces, setWorkspaces] = useState([])
  const [open, setOpen] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { workspace_id } = useParams();
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true)
  }


  function switchWorkspace(event) {
    const workspace_id = event.target.value;
    console.log(workspace_id);
    switch (workspace_id) {
      case "home":
        setUserInfo({...userInfo, workspace_id: "home"});
        props.history.push(`/${userInfo.id}`); break;
      case "create":
        break;
      default:
        setUserInfo({...userInfo, workspace_id: workspace_id});
        props.history.push(`/${userInfo.id}/ws/${workspace_id}`);
    }
  }

  useEffect(() => {
    workspacesDataSource.getWorkspaceIndex().then(res => {
      res.json().then(json => {
        const workspaces = json.workspaces;
        console.log('load workspace list', workspaces);
        setWorkspaces(workspaces);
      })
    })
  }, [])

  const handleClose = () => {
    setOpen(false);
  } 

  const modalStyle = {
		top: '60%',
		left: '60%',
		margin: '20vh 20vh',
	};

  return (
    <div className={classes.root}>
      <Grid item>
        <FormControl>
          <InputLabel id="demo-simple-select-label">workspace</InputLabel>
          <Select onChange={switchWorkspace}
            defaultValue={workspace_id ? workspace_id : "home"}
            className={""}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"home"}>user page</MenuItem>
            {
                workspaces.map((ws_p) => (
                <MenuItem value={ws_p.workspace.id} key={ws_p.workspace.id}>{ws_p.workspace.name} ({ws_p.permission})</MenuItem>
                ))
            }
            <MenuItem value={"create"} onClick={handleOpen}>create workspace</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
        <Fade in={open}>
          <div style={modalStyle}>
            <CreateWorkspace onClose={handleClose}/>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default withRouter(SelectWorkspace);