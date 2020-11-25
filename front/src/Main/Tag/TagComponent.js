import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
// import {formatSec2Str} from '../Duration';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import DescriptionIcon from '@material-ui/icons/Description';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { CardActions, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card_manual: {
    //Width: "600px",
    height: "20px",
    margin: theme.spacing(0.5),
    backgroundColor: "#EEEEEE",
    display:'flex'
    //color: "#0000ff",
    //padding: theme.spacing(2),
  },
  card_automated: {
    //Width: "600px",
    height: "20px", 
    margin: theme.spacing(0.5),
    backgroundColor: "#FFE4C4",
    display:'flex'
    //color: "#0000ff",
    //padding: theme.spacing(2),
  },
}
));

function TagComponent(props){
  const classes = useStyles();
  const tag = props.tag;
  const [isEditMode, setEditMode] = useState(false);
  const [text,setText] = useState(tag.text);
  
  const endEditMode = ()=>{
    props.onChange({...tag,text:text});
    setEditMode(false);
  }

  const body = 
    isEditMode ?
      <TextField           
      multiline
      type="text" id="tag-input" className="" onChange={(e) => setText(e.target.value)} value={text}/>
    :
      text;

  return (
    <Card className={tag.is_automated ? classes.card_automated: classes.card_manual} key={tag.id}>
      <CardActions>

      #{body}
      {/*</CardActions>*/}
      {/*<CardActions>  */}
        {tag.is_automated==false &&
          (isEditMode ? 
            <Button className="edit" startIcon={<DoneIcon />}onClick={() => {endEditMode()} }>done</Button>
          :
          <Button className="edit" color="primary" startIcon={<EditIcon />} onClick={() => { setEditMode(true) }}>edit</Button>)
        }
      <IconButton className="delete" style={{marginLeft:'auto'}} color="secondary" onClick={() => { props.onDelete(tag) }}>
        <DeleteIcon />
        </IconButton>
      </CardActions>
      </Card>
  )
}

export default TagComponent;