import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
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
  const [title, setTitle] = useState(props.title);
  const [count, setCount] = useState(0);
  
  if(props.title!=""&&count==0){
    setTitle(props.title);
    setCount(1);
  }

  return (
    <Grid>
      <TextField className={classes.card}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          props.onChange(e.target.value);
        }}
        fullWidth
        placeholder="メモのタイトルを入力してください"
        variant="outlined"
        //variant="filled"
        inputProps={{
          style: { fontSize: 30 }
        }}
      />
    </Grid>
    
  );
}

