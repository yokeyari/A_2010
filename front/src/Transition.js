import React, { useState, useEffect, useContext } from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import { BrowserRouter as Router, Route, Link, Redirect, useHistory, withRouter } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const Transition = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useStyles();




  const { promiseInProgress } = usePromiseTracker();
  // const component=()

  useEffect(() => {
    if (!promiseInProgress & props.ok) {
      // useHistory().push(props.to);
      props.history.push(props.to);
      return null
    }
  }, [props.ok])


  return (
    <div>
      {
        (props.isLoading || (promiseInProgress === true)) ?
          <Backdrop className={classes.backdrop} open={props.isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          :
          null
      }
      {props.children}
    </div>
  )
};

{/* props.ok ? <Redirect to={props.to} /> : null */ }

export default withRouter(Transition);