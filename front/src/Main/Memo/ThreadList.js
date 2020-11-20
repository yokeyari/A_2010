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

import ThreadComponent from './ThreadComponent';
import WriteThread from './WriteThread'; 

const useStyles = makeStyles((theme) => ({
  card: {
    //width: '30vw',
    maxHeight: '50vh',
    overflow: 'auto',
    //margin: theme.spacing(2),
    margin: '10px 10px 10px 5vw',
    padding: theme.spacing(2),
    //backgroundColor:"#D2B48C",
  },
}
));


function ThreadList(props) {
	const classes = useStyles();
	//const [isEditMode, setEditMode] = useState(false);
	const [isReplyMode, setReplyMode] = useState(true);
	const memos = props.memos;
	const parent_memo = props.parent_memo;
	let isEmpty = false;
	const endReplyMode = () => {
	setReplyMode(false);
	console.log("MEMO",memos)
	}
	const child = memos.filter((memo) => (
		memo.parent_id === parent_memo.id		
	))
	console.log("child",child)
	if (child.length===0){
		isEmpty = true
	}
	return(
		
		<>
		{isEmpty ?
		<></>
		:
		<>
			{isReplyMode ?
				<Button color ="primary" onClick={() => { endReplyMode() }}>返信を表示</Button> :
				<Card className={classes.card}>
				<>
					<Button color ="primary"　onClick={() => { setReplyMode(true)}}>返信を非表示</Button>
					{
						memos.map((memo, i) => (
							memo.parent_id == parent_memo.id && (
								
								<ThreadComponent	
									key={memo.id.toString()}
									//color={props.colorList[i]}
									memo={memo}
									onChange={props.onChange}
									onDelete={props.onDelete}
								/>
							)
						))
					}
					{/*
					<WriteThread 
						memo={parent_memo}
						user_id={props.user_id}
						onSubmit={props.onSubmit}
					/>*/}
				</>
				</Card>
			}
		</>
}
		</>
			
		
	)
}

export default ThreadList;
{/*</Card>*/}
{/*<Card className={classes.card}>*/}