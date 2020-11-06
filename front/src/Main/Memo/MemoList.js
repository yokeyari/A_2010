import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MemoComponent from './MemoComponent'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles((theme) => ({
  card: {
    //width: '30vw',
    maxHeight: '80vh',
    minHeight: '80%',
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

  const memos = props.memos.memos.sort((a, b) => {
    return a.time - b.time
  })

  // const TextArea = (
  //   <TextField value={props.title}></TextField>
  // )

  return (
    <>
      <Card className={classes.card}>
        {
          memos.map((memo, i) =>
            (<MemoComponent
              key={memo.id.toString()}
              color={props.colorList[i]}
              memo={memo}
              onChange={props.onChange}
              onDelete={props.onDelete}
              player={player}
            />)
          )
        }
      </Card>
    </>
  )
}

export default MemoList;