import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MemoComponent from './MemoComponent'
import Card from '@material-ui/core/Card'
const useStyles = makeStyles((theme) => ({
  card: {
    //width: '30vw',
    maxHeight: '40vh',
    overflow: 'auto',
    margin: theme.spacing(2),
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

  // const TextArea = (
  //   <TextField value={props.title}></TextField>
  // )

  return (
    <>
      <Card className={classes.card}>
        {
          props.memos.map(memo =>
            (<MemoComponent
              key={memo.id.toString()}
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