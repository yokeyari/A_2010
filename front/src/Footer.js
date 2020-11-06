import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      bottom:0,
      right:0,
      textAlign: 'right',
      //backgroundColor: "#e7ecec",
      position:'absolute',
    },
    wrapper:{
        //backgroundColor: "#e7ecec",
        textAlign: 'right',
        minHeight:'15vh',
        position:'relative'
    }
  }));
export default function Footer() {
    const classes = useStyles();
    return(
    <div className = {classes.wrapper}>
        <div className={classes.root}>
        <h3>Memotube</h3>
        <p>made by "Yokei-na-kotomade"</p>
      </div>
      </div> 
    );
}