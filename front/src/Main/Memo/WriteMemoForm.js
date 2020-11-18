import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DescriptionIcon from '@material-ui/icons/Description';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton'
import { CardActions } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    //flexGrow: 1,
    maxHeight: 500,
    overflow: 'auto',
    margin: theme.spacing(1),
    textAlign: 'left',
    //backgroundColor: "#ADD8E6"

  },
  card: {
    //maxWidth: 600,
    maxHeight: 500,
    overflow: 'auto',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    //backgroundColor:"#D2B48C",
  },
  card_action: {
    //marginLeft:theme.spacing(2)
  },
  button: {
    marginLeft: 'auto',
    //display: 'flex',
    //justifyContent:'space-between',
    //alignItems: 'center',
  }
}
));
function WriteMemoForm(props) {
  var [text, setText] = useState("");
  const player = props.player;
  const classes = useStyles();
  const handleWriting = () => {
    props.onWriting();
  }
  const handleWriteEnd = () =>{
    props.onWriteEnd();
  }
  
  const handleOnclick = () => {
    if(text.length==0){
      text = "空のメモ"
    }
    console.log("TEXT:",text)
    props.onSubmit({ text: text, time: player.time, user_id: props.user_id });
    setText("");
  }
  const deleteMemo = () => {
    setText("");
  }


  return (
    //<div>
    <Card className={classes.card}>
      <div id="memo-form" className="Main-memo">
        <CardHeader
          action={
            <Tooltip title="メモを作成">
              <Button className={classes.button} aria-label="メモを作成" id="submit" variant="contained" color="primary" onClick={handleOnclick}>
                <DescriptionIcon />
              </Button>
            </Tooltip>
          }
        />
        <CardActions className={classes.card_action}>
          <TextField type="text" id="memo-input" className={classes.root}
            label="メモを入力してください"
            //placeholder="見所"
            multiline
            fullWidth
            onChange={e => setText(e.target.value)} value={text}
            //inputProps={{ maxLength: 100 }}
            error={text.length >= 100}
            helperText={text.length >= 100 ? 'メモは100文字以内にしてください!' : ' '}
            onFocus={() => { console.log("now foucus"); handleWriting() }}
            onBlur={() => { console.log("sss"); handleWriteEnd() }}
          />

          {/*<Button className={classes.button} id="submit" variant="contained" color="primary" endIcon={<DescriptionIcon />} onClick={handleOnclick}>submit</Button>*/}
        </CardActions>
        {/* for test */}
        {/* <button onClick={() => {console.log(player);player.player.player.seekTo(0.3)}}>Skip to 20s</button> */}
      </div>
    </Card>
    //</div>
  )
}

export default WriteMemoForm;