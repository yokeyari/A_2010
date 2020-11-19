import React, { useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { formatSec2Str } from '../Duration';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Select from "@material-ui/core/Select";
import { CardActions, FormControl, MenuItem } from "@material-ui/core";

import UserInfoContext from "../../context";
// class Memo{
//   body = '';
//   time = 0;
//   id = 0;
// }

const useStyles = makeStyles((theme) => ({
  card: {
    //Width: "600px",
    margin: theme.spacing(1),
    // backgroundColor: "#EEEEEE"
    //color: "#0000ff",
    //padding: theme.spacing(2),
  },
}
));
function MemoComponent(props) {
  const classes = useStyles();
  const [isEditMode, setEditMode] = useState(false);
  const [text, setText] = useState(props.memo.text)
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const memo = props.memo
  const player = props.player


  const endEditMode = () => {
    props.onChange({ ...memo, text: text });
    setEditMode(false);
  }

  const handleJump = () => {
    player.player.player.seekTo(memo.time)
  }

  const handleChangeStatus = (event) => {
    const status = event.target.value;
    props.onChange({ ...memo, status: status });
  }

  const selectStatus =
    (userInfo.workspace_id != "home") ?
      (isEditMode ? 
        <FormControl>
          <Select onChange={handleChangeStatus}
            defaultValue={memo.status}
            className={""}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"pli"}>private</MenuItem>
            <MenuItem value={"pub"}>public</MenuItem>
          </Select>
        </FormControl> : 
        <div>{memo.status=="pub" ? "public" : "private"}</div>
      ) : 
      <></>
      

  const body =
    isEditMode ?
      <TextField
        multiline
        type="text" id="memo-input" className="" onChange={(e) => setText(e.target.value)} value={text} />
      :
      <TextField
        multiline
        //rows={4}
        fullWidth
        style={{ backgroundColor: props.color }}
        value={memo.text}
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
    ;
  return (
    <Card className={classes.card} key={memo.id}>
      <CardActions >
        {userInfo.workspace_id!="home" ? <p>[{memo.user_id}さん]</p> : <></>}
        <Button className="timeButton" startIcon={<AccessTimeIcon />} onClick={() => { handleJump() }} >{formatSec2Str(memo.time)}</Button>
        {isEditMode ?
          ( <Button className="edit" startIcon={<DoneIcon />} onClick={() => { endEditMode() }}>done</Button> ) :
          ( (userInfo.id==memo.user_id || userInfo.permission=="owner") ?
            <Button className="edit" color="primary" startIcon={<EditIcon />} onClick={() => { setEditMode(true) }}>edit</Button> : <></> ) } 
        { (userInfo.id==memo.user_id || userInfo.permission=="owner") ?
          <Button className="delete" color="secondary" startIcon={<DeleteIcon />} onClick={() => { props.onDelete(memo) }}>delete</Button> : <></> }
        {selectStatus}
      </CardActions>
      <CardActions>
        {body}
      </CardActions>
    </Card>
    //</div>
  )
}

export default MemoComponent;