import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
const useStyles = makeStyles((theme) => ({
    root: {
      bottom:0,
      right:0,
      textAlign: 'right',
      //backgroundColor: "#e7ecec",
      position:'absolute',
      padding:'10px'
    },
    wrapper:{
        //backgroundColor: "#e7ecec",
        textAlign: 'center',
        minHeight:'15vh',
        position:'relative'
    }
  }));
export default function Footer() {
    const classes = useStyles();
    return(
    <div className = {classes.wrapper}>
    <IconButton style={{marginLeft:'auto', marginRight:'auto'}} href="https://github.com/jphacks/A_2010">
        <GitHubIcon />
      </IconButton>
        <div className={classes.root}>
        <h3>Memotube</h3>
        <p>made by "Yokei-na-kotomade"</p>
      </div>
   
      </div> 
      
    );
}