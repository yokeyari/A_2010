import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { formatSec2Str } from '../Duration';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

//import {UserInfoContext} from "../../context";
import { CardActions } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	root: {
		flex: 1,
		display: 'flex',
		justifyContent: 'flex-end',
	},
}
));
function WriteThread(props) {
	const [text, setText] = useState("");
	const parent_memo = props.parent_memo;
	//const { userInfo, setUserInfo } = useContext(UserInfoContext);
	const classes = useStyles();

	const handleOnclick = () => {
		let thread_text;
		if (props.isthread) {
			thread_text = "@" + props.thread_memo.account_id + " " + text;
			// console.log("スレッドに返信")
		}

		if (props.isthread) {
			props.onSubmit({ text: thread_text, time: parent_memo.time, parent_id: parent_memo.id, user_id: props.user_id });
		}
		else {
			props.onSubmit({ text: text, time: parent_memo.time, parent_id: parent_memo.id, user_id: props.user_id });
		}
		setText("");
	}
	// console.log("親のメモ:",parent_memo)
	// console.log("提出予定：" ,text,parent_memo.time,parent_memo.id,props.user_id )
	//console.log("返信状態",props.thread)
	return (
		<>
			<TextField type="text" id="memo-input" label="返信を追加"
				multiline
				fullWidth
				onChange={e => setText(e.target.value)} value={text}
				error={text.length >= 100}
				helperText={text.length >= 100 ? 'メモは100文字以内にしてください!' : ' '}
			/>
			{text.length > 0 ?
				<Button id="submit" variant="contained" color="primary" onClick={handleOnclick}>
					{/*<DescriptionIcon />*/}
				返信
			</Button> :
				<Button id="submit" variant="contained" color="primary" disabled onClick={handleOnclick}>
					{/*<DescriptionIcon />*/}
				返信
			</Button>
			}
		</>
	)
}

export default WriteThread;