import React, { useState, useEffect,useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { formatSec2Str } from '../Duration';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ReplyIcon from '@material-ui/icons/Reply';
import { CardActions } from "@material-ui/core";
import WriteThread from './WriteThread';
import {UserInfoContext} from "../../context";

function ThreadComponent(props) {
	//const classes = useStyles();
	//const [isEditMode, setEditMode] = useState(false);
	const memo = props.memo;
	const { userInfo, setUserInfo } = useContext(UserInfoContext);
	const [isReplyMode, setReplyMode] = useState(false);
	//console.log("memo", props.memo)
	//console.log("parent_memo", props.parent)
	// console.log("名前:",userInfo.name)
	return (
		<>
			<Card>
				<p> [{memo.user_id}]: {memo.text}</p>
				{/* todo ここを名前にする */}
				<Button className="delete" color="secondary" startIcon={<DeleteIcon />} onClick={() => { props.onDelete(memo) }}>delete</Button>
				{isReplyMode ?
					<Button className="reply" startIcon={<ReplyIcon />} onClick={() => { setReplyMode(false) }}>返信</Button>
					:
					<Button className="reply" startIcon={<ReplyIcon />} onClick={() => { setReplyMode(true) }}>返信</Button>

				}
				{isReplyMode ?
					<>
						<WriteThread
							thread_memo={memo}
							isthread={true}
							memo={props.parent}
							user_id={props.user_id}
							onSubmit={(e)=>{setReplyMode(false);props.onSubmit(e)}}
						/>
						<Button onClick={() => { setReplyMode(false) }}>キャンセル</Button>
					</>
					:
					<></>
				}
			</Card>
		</>

	)
}

export default ThreadComponent;
{/*memo={memo}

thread_memo={memo}
thread={true}}
*/}