import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {formatSec2Str} from '../Duration';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import DescriptionIcon from '@material-ui/icons/Description';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { CardActions } from "@material-ui/core";
// class Memo{
//   body = '';
//   time = 0;
//   id = 0;
// }

const useStyles = makeStyles((theme) => ({
  card: {
    //Width: "600px",
    margin: theme.spacing(1),
    backgroundColor: "#EEEEEE",
    color: "#0000ff",
    //padding: theme.spacing(2),
  },
}
));
function MemoComponent(props){
  const classes = useStyles();
  const [isEditMode, setEditMode] = useState(false);
  const [text,setText] = useState(props.memo.body)
  const memo = props.memo
  const player = props.player
  
  const endEditMode = ()=>{
    props.onChange({...memo,body:text});
    setEditMode(false);
  }

  const handleJump = ()=>{
    player.player.player.seekTo(memo.time)
  }


  const body = 
    isEditMode ?
      <TextField           
      multiline
      type="text" id="memo-input" className="" onChange={(e) => setText(e.target.value)} value={text}/>
    :
      memo.body;
  return (
    //<div className="Post-memos" key={memo.id}>
    <Card className={classes.card} key={memo.id}>
      <CardActions>
      <Button className="timeButton" startIcon={<AccessTimeIcon />}onClick={()=>{handleJump()}} >{formatSec2Str(memo.time)}</Button>
      <DescriptionIcon />{body}
      </CardActions>
      <CardActions>
      {isEditMode ? 
       <Button className="edit" startIcon={<DoneIcon />}onClick={() => {endEditMode()} }>done</Button>:
        <Button className="edit" color="primary" startIcon={<EditIcon />} onClick={() => { setEditMode(true) }}>edit</Button>}
      <Button className="delete" color="secondary" startIcon={<DeleteIcon />} onClick={() => { props.onDelete(memo) }}>delete</Button>
      </CardActions>
      </Card>
    //</div>
  )
}

export default MemoComponent;