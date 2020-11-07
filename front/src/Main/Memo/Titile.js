import React from 'react'
import { TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    //width: '30vw',
    maxHeight: '40vh',
    overflow: 'auto',
    //margin: theme.spacing(1),
    //padding: theme.spacing(0.5),
    backgroundColor: "#ffffff",
  },
}
));

export default function Title(props) {
  const classes = useStyles();

  return (
    <TextField className={classes.card}
      value={props.title}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      fullWidth
      placeholder="メモのタイトルを入力してください"
      variant="outlined"
      //variant="filled"
      inputProps={{
        style: { fontSize: 30 }
      }}
    >

    </TextField>

  )
}
{/*<Card className={classes.card}>*/ }
{/*</Card>*/ }

