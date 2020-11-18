import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { formatSec2Str } from '../Duration';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

import { CardActions } from "@material-ui/core";

function ThreadComponent(props) {
	//const classes = useStyles();
	//const [isEditMode, setEditMode] = useState(false);
	const memo = props.memo;

	return(
		<>
			<Card>
				<p> [{memo.user_id}さん]: {memo.text}</p>
				<Button className="delete" color="secondary" startIcon={<DeleteIcon />} onClick={() => { props.onDelete(memo) }}>delete</Button>
			</Card>
		</>
		
	)
}

export default ThreadComponent;