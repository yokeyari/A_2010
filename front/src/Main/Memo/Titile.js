import React from 'react'
import { TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles';

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

export default function Title(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <TextField value={props.title}></TextField>
    </Card>
  )
}
