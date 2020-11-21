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

import { WorkspaceDataSource } from "../Main/ProductionApi";
import UserInfoContext from "../context";
import Transition from "../Transition";
import InviteUserForm from "./InviteUserForm";

const workspaceDataSource = new WorkspaceDataSource();

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 300,
		//flexGrow: 1,
		maxHeight: 500,
		overflow: 'auto',
		margin: theme.spacing(1),
		textAlign: 'left',
		//backgroundColor: "#ADD8E6"

	},
	card: {
		maxWidth: 600,
		maxHeight: 500,
		overflow: 'auto',
		margin: theme.spacing(2),
		padding: theme.spacing(2),
		//backgroundColor:"#D2B48C",
	},
	button: {
		marginLeft: 'auto',
	}
}
));


export default function CreateWorkspace(props) {
	const [state, setState] = useState({
		name: "",
		to: "",
		isLoaded: false
  })
	const { userInfo } = useContext(UserInfoContext);
	const [users, setUsers] = useState([{ user_id: userInfo.id, permission: userInfo.permission }]);
	const classes = useStyles();


	const handleClick = () => {

		trackPromise(
			// ?API??
			workspaceDataSource.createWorkspace({ name: state.name, users: users })
				.then(res => {
					if (res.statusText == "OK") {
						res.json()
							.then(workspace => {
								console.log("create workspace", workspace);
								setState({ ...state, to: `/${userInfo.id}/ws/${workspace.id}`, isLoaded: true });
								props.onClose();
							})
							
					} else {
						res.json()
							.then(error => {
								console.log(error);
							})
					}
				}));
  }
  

  const handleChangeUserId = (i, event) => {
    const values = [...users];
	values[i].user_id = parseInt( event.target.value );
	console.log(typeof(values[i].user_id));
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
				<h2 id="">Create New Workspace</h2>
				<div>
					<TextField type="text" id="ws-input" className={classes.root}
						label="Workspace Name"
						multiline
						onChange={e => { setState({ ...state, name: e.target.value }) }} value={state.name} />

          <InviteUserForm users={users} handleChangeUserId={handleChangeUserId} handleChangePermission={handleChangePermission} handleAdd={handleAdd} handleRemove={handleRemove} />

					<Transition to={state.to} ok={state.isLoaded}>
						<Button className={classes.button} id="submit"
							variant="contained" color="primary" endIcon={<CreateIcon />}
							onClick={handleClick}>
							作成
						</Button>
					</Transition>
				</div>
			</Card>
		</div>
	)
}