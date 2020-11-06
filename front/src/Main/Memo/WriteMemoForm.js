import React, { useState, useEffect, useRef } from 'react';
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
function WriteMemoForm(props) {
  const [text, setText] = useState("");
  const player = props.player;
  const classes = useStyles();
  const handleOnclick = () => {
    props.onSubmit({text:text,time:player.time});
    setText("");
  }
  const deleteMemo = () => {
    setText("");
  }


  return (
    //<div>
      <Card className={classes.card}>
      <div id="memo-form" className="Main-memo">
        <TextField type="text" id="memo-input" className={classes.root} 
                label="メモを入力してください"
                placeholder="見所"
                multiline
                onChange={e=>setText(e.target.value)} value={text}
                 //inputProps={{ maxLength: 100 }}
                 error={text.length >= 100}
                 helperText={text.length >= 100 ? 'メモは100文字以内にしてください!' : ' '}
                />
        <CardActions>
        <Button className={classes.button}  variant="contained" color="secondary"  startIcon={<DeleteIcon />} onClick={deleteMemo}> delete</Button>
        <Button className={classes.button} id="submit" variant="contained" color="primary" endIcon={<SendIcon/>} onClick={handleOnclick}>submit</Button>
        </CardActions>
        {/* for test */}
        {/* <button onClick={() => {console.log(player);player.player.player.seekTo(0.3)}}>Skip to 20s</button> */}
      </div>
      </Card>
    //</div>
  )
}

export default WriteMemoForm;