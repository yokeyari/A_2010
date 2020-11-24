import React, { useState, useEffect,useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MemoComponent from './MemoComponent'
import Thread from './ThreadList'
import Card from '@material-ui/core/Card'
import ThreadList from './ThreadList';

import { MemoAuther } from '../../Auth/Authers';
import {UserInfoContext} from "../../context";

const useStyles = makeStyles((theme) => ({
  card: {
    //width: '30vw',
    maxHeight: '80vh',
    minHeight: '75vh',
    overflow: 'auto',
    //margin: theme.spacing(2),
    margin: '10px 10px 10px 5vw',
    padding: theme.spacing(2),
    //backgroundColor:"#D2B48C",
  },
}
));


function MemoList(props) {
  const classes = useStyles();
  const player = props.player;
  const { userInfo } = useContext(UserInfoContext);


  if (props.memos.length === 0) {
    return "Loading";
  }

  const memos = props.memos.sort((a, b) => {
    return a.time - b.time
  })

  const memoAuther = new MemoAuther(userInfo);

  // const TextArea = (
  //   <TextField value={props.title}></TextField>
  // )

  return (
    <>
      <Card className={classes.card}>
        {
          memos.filter(m => m.parent_id == null).map(parent =>
            <div key={parent.id.toString()}>
              <MemoComponent
                memo={parent}
                auth={memoAuther.makeAuth(parent)}
                user_id={props.user_id}
                onChange={props.onChange}
                onDelete={props.onDelete}
                onSubmit={props.onSubmit}
                player={player}
              />
              <ThreadList
                memos={memos.filter(t => t.parent_id == parent.id)}
                parent_memo={parent}
                user_id={props.user_id}
                onChange={props.onChange}
                onDelete={props.onDelete}
                onSubmit={props.onSubmit}
              />
            </div>
          )
        }
      </Card>
    </>
  )
}

export default MemoList;