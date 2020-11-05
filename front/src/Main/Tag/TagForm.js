import React, { useState, useEffect, useRef } from 'react';
import { TagDataSource } from '../ProductionApi';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CardActions } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth:300,
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
  button :{
    marginLeft:'auto',
  }
}
));

const TagApi = new TagDataSource();

function TagForm(props) {
  const [text, setText] = useState("");
  const page_id = props.page_id;
  const classes = useStyles();
  const handleOnlSubmitManualTag = () => {
    props.withUpdate(TagApi.createManualTag(text, page_id));
    setText("");
  }
  const handleOnlSubmitAutomatedTag = () => {
    props.withUpdate(TagApi.createAutomatedTag(page_id));
  }
  const deleteTag = () => {
    setText("");
  }

  return (
    //<>
    <Card className={classes.card}>
    <div id="tag-form" className="Main-tag">
      <TextField type="text" id="tag-input" className={classes.root} 
              label="追加したいタグを入力してください"
              onChange={e=>setText(e.target.value)} value={text}/>
      <CardActions>
      <Button className={classes.button}  variant="contained" color="secondary"  startIcon={<DeleteIcon />} onClick={deleteTag}> delete</Button>
      <Button className={classes.button} id="submit" variant="contained" color="primary" endIcon={<SendIcon/>} onClick={handleOnlSubmitManualTag}>submit</Button>
      <Button className={classes.button} id="submit" variant="contained" color="primary" endIcon={<SendIcon/>} onClick={handleOnlSubmitAutomatedTag}>auto create</Button>
      </CardActions>
      {/* for test */}
      {/* <button onClick={() => {console.log(player);player.player.player.seekTo(0.3)}}>Skip to 20s</button> */}
    </div>
    </Card>
  )
}

export default TagForm