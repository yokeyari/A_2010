import React, { useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { formatSec2Str } from '../Duration';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ReplyIcon from '@material-ui/icons/Reply';
import WriteThread from './WriteThread';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Select from "@material-ui/core/Select";
import { CardActions, FormControl, MenuItem } from "@material-ui/core";

import { UserInfoContext } from "../../context";
import { DeleteDialog } from "../../Dialogs";
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
  const [isReplyMode, setReplyMode] = useState(false);
  const [text, setText] = useState(props.memo.text)
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const memo = props.memo
  const player = props.player
  const auth = props.auth;
  const showWriter = props.showWriter ? true : false;
  const display_name = memo.account_id ? memo.account_id : memo.user_id;

  const displayMemo = memo.text

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
    // setEditMode(false)
  }

  const selectStatus =
    (userInfo.workspace_id !== "home") ?
      (isEditMode ?
        <FormControl>
          <Select onChange={handleChangeStatus}
            defaultValue={memo.status}
            className={""}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"pri"}>private</MenuItem>
            <MenuItem value={"pub"}>public</MenuItem>
          </Select>
        </FormControl>
        :
        <div>{memo.status == "pub" ? "public" : "private"}</div>
      ) :
      null


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
        style={{ backgroundColor: props.memo.color }}
        value={memo.text}
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />;

  if (auth.canRead == false) {
    return null;
  } else {
    return (
      <Card className={classes.card} key={memo.id}>
        <CardActions >
          {userInfo.workspace_id != "home" ? <p>[{display_name}]</p> : null}
          <Button className="timeButton" startIcon={<AccessTimeIcon />} onClick={() => { handleJump() }} >{formatSec2Str(memo.time)}</Button>
          {isEditMode ?
            (<Button className="edit" startIcon={<DoneIcon />} onClick={() => { endEditMode() }}>done</Button>)
            :
            ((auth.canEdit) ?
              <Button className="edit" color="primary" startIcon={<EditIcon />} onClick={() => { setEditMode(true) }}>edit</Button>
              : null)
          }
          {(auth.canDelete) ?
            <DeleteDialog
              yesCallback={() => { props.onDelete(memo) }}
              component={<Button className="delete" color="secondary" startIcon={<DeleteIcon />}>delete</Button>} />
            : null}

          {selectStatus}

          {auth.canCreate ?
            isReplyMode ?
              <Button className="reply" startIcon={<ReplyIcon />} onClick={() => { setReplyMode(false) }}>返信</Button>
              :
              <Button className="reply" startIcon={<ReplyIcon />} onClick={() => { setReplyMode(true) }}>返信</Button>
            : null}
        </CardActions>
        <CardActions>
          {body}
        </CardActions>

        {isReplyMode ?
          <>
            <WriteThread
              parent_memo={memo}
              isthread={false}
              user_id={props.user_id}
              onSubmit={props.onSubmit}
            />
            <Button onClick={() => { setReplyMode(false) }}>キャンセル</Button>
          </>
          :
          null
        }
      </Card>
      //</div>
    )
  }

}

export default MemoComponent;