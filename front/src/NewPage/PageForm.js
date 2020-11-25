import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CardActions, Input } from "@material-ui/core";
import { trackPromise } from "react-promise-tracker";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { PageDataSource } from "./../Main/ProductionApi";
import {UserInfoContext} from "../context";
import Transition from "../Transition";

const pageDataSource = new PageDataSource();

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
	},
	input: {
		display: 'none',
	},
}
));

function validateURL(url) {

	return true;
}


export default function NewPageForm(props) {
	const [state, setState] = useState({
		url: "",
		title: "",
		to: "",
		isLoaded: false
	})
	// const [url, setUrl] = useState("");
	// const [title, setTitle] = useState("");
	const { userInfo } = useContext(UserInfoContext);

	const classes = useStyles();



	const handleClick = () => {
		if (!validateURL(state.url)) {
			console.error("not support url");
			return false;
		}

		trackPromise(
			// 要API確認
			pageDataSource.createPage({ url: state.url, title: state.title, user_id: userInfo.id, workspace_id: userInfo.workspace_id })
				.then(res => {
					console.log("create page")
					console.log("ws id", userInfo.workspace_id)
					console.log("res", res);
					if (res.statusText == "OK") {
						res.json()
							.then(page => {
								// console.log("getPage", page.page);
								// homeにいる時とworkspaceにいる時で場合分け
								if (userInfo.workspace_id == "home") {
									setState({ ...state, to: `/${userInfo.id}/${page.id}`, isLoaded: true });
								} else {
									setState({ ...state, to: `/${userInfo.id}/ws/${userInfo.workspace_id}/${page.id}`, isLoaded: true });
								}

								props.onClose();
							})
					} else {
						res.json().then(error => {
							console.log(error);
						})
					}
				}));

	}
	const onChooseFile = e => {
		const url = URL.createObjectURL(e.target.files[0])
		setState({ ...state, url: url })
	}
	return (
		<div>
			<Card>
				<h2 id="">Create New memo</h2>
				<div>
					<TextField type="text" id="memo-input" className={classes.root}
						label="URL"
						placeholder="http://??????????"
						multiline
						onChange={e => { setState({ ...state, url: e.target.value }) }} value={state.url} />
					<TextField type="text" id="memo-input" className={classes.root}
						label="Title"
						placeholder="Introduction of memotube"
						multiline
						onChange={e => { setState({ ...state, title: e.target.value }) }} value={state.title} />
					<input
						className={classes.input}
						id="contained-button-file"
						multiple
						onChange={onChooseFile}
						type="file"
					/>
					<label htmlFor="contained-button-file">
						<Button variant="contained" color="default" startIcon={<CloudUploadIcon />} component="span">
							Upload
						</Button>
					</label>
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