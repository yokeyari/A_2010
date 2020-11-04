import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CardActions } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link, Redirect, useHistory } from 'react-router-dom';


import { PageDataSource } from "./../Main/ProductionApi";
import UserInfoContext from "../context";

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
	}
}
));

function validateURL(url) {

	return true;
}


export default function NewPageForm(props) {
	const { userInfo, setUserInfo } = useContext(UserInfoContext);
	const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");
	const classes = useStyles();
	const handleClick = () => {
		if (!validateURL(url)) {
			console.error("not support url");
			return false;
		}
		// props.onSubmit({ url, title });
		// setText("");

		pageDataSource.createPage({ url, title, user_id: userInfo.id }).then(res => {
			if (res.statusText == "OK") {
				res.json().then(page => {
					console.log(page);
					// {useHistory().push(`/${userInfo.id}/${page.id}`)}
					// <Redirect to={} />
					// コールバックにはHook使えないので，ローディング中にレンダーして，遷移するComponentoが必要だ．
				})
			} else {
				// ここにページが作れなかったときの処理
			}
		});

	}

	return (
		<Card>
			<h2 id="">Create New memo</h2>
			<div>
				<TextField type="text" id="memo-input" className={classes.root}
					label="URL"
					placeholder="http://??????????"
					multiline
					onChange={e => setUrl(e.target.value)} value={url} />
				<TextField type="text" id="memo-input" className={classes.root}
					label="Title"
					placeholder="Introduction of memotube"
					multiline
					onChange={e => setTitle(e.target.value)} value={title} />

				<Button className={classes.button} id="submit"
					variant="contained" color="primary" endIcon={<SendIcon />}
					onClick={handleClick}
				>submit
				</Button>

			</div>
		</Card>
	)
}