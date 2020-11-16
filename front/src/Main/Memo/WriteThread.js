import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { formatSec2Str } from '../Duration';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

import { CardActions } from "@material-ui/core";

function WriteThread(props) {
	const [text, setText] = useState("");
	const parent_memo = props.memo;

	const handleOnclick = () => {
    props.onSubmit({ text: text ,time: parent_memo.time, parent_id: parent_memo.id, user_id: props.user_id});
    setText("");
  }

  return (
    <>
			<TextField type="text" id="memo-input" label="input"
				multiline
				fullWidth
				onChange={e => setText(e.target.value)} value={text}
				error={text.length >= 100}
				helperText={text.length >= 100 ? 'メモは100文字以内にしてください!' : ' '}
			/>
			<Button  id="submit" variant="contained" color="primary" onClick={handleOnclick}>
				<DescriptionIcon />
			</Button>
    </>
  )
}

export default WriteThread;