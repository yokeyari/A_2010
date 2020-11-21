import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MemoComponent from './MemoComponent'
import Thread from './ThreadList'
import Card from '@material-ui/core/Card'
import ThreadList from './ThreadList';

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
  if (props.memos.length === 0) {
    return "Loading";
  }

  const memos = props.memos.sort((a, b) => {
    return a.time - b.time
  })

  // const TextArea = (
  //   <TextField value={props.title}></TextField>
  // )

  return (
    <>
      <Card className={classes.card}>
        {
          memos.map((memo, i) => (

            memo.parent_id == null && (
              <div key={memo.id.toString()}>
                <MemoComponent
                  color={props.colorList[i]}
                  memo={memo}
                  user_id={props.user_id}
                  onChange={props.onChange}
                  onDelete={props.onDelete}
                  onSubmit={props.onSubmit}
                  player={player}
                />
                <ThreadList
                  memos={memos}
                  parent_memo={memo}
                  user_id={props.user_id}
                  onChange={props.onChange}
                  onDelete={props.onDelete}
                  onSubmit={props.onSubmit}
                />
              </div>
            )
          ))
        }
      </Card>
    </>
  )
}

export default MemoList;