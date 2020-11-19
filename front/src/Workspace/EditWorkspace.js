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


export default function EditWorkspace(props) {
	const [state, setState] = useState({
		name: "",
		to: "",
		isLoaded: false
	})
	const [fields, setFields] = useState([{ user_id: null, permission: null }]);
	const { userInfo } = useContext(UserInfoContext);
  const classes = useStyles();
  

	const handleClick = () => {

		trackPromise(
			workspaceDataSource.updateWorkspace({ name: state.name, users: fields })
				.then(res => {
					if (res.statusText == "OK") {
						res.json()
							.then(workspace => {
								setState({ ...state, to: `/${userInfo.id}/ws/${workspace.id}`, isLoaded: true });
								props.onClose();
							})
					} else {
						
					}
				}));
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
		values.push({ value: null, permission: null });
		setFields(values);
	}

	const handleRemove = (i) => {
		const values = [...fields];
		values.splice(i, 1);
		setFields(values);
	}

	const handleCloseWs = () => {
		workspaceDataSource.deleteWorkspace(userInfo.ws_id)
		.then(() => {
			setState({ ...state, to: `/${userInfo.id}/`, isLoaded: true });
		})
	}

  console.log(fields);

	return (
		<div>
			<Card>
				<h2 id="">Edit Workspace</h2>
				<div>
					<TextField type="text" id="ws-input" className={classes.root}
						label="Workspace Name"
						multiline
						onChange={e => { setState({ ...state, name: e.target.value }) }} value={state.name} />

					<InviteUserForm fields={props.initFields} handleChangeUserId={handleChangeUserId} handleChangePermission={handleChangePermission} handleAdd={handleAdd} handleRemove={handleRemove} />

					<Transition to={state.to} ok={state.isLoaded}>
						<Button className={classes.button} id="submit"
							variant="contained" color="primary" endIcon={<CreateIcon />}
							onClick={handleClick}>
							change
						</Button>
					</Transition>

					<Button onClick={handleCloseWs}>close this workspace</Button>
				</div>
			</Card>
		</div>
	)
}