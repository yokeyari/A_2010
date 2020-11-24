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
import {UserInfoContext} from "../context";
import Transition from "../Transition";
import InviteUserForm from "./InviteUserForm";
import SelectNewOwner from "./SelectNewOwner"

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


export default function EditWorkspace(props) {
	const [state, setState] = useState({
		name: props.initFields.name,
		to: "",
		isLoaded: false
	})
	// const [fields, setFields] = useState(props.initFields.users);
	const [fields, setFields] = useState( props.initFields.users.filter(user => user.permission!="owner") ); //owner以外のusersを入力欄の初期値にする
	const { userInfo } = useContext(UserInfoContext);
	const [newOwnerId, setNewOwnerId] = useState("")
	const classes = useStyles();

	const owner_id = props.initFields.users.find(user_p => user_p.permission == "owner").user_id;

	const handleSubmit = () => {
		// console.log("aaaaaa", newOwnerId);

		trackPromise(
			workspaceDataSource.updateWorkspace({name: state.name, users: fields, id: userInfo.workspace_id})
				.then(res => {
					if (res.statusText == "OK") {
						res.json()
							.then(workspace => {
								setState({ ...state, to: `/${userInfo.id}/ws/${workspace.id}`, isLoaded: true });
								props.onClose();
							})
					} else {
						
					}
				})
				// .then(() => {
				// 	// console.log("new ownerId", newOwnerId);
				// 	// console.log("workspace_id", userInfo.workspace_id);
				// 	// workspaceDataSource.updateOwner({user_id: newOwnerId, workspace_id: userInfo.workspace_id})
				// })
		);
		console.log("new ownerId", newOwnerId);
		console.log("workspace_id", userInfo.workspace_id);
		workspaceDataSource.updateOwner(newOwnerId, userInfo.workspace_id)
	}


	const handleChangeUserId = (i, event) => {
		const values = [...fields];
		values[i].user_id = event.target.value;
		setFields(values);
	}

	const handleChangePermission = (i, event) => {
		const values = [...fields];
		values[i].permission = event.target.value;
		setFields(values);
	}

	const handleAdd = () => {
		const values = [...fields];
		values.push({ user_id: null, permission: null });
		setFields(values);
	}

	const handleRemove = (i) => {
		const values = [...fields];
		values.splice(i, 1);
		setFields(values);
	}

	const handleCloseWs = () => {
		workspaceDataSource.deleteWorkspace(userInfo.workspace_id)
			.then(() => {
				setState({ ...state, to: `/${userInfo.id}/`, isLoaded: true });
			})
	}

	const handleChangeOwner = (event) => {
		const selected_ownerId = event.target.value;
		setNewOwnerId(selected_ownerId);
		console.log("selected new ownerId", selected_ownerId);
	}

	console.log(fields);

	return (
		<div>
			<Card>
				<h2 id="">Edit Workspace</h2>
				<div>
					{/* <h1>workspace token: {props.workspace.token}</h1> */}

					<TextField type="text" id="ws-input" className={classes.root}
						label="Workspace Name"
						multiline
						onChange={e => { setState({ ...state, name: e.target.value }) }} value={state.name} />

					<div>owner: {owner_id}</div>

					<InviteUserForm users={fields} handleChangeUserId={handleChangeUserId} handleChangePermission={handleChangePermission} handleAdd={handleAdd} handleRemove={handleRemove} />

					{userInfo.permission == "owner" ? <SelectNewOwner users={props.initFields.users} handleChangeOwner={handleChangeOwner} /> : <></>}

					<Transition to={state.to} ok={state.isLoaded}>
						<Button className={classes.button} id="submit"
							variant="contained" color="primary" endIcon={<CreateIcon />}
							onClick={handleSubmit}>
							change
						</Button>
					</Transition>

					{userInfo.permission == "owner" ? <Button onClick={handleCloseWs}>close this workspace</Button> : <></>}
				</div>
			</Card>
		</div>
	)
}