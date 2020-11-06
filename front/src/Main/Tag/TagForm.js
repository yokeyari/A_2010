import React, { useState, useEffect, useRef } from 'react';
import { TagDataSource } from '../ProductionApi';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import DescriptionIcon from '@material-ui/icons/Description';
import { CardActions } from "@material-ui/core";
import LabelIcon from '@material-ui/icons/Label';
import MoreIcon from '@material-ui/icons/More';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import Tooltip from '@material-ui/core/Tooltip';
const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: "100%",
    //flexGrow: 1,
    maxHeight: 500,
    overflow: 'auto',
    margin: theme.spacing(1),
    textAlign: 'left',
    //backgroundColor: "#ADD8E6"

  },
  card: {
    // width: "90%",
    //height: 100,
    overflow: 'auto',
    margin: theme.spacing(1),
    //padding: theme.spacing(0.5),
    //backgroundColor:"#D2B48C",
  },
  button: {
    // marginLeft: 'auto',
    backgroundColor: "#EEEEEE"
  },
  auto_button: {
    backgroundColor: "#FFE4C4"
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
        <CardActions>

          <TextField type="text" id="tag-input" className={classes.root}
            label="追加したいタグを入力してください" size='small'
            variant="outlined"
            margin="dense"
            onChange={e => setText(e.target.value)} value={text} />

          <Tooltip title="タグを作成">
            <Button className={classes.button} size='small' id="submit" variant="contained" color="default" onClick={handleOnlSubmitManualTag}>
              <LabelIcon />
            </Button>
          </Tooltip>


          <Tooltip title="タグを自動作成">
            <Button className={classes.auto_button} size='small' id="submit" variant="contained" color="default" onClick={handleOnlSubmitAutomatedTag}>
              <BrightnessAutoIcon />
            </Button>
          </Tooltip>

        </CardActions>
        {/* for test */}
        {/* <button onClick={() => {console.log(player);player.player.player.seekTo(0.3)}}>Skip to 20s</button> */}
      </div>
    </Card>
  )
}

export default TagForm